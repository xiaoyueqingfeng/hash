<template>
  <oa-modal
    v-model="show"
    :title="this.from == 'pro' ? '修改绑定手机号' : '修改超管手机号'"
    @ok="submit"
    :confirmLoading="modifyMobile$loading"
  >
    <a-form :form="form">
      <a-form-item label="客户名称" v-bind="formCol">
        <span>{{ customerName }}</span>
      </a-form-item>
      <a-form-item label="原手机号" v-bind="formCol">
        <span>{{ oldBindPhone || '无' }}</span>
      </a-form-item>
      <a-form-item label="新手机号" v-bind="formCol">
        <a-input
          placeholder="填写新手机号"
          v-decorator="decorators.phone"
        ></a-input>
      </a-form-item>
    </a-form>
    <div class="ta-c">
      <span v-if="from === 'pro'">
        注：账户绑定的手机号变更后，需要手机验证码登录。
      </span>
      <span v-if="from === 'sass1'">注：超管手机号变更后，需要重新登录。</span>
    </div>
  </oa-modal>
</template>
<script>
import {
  getAdminMobile,
  changeAdminMobile,
  getSaas1AdminMobileData,
  changeSaas1AdminMobile
} from '@/api/leads'
import { get, values } from 'lodash-es'
import { rules } from './modify-phone#config'
import { request } from 'https'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: true,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      oldBindPhone: ''
    }
  },
  props: {
    customerName: {
      type: String
    },
    id: {
      type: String
    },
    from: {
      type: String
    }
  },
  created() {
    this.getMobile({ leads_id: this.id })
  },
  async: {
    getMobile(data) {
      switch (this.from) {
        case 'pro':
          return getAdminMobile(data).then(res => {
            this.oldBindPhone = get(res, 'phone', '')
          })
        case 'sass1':
          return getSaas1AdminMobileData(data).then(res => {
            this.oldBindPhone = get(res, 'admin_mobile', '')
          })
      }
    },
    modifyMobile(data) {
      switch (this.from) {
        case 'pro':
          return changeAdminMobile(data)
        case 'sass1':
          return changeSaas1AdminMobile(data)
      }
    }
  },
  computed: {
    rules
  },
  methods: {
    submit() {
      this.form.validate().then(values => {
        let requestObj = {
          mobile: values.phone,
          leads_id: this.id
        }
        this.modifyMobile(requestObj).then(res => {
          this.show = false
          this.$message.success('手机号已成功变更')
        })
      })
    }
  }
}
</script>
