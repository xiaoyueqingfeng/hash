<template>
  <oa-modal
    v-model="show"
    title="批量提交审核"
    @ok="handleSubmit"
    :confirmLoading="batchAuditMina$loading"
  >
    <div>
      <div>你确认要批量提交审核吗？</div>
      <div>当前选中客户数：{{ total }}条</div>
    </div>
  </oa-modal>
</template>

<script>
import { batchAuditMina } from '@/api/applet'

export default {
  name: '',

  components: {},

  props: {
    leads_ids: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number
    }
  },

  data() {
    return {
      show: false
    }
  },

  async: {
    batchAuditMina(data) {
      return batchAuditMina(data)
    }
  },

  mounted() {},

  methods: {
    handleSubmit() {
      console.log('leads_ids', this.leads_ids)
      this.batchAuditMina({
        audit_type: 2, // 审核类型 单个 1 批量 2
        leads_ids: this.leads_ids
      }).then(res => {
        this.show = false
        this.$emit('done')
        this.$message.success('批量审核提交成功')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
