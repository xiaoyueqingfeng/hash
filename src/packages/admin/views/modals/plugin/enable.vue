<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    :confirmLoading="onOk$loading"
    title="提示"
  >
    <p>插件名称:{{ name }}</p>
    是否将状态切换至上架,请再次确认
  </oa-confirm>
</template>

<script>
import { editPluginStatus } from '@/api/plugin'

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
    },
    name: {
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
      editPluginStatus(para).then(res => {
        this.$message.success('修改成功')
        this.$emit('success')
        this.show = false
      })
    }
  }
}
</script>
