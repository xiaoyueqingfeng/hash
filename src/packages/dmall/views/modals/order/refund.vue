<template>
  <oa-modal v-model="show" title="退款操作" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item label="消费者手机号" v-bind="formCol">
        {{ orderDetail.mobile }}
      </a-form-item>
      <a-form-item label="购买商品" v-bind="formCol">
        {{ orderDetail.goods_name }}
      </a-form-item>
      <a-form-item label="退款原因" required v-bind="formCol">
        <oa-select
          :options="oaReasonOptions"
          :disabled="isRefund"
          v-decorator="decorators.reason_id"
        ></oa-select>
      </a-form-item>
      <a-form-item label="退款说明" v-bind="formCol">
        <a-textarea
          :disabled="isRefund"
          placehloder="请输入退款说明"
          v-decorator="decorators.reason_content"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './refund#config'
import { orderRefund, getOrderInfo } from '@/api/order'
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
    getOrderInfo() {
      return getOrderInfo({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res
        if (this.isRefund) {
          this.$nextTick().then(() => {
            this.form.setFieldsValue({
              reason_content: res.refund_info.refund_mark,
              reason_id: parseInt(res.refund_info.reason_id)
            })
          })
        }
      })
    },
    orderRefund(data) {
      return orderRefund(data)
    }
  },
  computed: {
    isRefund() {
      return [5, 6, 7, 8].includes(this.orderStatus)
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
    disableDate(current) {
      return current && current > moment()
    }
  }
}
</script>
