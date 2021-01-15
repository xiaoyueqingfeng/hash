<template>
  <div class="new-sign-stepthree-tab-content">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        v-if="isBindBrand"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="选择超管"
      >
        <oa-select
          :options="sales.contact"
          v-decorator="[
            'super_admin_id',
            { rules: [{ required: true, message: '请选择超管' }] }
          ]"
          placeholder="请选择超管"
        />
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
          @change="setPayTime"
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
          :options="sales.sale"
          v-decorator="[
            'sale_id',
            {
              rules: [{ required: true, message: '请选择售卖人' }],
              initialValue: sales.default_sale_id
            }
          ]"
          placeholder="请选择销售(默认客户跟进销售)"
        >
          <!-- <a-select-option v-for="(item) in sales.sale"
            :key="item.id"
            :value="item.id">{{item.name}}</a-select-option> -->
        </oa-select>
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="系统开通时间"
      >
        <a-date-picker
          v-decorator="[
            'open_time',
            { rules: [{ required: true, message: '请选择系统开通时间' }] }
          ]"
          @change="setOpenTime"
          style="width: 100%"
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
          <a-button @click="PreStep">上一步</a-button>
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
  name: 'step_three',
  props: {
    sales: {
      type: Object,
      default: () => {}
    },
    isBindBrand: [Number, String]
  },
  data() {
    return {
      pay_time: '',
      open_time: '',
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
  methods: {
    setPayTime(date, dateString) {
      this.pay_time = dateString
    },
    setOpenTime(date, dateString) {
      this.open_time = dateString
    },
    PreStep(e) {
      this.$emit('pre-step', 1)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 保存
          const form = cloneDeep(values)
          form.pay_time = this.pay_time
          form.open_time = this.open_time
          this.$emit('sign-step', form)
        }
      })
    }
  }
}
</script>
