<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="提示"
    :confirmLoading="setUp$loading"
    placement="topRight"
  >
    <p>模块名称: {{ name }}</p>
    是否将状态切换至上架,请再次确认
  </oa-confirm>
</template>
<script>
import { setUp } from '@/api/module'
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
    setUp(data) {
      return setUp(data)
    }
  },
  methods: {
    onOk() {
      this.setUp({ module_id: this.id }).then(res => {
        this.$message.success('修改成功')
        this.$emit('success')
        this.show = false
      })
    }
  }
}
</script>
