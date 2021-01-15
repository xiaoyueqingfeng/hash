<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="提示"
    :confirmLoading="setDown$loading"
    placement="topRight"
  >
    <p>模块名称: {{ name }}</p>
    状态切换至下架，会导致该模块无法被销售， 敏感操作，请再次确认
  </oa-confirm>
</template>
<script>
import { setDown } from '@/api/module'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    id: {
      type: [Number, String]
    },
    name: {
      type: String,
      default: ''
    }
  },
  async: {
    setDown(data) {
      return setDown(data)
    }
  },
  methods: {
    onOk() {
      this.setDown({ module_id: this.id }).then(res => {
        this.$message.success('修改成功')
        this.$emit('success')
        this.show = false
      })
    }
  }
}
</script>
