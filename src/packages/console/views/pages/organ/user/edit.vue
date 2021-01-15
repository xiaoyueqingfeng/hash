<template>
  <oa-panel app :loading="initData$loading">
    <div class="ta-r">
      <a-button type="dashed" icon="arrow-left" @click="$router.back()">
        返回
      </a-button>
    </div>
    <a-row class="mg-t16" :gutter="8">
      <a-col :lg="10" :offset="7">
        <a-form :form="form" @submit.prevent="onSubmit">
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            style="text-align: center"
            :label="labels.avatar"
            hasFeedback
          >
            <oa-avatar-upload
              :href="info.avatar_url"
              v-decorator="decorators.avatar"
            />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.name"
            hasFeedback
          >
            <a-input v-decorator="decorators.name" placeholder="请输入姓名" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.mobile"
            hasFeedback
          >
            <a-input
              v-decorator="decorators.mobile"
              placeholder="请输入手机号"
            />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.udesk_login_name"
            hasFeedback
          >
            <a-input
              v-decorator="decorators.udesk_login_name"
              placeholder="请输入Udesk账号"
            />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.areaIds"
            hasFeedback
          >
            <oa-region-cascader v-decorator="decorators.areaIds" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.role_id"
            hasFeedback
          >
            <oa-select
              placeholder="请选择角色"
              :options="roleList"
              v-decorator="decorators.role_id"
            ></oa-select>
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.job_title"
            hasFeedback
          >
            <a-input
              v-decorator="decorators.job_title"
              placeholder="请输入职位"
            />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            :label="labels.organ_id"
            hasFeedback
          >
            <console-organ-cascader
              dropRoot
              v-decorator="decorators.organ_id"
            />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapper-col="wrapperCol"
            class="mg-t32 mg-b8"
          >
            <div class="ta-c">
              <a-button class="mg-r16">取消</a-button>
              <a-button
                :loading="updateUser$loading"
                type="primary"
                htmlType="submit"
              >
                确定
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </oa-panel>
</template>

<script>
import { decorators, labels, labelCol, wrapperCol } from './user#config'
import { updateUser, getUserInfo } from '@/api/user.js'
import { getRoleList } from '@/api/role'
import { pick, last } from 'lodash-es'

export default {
  name: 'AddUser',
  data() {
    return {
      form: this.$form.createForm(this),
      searchQuery: { ...this.$route.meta.query },
      info: {},
      roleList: [],
      labels,
      labelCol,
      wrapperCol
    }
  },
  computed: {
    decorators
  },
  async: {
    initData() {
      return Promise.all([this.getRoleList(), this.getUserInfo()])
    },
    getUserInfo() {
      return getUserInfo({ user_id: this.searchQuery.user_id }).then(res => {
        this.info = res
        this.form.setFieldsValue({
          ...pick(res, [
            'name',
            'job_title',
            'mobile',
            'udesk_login_name',
            'organ_id',
            'role_id'
          ]),
          avatar: res.avatar,
          areaIds: [+res.province_id, +res.city_id, +res.area_id]
        })
      })
    },
    getRoleList() {
      return getRoleList().then(res => {
        this.roleList = res.list
      })
    },
    updateUser(data) {
      return updateUser(data)
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) return
        const sendData = {
          uid: this.searchQuery.user_id,
          ...values,
          area_id: last(values.areaIds)
        }
        this.updateUser(sendData).then(() => {
          this.$message.success('更新用户成功!')
          this.$router.replace('/organ/index?id=1')
        })
      })
    }
  }
}
</script>
