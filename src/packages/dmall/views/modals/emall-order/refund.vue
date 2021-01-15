<template>
  <oa-modal v-model="show" title="退款操作" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item label="消费者手机号" v-bind="formCol">
        {{ orderDetail.mobile }}
      </a-form-item>
      <a-form-item label="购买商品" v-bind="formCol">
        <a-checkbox-group
          :options="productOptions"
          @change="onRefundAmount"
          v-decorator="decorators.order_item_id"
        />
      </a-form-item>
      <a-form-item label="退款金额" v-bind="formCol">
        {{ refundAmount }}
        <span v-if="isAllGoods">(含运费)</span>
      </a-form-item>
      <a-form-item label="退款原因" required v-bind="formCol">
        <oa-select
          :options="oaReasonOptions"
          v-decorator="decorators.reason_id"
        ></oa-select>
      </a-form-item>
      <a-form-item label="退款说明" v-bind="formCol">
        <a-textarea
          placehloder="请输入退款说明"
          v-decorator="decorators.refund_mark"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './refund#config'
import {
  orderRefund,
  getOrderRefundInfo,
  getRefundAmount
} from '@/api/emall-order'
import { mapGetters } from 'vuex'
export default {
  name: 'refund',
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: true,
      checkedOrderList: [],
      refundAmount: 0,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      orderDetail: {},
      productOptions: []
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
      return getOrderRefundInfo({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res.info
        this.productOptions = res.info.product_list.map(item => {
          const checkboxOption = {
            label: `${item.goods_name} ${item.goods_spec} ${
              item.goods_num
            }件 （${item.goods_price}元)`,
            value: item.order_item_id,
            disabled: item.is_disabled ? true : false
          }
          return {
            ...checkboxOption,
            ...item
          }
        })
      })
    },
    orderRefund(data) {
      return orderRefund(data)
    }
  },
  computed: {
    isAllGoods() {
      return this.productOptions.length === this.checkedOrderList.length
    },
    orderStatus() {
      return parseInt(this.orderDetail.order_status)
    },
    ...mapGetters('dmall', ['oaReasonOptions'])
  },
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    handleSubmit() {
      this.form.validate().then(values => {
        this.orderRefund({ ...values, order_sn: this.order_sn }).then(res => {
          this.show = false
          this.$message.success('退款操作成功')
          this.$emit('done')
        })
      })
    },
    onRefundAmount(values) {
      if (values.length) this.refundAmount = 0
      this.checkedOrderList = values
      getRefundAmount({ order_sn: this.order_sn, order_item_id: values }).then(
        res => {
          this.refundAmount = res.info.refund_amount
        }
      )
    },
    disableDate(current) {
      return current && current > moment()
    }
  }
}
</script>
