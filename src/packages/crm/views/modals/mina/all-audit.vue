<template>
  <oa-modal
    v-model="show"
    title="全量提交审核"
    @ok="handleSubmit"
    :confirmLoading="allAuditMina$loading"
  >
    <div>
      <div>你确认要全量提交审核吗？</div>
      <div>当前系统客户数：{{ total }}条</div>
    </div>
  </oa-modal>
</template>

<script>
import { allAuditMina } from '@/api/applet'

export default {
  name: '',

  components: {},

  props: {
    total: {
      type: Number
    },
    searchInfo: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {},

  async: {
    allAuditMina(data) {
      return allAuditMina(data)
    }
  },

  mounted() {},

  methods: {
    handleSubmit() {
      this.allAuditMina(this.searchInfo).then(res => {
        this.show = false
        this.$emit('done')
        this.$message.success('全量审核提交成功')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
