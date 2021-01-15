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
import { editTooltipsStatus } from '@/api/tooltip'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  async: {
    onOk() {
      let para = {
        id: this.record.id,
        status: 0
      }
      editTooltipsStatus(para).then(res => {
        this.$message.success('修改成功')
        this.$emit('success')
        this.show = false
      })
    }
  }
}
</script>
