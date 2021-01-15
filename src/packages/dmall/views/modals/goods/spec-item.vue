<template>
  <oa-modal title="新增规格" v-model="show" @ok="onSubmit">
    <a-form :form="form">
      <a-form-item label="规格名称" v-bind="formCol" required>
        <a-input v-decorator="decorators.spec_name"></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { rules } from './spec-item#config'
export default {
  name: 'modalSpecItem',
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false,
      formCol: {
        'label-col': { span: 4 },
        'wrapper-col': { span: 20 }
      }
    }
  },
  props: {
    item: Object
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.$emit('success', values.spec_name)
        this.show = false
      })
    }
  }
}
</script>
