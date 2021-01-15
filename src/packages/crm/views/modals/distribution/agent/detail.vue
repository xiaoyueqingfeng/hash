<template>
  <oa-modal v-model="show" title="查看详情" :footer="null">
    <div class="row">
      <span class="label">合伙人姓名:</span>
      <span>{{ agentDetailObj.name }}</span>
    </div>
    <div class="row">
      <span class="label">所属品牌:</span>
      <span>{{ agentDetailObj.brand_name }}</span>
    </div>
    <div class="row">
      <span class="label">城市:</span>
      <span>
        {{
          agentDetailObj.province +
            agentDetailObj.city +
            agentDetailObj.district
        }}
      </span>
    </div>
    <div class="row">
      <span class="label">绑定手机号:</span>
      <span>{{ agentDetailObj.mobile }}</span>
    </div>
    <div class="row">
      <span class="label">备注:</span>
      <span>{{ agentDetailObj.remark }}</span>
    </div>
  </oa-modal>
</template>
<script>
import { agentDetail } from '@/api/agent'
export default {
  data() {
    return {
      show: false,
      agentDetailObj: {}
    }
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  created() {
    this.agentDetail()
  },
  async: {
    agentDetail() {
      return agentDetail({ id: this.id }).then(res => {
        this.agentDetailObj = res
      })
    }
  }
}
</script>
<style lang="less" scoped>
.row {
  display: flex;
  margin-bottom: 8px;
  .label {
    min-width: 100px;
    text-align: right;
    margin-right: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
