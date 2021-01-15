<template>
  <oa-modal v-model="show" title="查看账户" :footer="null">
    <div class="row">
      <span class="label">合伙人姓名:</span>
      <span>{{ accountDetail.name }}</span>
    </div>
    <div class="row">
      <span class="label">所属品牌:</span>
      <span>{{ accountDetail.brand_name }}</span>
    </div>
    <div class="row">
      <span class="label">账户名:</span>
      <span>{{ accountDetail.payee_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行:</span>
      <span>{{ accountDetail.bank_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行卡号:</span>
      <span>{{ accountDetail.account_number }}</span>
    </div>
  </oa-modal>
</template>
<script>
import { agentbBankAccountDetail } from '@/api/agent'
export default {
  data() {
    return {
      show: false,
      accountDetail: {}
    }
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  created() {
    this.agentbBankAccountDetail()
  },
  async: {
    agentbBankAccountDetail() {
      return agentbBankAccountDetail({ id: this.id }).then(res => {
        this.accountDetail = res
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
