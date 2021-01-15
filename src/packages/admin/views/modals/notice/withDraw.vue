<template>
  <oa-confirm
    v-model="show"
    @ok="submit"
    :confirmLoading="withdrawNotice$loading"
    title="撤回公告"
  >
    确定撤回该公告吗？ 下架后SaaS中不展示该条信息 此操作不可逆，请慎重
  </oa-confirm>
</template>

<script>
import { noticeWithdrawSystem, noticeWithdrawActivity } from '@/api/notice'
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
      this.withdrawNotice({ id: this.id }).then(res => {
        this.$message.success('公告撤回成功')
        this.show = false
        this.$emit('done')
      })
    }
  },
  async: {
    withdrawNotice(data) {
      switch (this.from) {
        case 'system':
          return noticeWithdrawSystem(data)
        case 'activity':
          return noticeWithdrawActivity(data)
      }
    }
  }
}
</script>
