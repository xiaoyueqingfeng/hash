<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="提示"
    :confirmLoading="onOk$loading"
    placement="topRight"
  >
    <p>插件名称:{{ name }}</p>
    状态切换至下架，会导致该插件无法被销售，会影响到以上插件组合
    敏感操作，请再次确认
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
        status: 2
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
