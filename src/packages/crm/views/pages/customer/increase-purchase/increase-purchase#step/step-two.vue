<template>
  <div class="increase-purchase-steptwo-tab-content">
    <a-form :form="form" @submit="onSubmit">
      <a-form-item
        v-bind="formCol"
        label="开通时间"
        v-show="systemVersion === '2'"
      >
        <a-date-picker
          :disabledDate="disabledDate"
          v-decorator="decorators.open_time"
          @change="selectOpenDate"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item v-bind="formCol" label="付款时间">
        <a-date-picker
          v-decorator="decorators.pay_time"
          @change="selectPayDate"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item v-bind="formCol" label="OA单号">
        <a-input
          id="success"
          v-decorator="['oa_sn']"
          placeholder="请输入OA单号"
        />
      </a-form-item>
      <a-form-item v-bind="formCol" label="售卖人">
        <oa-select
          :options="sales"
          v-decorator="decorators.sale_id"
        ></oa-select>
      </a-form-item>
      <a-form-item v-bind="formCol" label="备注">
        <a-textarea
          v-decorator="['remake']"
          placeholder="请输入备注信息"
          :rows="4"
        />
      </a-form-item>
      <div class="btn-group">
        <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
          <a-button @click="preStep">上一步</a-button>
          <a-button
            class="mg-l8"
            type="primary"
            html-type="submit"
            :loading="loading"
          >
            保存
          </a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { stepTwoRules } from './increase-purchase#step#config'
export default {
  data() {
    return {
      form: this.$stForm.create(),
      formCol: {
        'label-col': { xs: { span: 24 }, sm: { span: 7 } },
        'wrapper-col': { xs: { span: 24 }, sm: { span: 12 } }
      },
      payDate: '',
      openDate: moment().format('YYYY-MM-DD')
    }
  },
  props: {
    sysInfo: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        open_time: moment()
      })
    })
  },
  computed: {
    decorators() {
      return this.form.decorators(stepTwoRules)
    },
    systemVersion() {
      return this.sysInfo.system_type || []
    },
    sales() {
      return this.sysInfo.sales || []
    }
  },
  methods: {
    disabledDate(current) {
      return current && current < moment().subtract(1, 'days')
    },
    selectPayDate(date, dateString) {
      this.payDate = dateString
    },
    selectOpenDate(date, dateString) {
      this.openDate = dateString
    },
    preStep() {
      this.$emit('pre-step', 0)
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        form.pay_time = this.payDate
        form.open_time = this.openDate
        this.$emit('re-step', form)
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
