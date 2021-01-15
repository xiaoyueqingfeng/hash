<template>
  <oa-modal v-model="show" title="拒绝退款" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item label="消费者手机号" v-bind="formCol">
        {{ orderDetail.mobile }}
      </a-form-item>
      <a-form-item label="购买商品" v-bind="formCol">
        {{ orderDetail.goods_name }}
      </a-form-item>
      <a-form-item label="收货人" v-bind="formCol">
        {{ orderDetail.consignee_name }}
      </a-form-item>
      <a-form-item label="收货人手机号" v-bind="formCol">
        {{ orderDetail.consignee_mobile }}
      </a-form-item>
      <a-form-item label="收货地址" v-bind="formCol">
        {{ orderDetail.consignee_address }}
      </a-form-item>
      <a-form-item label="拒绝原因" v-bind="formCol">
        <a-textarea v-decorator="decorators.reject_content"></a-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './reject#config'
// TODO:
import { getOrderInfo, orderRefusalRefund } from '@/api/order'

export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: true,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      orderDetail: {}
    }
  },
  props: {
    order_sn: {
      type: String,
      required: true
    }
  },
  async: {
    // TODO:
    getOrderInfo() {
      return getOrderInfo({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res
      })
    },
    orderReject(data) {
      return orderRefusalRefund(data)
    }
  },
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    handleSubmit() {
      this.form.validate().then(values => {
        this.orderReject({ ...values, order_sn: this.order_sn }).then(res => {
          this.show = false
          this.$message.success('退款拒绝成功')
          this.$emit('done')
        })
      })
    },
    disableDate(current) {
      return current && current > moment()
    }
  }
}
</script>
