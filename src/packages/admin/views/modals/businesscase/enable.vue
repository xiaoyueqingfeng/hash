<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="恢复"
    :confirmLoading="onOk$loading"
  >
    是否确认恢复？
  </oa-confirm>
</template>

<script>
import { editBusinesscaseStatus } from '@/api/businesscase'

export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {},
  async: {
    onOk() {
      let para = {
        id: this.id,
        status: 1
      }
      editBusinesscaseStatus(para).then(res => {
        this.$message.success('修改成功')
        this.$emit('success')
        this.show = false
      })
    }
  }
}
</script>
