<template>
  <oa-confirm
    v-model="show"
    @ok="submit"
    :confirmLoading="deleteNotice$loading"
    title="删除公告"
  >
    确定删除该公告吗？ 此操作不可逆，请慎重
  </oa-confirm>
</template>

<script>
import { noticeDeleteSystem, noticeDeleteActivity } from '@/api/notice'
export default {
  data() {
    return {
      show: true
    }
  },
  props: {
    id: {
      type: Number
    },
    from: {
      type: String
    }
  },
  methods: {
    submit() {
      this.deleteNotice({ id: this.id }).then(res => {
        this.$message.success('删除失败')
        this.show = false
        this.$emit('done')
      })
    }
  },
  async: {
    deleteNotice(data) {
      switch (this.from) {
        case 'system':
          return noticeDeleteSystem(data)
        case 'activity':
          return noticeDeleteActivity(data)
      }
    }
  }
}
</script>
