<template>
  <oa-modal v-model="show" title="发货操作" @ok="handleSubmit">
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
      <a-form-item label="物流" required v-bind="formCol">
        <oa-select
          :options="logistics"
          v-decorator="decorators.express_company_id"
        ></oa-select>
      </a-form-item>
      <a-form-item label="运单号" required v-bind="formCol">
        <a-input
          v-decorator="decorators.express_no"
          placeholder="请输入运单编号"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './ship#config'
import { getExpressList } from '@/api/common'
import { getOrderInfo, orderSendOutGoods } from '@/api/order'
export default {
  name: 'Ship',
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
      logistics: [],
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
    getOrderInfo() {
      return getOrderInfo({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res
      })
    },
    getExpressList() {
      return getExpressList().then(res => {
        this.logistics = res.list
      })
    },
    orderSendOutGoods(data) {
      return orderSendOutGoods(data)
    }
  },
  mounted() {
    this.getOrderInfo()
    this.getExpressList()
  },
  methods: {
    handleSubmit() {
      this.form.validate().then(values => {
        this.orderSendOutGoods({ ...values, order_sn: this.order_sn }).then(
          res => {
            this.show = false
            this.$message.success('发货操作成功')
            this.$emit('done')
          }
        )
      })
    }
  }
}
</script>
