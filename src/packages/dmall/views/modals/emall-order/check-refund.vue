<template>
  <oa-modal v-model="show" title="退款操作" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item label="消费者手机号" v-bind="formCol">
        {{ orderDetail.mobile }}
      </a-form-item>
      <a-form-item label="购买商品" v-bind="formCol">
        <div v-for="(item, index) in productOptions" :key="index">
          <span>{{ item.label }}</span>
        </div>
      </a-form-item>
      <a-form-item label="运费" v-bind="formCol">
        {{ orderDetail.freight }}元
      </a-form-item>
      <a-form-item label="退款金额" v-bind="formCol">
        {{ orderDetail.refund_money }}元
      </a-form-item>
      <a-form-item label="退款说明" v-bind="formCol">
        {{ orderDetail.refund_mark }}
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './refund#config'
import { orderCheckedRefund, getOrderRefundShow } from '@/api/emall-order'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckRefund',
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: true,
      checkedOrderList: [],
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      orderDetail: {},
      productOptions: []
    }
  },
  props: {
    isRefund: {
      type: Boolean,
      default: false
    },
    refund_sn: {
      type: String,
      required: true
    }
  },
  async: {
    getOrderInfo() {
      return getOrderRefundShow({ refund_sn: this.refund_sn }).then(res => {
        this.orderDetail = res.info
        this.productOptions = res.info.product_list.map(item => {
          const checkboxOption = {
            label: `${item.goods_name} ${item.goods_spec_desc} ${
              item.number
            }件 （${item.goods_refund_money}元)`,
            value: item.order_item_id
          }
          return {
            ...checkboxOption,
            ...item
          }
        })
      })
    },
    orderCheckedRefund(data) {
      return orderCheckedRefund(data)
    }
  },
  computed: {
    orderStatus() {
      return parseInt(this.orderDetail.order_status)
    },
    ...mapGetters('dmall', ['reasonOptions'])
  },
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    handleSubmit() {
      this.form.validate().then(values => {
        this.orderCheckedRefund({ refund_sn: this.refund_sn }).then(res => {
          this.show = false
          this.$message.success('退款操作成功')
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
