<template>
  <oa-modal
    v-model="show"
    title="确认推送"
    :confirmLoading="pushApp$loading"
    :footer="null"
  >
    <p class="ta-c">
      确定把此版本推送吗？只允许一个最新版本，请选择App更新方式
    </p>
    <div class="mg-t24 ta-c">
      <oa-button type="primary" class="mg-r8" @click="publishApp('force')">
        强制更新
      </oa-button>
      <oa-button type="primary" @click="publishApp('common')">
        普通更新
      </oa-button>
    </div>
  </oa-modal>
</template>
<script>
import { pushApp } from '@/api/app-version'
export default {
  data() {
    return {
      show: true
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  async: {
    pushApp(push_type) {
      let typeValue
      switch (push_type) {
        case 'common':
          typeValue = 0
          break
        case 'force':
          typeValue = 1
          break
      }
      return pushApp({ id: this.id, push_type: typeValue })
    }
  },
  methods: {
    publishApp(push_type) {
      this.pushApp(push_type)
        .then(res => {
          this.show = false
          this.$message.success('推送成功')
          this.$emit('done')
        })
        .catch(() => {
          this.$message.error('推送失败，请检查！')
        })
    }
  }
}
</script>
