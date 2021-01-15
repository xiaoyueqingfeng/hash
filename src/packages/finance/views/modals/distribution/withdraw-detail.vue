<template>
  <oa-modal v-model="show" title="查看账户" :footer="null">
    <div class="row">
      <span class="label">合伙人姓名:</span>
      <span>{{ withdrawDetail.agent_name }}</span>
    </div>
    <div class="row">
      <span class="label">所属品牌:</span>
      <span>{{ withdrawDetail.brand }}</span>
    </div>
    <div class="row">
      <span class="label">账户名:</span>
      <span>{{ withdrawDetail.payee_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行:</span>
      <span>{{ withdrawDetail.bank_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行卡号:</span>
      <span>{{ withdrawDetail.account_number }}</span>
    </div>
  </oa-modal>
</template>
<script>
import { getWithdrawDetail } from '@/api/withdraw'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      show: true,
      withdrawDetail: {}
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  async: {
    getWithdrawDetail() {
      return getWithdrawDetail({ id: this.id }).then(res => {
        this.withdrawDetail = res
      })
    }
  },
  created() {
    this.getWithdrawDetail()
  }
}
</script>
<style lang="less" scoped>
.row {
  display: flex;
  margin-bottom: 16px;
  .label {
    min-width: 100px;
    .mg-r(16px);
    text-align: right;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
