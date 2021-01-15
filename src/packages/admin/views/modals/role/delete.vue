<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    :confirmLoading="deleteRole$loading"
    title="删除提示"
  >
    是否确认删除该角色
  </oa-confirm>
</template>

<script>
import { deleteRole } from '@/api/role'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    role_id: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    onOk() {
      this.deleteRole().then(() => {
        this.$message.success('删除成功')
        this.$emit('done')
        this.show = false
      })
    }
  },
  async: {
    deleteRole() {
      return deleteRole({ role_id: this.role_id })
    }
  }
}
</script>
