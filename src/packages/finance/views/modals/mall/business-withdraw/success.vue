<template>
  <oa-modal v-model="show" title="结算完成" @ok="submit">
    <a-form :form="form">
      <a-form-item label="财务单号" v-bind="formCol">
        <a-input
          v-decorator="decorators.order_id"
          placeholder="请输入财务单号"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './success#config'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: true,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      }
    }
  },
  computed: {
    rules
  },
  methods: {
    submit() {
      this.form.validate().then(values => {})
    }
  }
}
</script>
