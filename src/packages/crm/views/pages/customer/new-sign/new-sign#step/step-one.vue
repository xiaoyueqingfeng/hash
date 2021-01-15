<template>
  <div class="new-sign-stepone-tab-content">
    <a-form :form="form" @submit="nextStep">
      <!-- <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="系统"
        validate-status="error"
      >
        <a-radio-group
          name="radioGroup"
          disabled
          v-decorator="[
          'system_type',
          {rules: [{ required: true,message: '请选择系统'}], initialValue: 1}
        ]"
        >
          <a-radio  :value="1">SaaS 1.0</a-radio>
          <a-radio :value="2">SaaS 2.0</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="版本">
        <oa-select
          :options="version"
          v-decorator="[
            'system_version_id',
            { rules: [{ required: true, message: '请选择版本' }] }
          ]"
          placeholder="选择其他版本"
        />
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="门店数"
      >
        <a-input
          type="number"
          addonAfter="个"
          min="1"
          id="success"
          v-decorator="[
            'system_shop_num',
            {
              rules: [{ required: true, message: '请输入门店数' }],
              initialValue: 1
            }
          ]"
          placeholder="请输入"
        />
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="员工数"
      >
        不限
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="开通时长"
      >
        <a-input
          id="success"
          type="number"
          min="1"
          v-decorator="[
            'system_day',
            {
              rules: [{ required: true, message: '请输入开通时长' }],
              initialValue: 1
            }
          ]"
          placeholder="请输入时长"
        >
          <a-select slot="addonAfter" v-model="dateUnit" style="width: 50px">
            <a-select-option value="year">年</a-select-option>
            <a-select-option value="day">日</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>

      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="金额">
        <a-input
          id="success"
          addonAfter="元"
          type="number"
          step="0.01"
          min="0"
          v-decorator="[
            'system_amount',
            { rules: [{ required: true, message: '请输入金额' }] }
          ]"
          placeholder="请输入价格"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
export default {
  name: 'step_one',
  props: {
    version: {
      type: Array
    }
  },
  data() {
    return {
      dateUnit: 'year',
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
  computed: {},
  methods: {
    formatFormData(formData) {
      formData.system_day_original_value = formData.system_day + this.dateUnit
      if (this.dateUnit === 'year') {
        formData.system_day = formData.system_day * 365
      }
      return formData
    },
    nextStep(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = this.formatFormData(cloneDeep(values))
          this.$emit('sign-step', form)
          this.$emit('next-step', 1)
        }
      })
    }
  }
}
</script>
