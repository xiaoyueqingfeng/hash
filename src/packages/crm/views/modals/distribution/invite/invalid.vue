<template>
  <oa-modal
    v-model="show"
    @ok="submit"
    :confirmLoading="inviteSetInvalid$loading"
  >
    <div class="tips ta-c">
      是否将客户
      <span class="customer-name">{{ customerName }}</span>
      设置无效
    </div>
    <a-form class="mg-t32" :form="form">
      <a-form-item label="无效原因" v-bind="formCol">
        <a-textarea
          placeholder="请输入无效原因"
          v-decorator="decorators.invalid_reason"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './invalid#config'
import { inviteSetInvalid } from '@/api/invite'
import { values } from 'lodash-es'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false,
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
    },
    customerName: {
      type: String,
      required: true
    }
  },
  computed: {
    rules
  },
  async: {
    inviteSetInvalid(data) {
      return inviteSetInvalid(data)
    }
  },
  methods: {
    submit() {
      this.form.validate().then(values => {
        this.inviteSetInvalid({ ...values, id: this.id }).then(res => {
          this.$message.success('设置无效成功')
          this.show = false
          this.$emit('done')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.customer-name {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
</style>
