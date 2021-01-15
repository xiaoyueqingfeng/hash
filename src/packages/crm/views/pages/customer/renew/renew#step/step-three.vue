<template>
  <div class="new-sign-stepthree-tab-content">
    <a-form :form="form" @submit="onSubmit">
      <a-form-item
        v-if="false"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="选择超管"
      >
        <a-select
          v-decorator="[
            'super',
            { rules: [{ required: true, message: '请选择超管' }] }
          ]"
          placeholder="请选择超管"
        >
          <a-select-option value="male">male</a-select-option>
          <a-select-option value="female">female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="付款时间"
      >
        <a-date-picker
          v-decorator="[
            'pay_time',
            { rules: [{ required: true, message: '请选择支付时间' }] }
          ]"
          @change="selectPayDate"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="OA单号"
      >
        <a-input
          id="success"
          v-decorator="['oa_sn']"
          placeholder="请输入OA单号"
        />
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="售卖人"
      >
        <oa-select
          :options="sales"
          v-decorator="[
            'sale_id',
            { rules: [{ required: true, message: '请选择售卖人' }] }
          ]"
          placeholder="请选择"
        />
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="备注">
        <a-textarea
          v-decorator="['remake']"
          placeholder="请输入备注信息"
          :rows="4"
        />
      </a-form-item>
      <div class="btn-group">
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button @click="preStep">上一步</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<style lang="less">
.new-sign-stepthree-tab-content {
  .btn-group {
    .ant-btn-primary,
    .skip {
      margin-left: 8px;
    }
  }
}
</style>

<script>
import { cloneDeep } from 'lodash-es'
export default {
  name: 'StepThree',
  props: {
    salesInfo: {
      type: Object,
      default: () => {
        return { sales: [] }
      }
    }
  },
  data() {
    return {
      payDate: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this)
    }
  },
  computed: {
    sales() {
      return this.salesInfo.sales || []
    }
  },
  methods: {
    selectPayDate(date, dateString) {
      this.payDate = dateString
    },
    preStep(e) {
      this.$emit('pre-step', 1)
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.system_type = 1
          // values.is_buy_system = values.is_buy_system || 0
          const form = cloneDeep(values)
          form.pay_time = this.payDate
          this.$emit('re-step', form)
        }
      })
    }
  }
}
</script>
