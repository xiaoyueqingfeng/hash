<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="禁用"
    :confirmLoading="onOk$loading"
    placement="topRight"
  >
    是否确认禁用？
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
        status: 2
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
