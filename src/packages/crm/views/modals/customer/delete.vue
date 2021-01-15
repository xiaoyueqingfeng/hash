<template>
  <oa-modal
    title="删除客户"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="del$loading"
  >
    <a-row>
      <div class="delete_customer_con">
        是否将
        <span class="customerName" v-html="names"></span>
        删除？
      </div>
      <div class="delete_reason">
        <a-form :form="form">
          <a-form-item
            label="请输入原因"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 15 }"
          >
            <a-textarea v-decorator="decorators.reason" :rows="3"></a-textarea>
          </a-form-item>
        </a-form>
      </div>
      <div class="delete_tip">删除后该客户将无法登录</div>
    </a-row>
  </oa-modal>
</template>

<script>
import { del as delLeads } from '@/api/leads'
import { del as delPotential } from '@/api/potential'
import { decorators } from './delete#config'
export default {
  props: {
    customerIds: {
      type: Array,
      required: true
    },
    customerNames: {
      type: Array,
      required: true
    },
    // leads | potential
    from: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    decorators,
    names() {
      const len = this.customerIds.length
      return len < 5 ? this.customerNames.toString() : `<a>${len}</a>个客户`
    }
  },
  methods: {
    onSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.del(values.reason).then(() => {
            this.$message.success('操作成功', 2)
            this.show = false
            this.$emit('done')
          })
        }
      })
    }
  },
  async: {
    del(reason) {
      const sendData = {
        leads_id: this.customerIds,
        delete_reason: reason.trim()
      }
      switch (this.from) {
        case 'leads':
          return delLeads(sendData)
        case 'potential':
          return delPotential(sendData)
      }
    }
  }
}
</script>

<style lang="less">
.delete_customer_con {
  padding-left: 10px;
  padding-top: 16px;
  .customerName {
    display: inline-block;
    margin: 0 3px;
    font-weight: 600;
  }
}
.delete_reason {
  margin-top: 32px;
  .ant-form-item-label {
    label {
      top: -8px;
    }
  }
}
.delete_tip {
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  padding-left: 9px;
  position: relative;
  top: -10px;
}
</style>
