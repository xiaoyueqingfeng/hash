<template>
  <oa-modal v-model="show" @ok="submit">
    <p class="mg-t16 mg-b16 ta-c title">是否驳回申请?</p>
    <a-form :form="form">
      <a-form-item label="驳回原因" v-bind="formCol" required>
        <a-textarea
          v-decorator="decorators.note"
          placeholder="请输入驳回原因"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './reject#config'
import { withdrawReject } from '@/api/platform'
export default {
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
      }
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    rules
  },
  methods: {
    submit() {
      this.form.validate().then(values => {
        return withdrawReject({ id: this.id, ...values }).then(res => {
          this.$message.success('申请已驳回')
          this.show = false
          this.$emit('done')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
</style>
