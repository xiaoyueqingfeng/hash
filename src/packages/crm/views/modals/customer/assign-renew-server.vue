<template>
  <oa-modal
    title="分配客续"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="assignServer$loading"
  >
    <a-row>
      <div class="tips">
        将
        <span v-html="names"></span>
        分配给
      </div>
      <div class="form_">
        <a-form :form="form">
          <a-form-item
            label="选择部门"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <oa-cascader
              change-on-select
              placeholder="选择部门"
              :options="organOptions"
              @change="onChangeOrgan"
              v-decorator="[
                'organIds',
                { rules: [{ required: true, message: '请选择部门' }] }
              ]"
            ></oa-cascader>
          </a-form-item>
          <a-form-item
            label="选择客续"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <oa-select
              :options="serverList"
              v-decorator="[
                'server_id',
                {
                  rules: [{ required: true, message: '客续必选' }]
                }
              ]"
            ></oa-select>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { getOrganList, getRenewList, assignCustomRenewServer } from '@/api/pay'

import { listToTree } from 'oa-core/utils/list-to-tree'

export default {
  props: {
    customerIds: {
      type: Array,
      required: true,
      default: () => []
    },
    customerNames: {
      type: Array,
      required: true,
      default: () => []
    },
    from: {
      type: String,
      // 因为数据域不同 分配销售来源 可选 pay
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: true,
      serverList: [],
      organOptions: []
    }
  },
  created() {
    this.getOrganList()
  },
  computed: {
    names() {
      const len = this.customerIds.length
      return len < 5 ? this.customerNames.toString() : `<a>${len}</a>个客户`
    }
  },
  async: {
    getServerList(query) {
      switch (this.from) {
        case 'pay': {
          return getRenewList(query).then(res => {
            this.serverList = res.list
          })
        }
      }
    },
    getOrganList() {
      return getOrganList().then(res => {
        this.organOptions = listToTree(res.list.filter(item => item.id !== '1'))
      })
    },
    assignServer(data) {
      switch (this.from) {
        case 'pay':
          return assignCustomRenewServer(data)
      }
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const sendData = {
            custom_renew_server_id: fieldsValue.server_id,
            leads_id: this.customerIds
          }
          this.assignServer(sendData).then(() => {
            this.$message.success('分配客续成功！')
            this.$emit('done')
            this.show = false
          })
        }
      })
    },
    onChangeOrgan(organId) {
      this.form.setFieldsValue({
        server_id: undefined
      })
      if (organId) {
        this.getServerList({
          organ_id: organId
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.tips {
  text-align: center;
  span {
    font-weight: 600;
  }
}
.form_ {
  position: relative;
  top: 24px;
  left: 30px;
}
</style>
