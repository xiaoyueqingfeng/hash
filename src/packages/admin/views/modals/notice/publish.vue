<template>
  <oa-confirm
    v-model="show"
    @ok="submit"
    @cancel="cancelSubmit"
    title="发布公告"
    :confirmLoading="publishNotice$loading"
  >
    是否确认发布公告？
  </oa-confirm>
</template>

<script>
import { noticeSendSystem, noticeSendActivity } from '@/api/notice'
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
      type: String //数据域不同，分为系统公告和活动公告
    }
  },
  async: {
    publishNotice(data) {
      switch (this.from) {
        case 'system':
          return noticeSendSystem(data)
        case 'activity':
          return noticeSendActivity(data)
      }
    }
  },
  methods: {
    submit() {
      this.publishNotice({ id: this.id }).then(res => {
        this.show = false
        this.$message.success('发布成功')
        this.$emit('done')
      })
    },
    cancelSubmit() {
      this.show = false
      this.$emit('cancel')
    }
  }
}
</script>
