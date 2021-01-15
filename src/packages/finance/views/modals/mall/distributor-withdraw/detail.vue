<template>
  <oa-modal v-model="show" title="查看账户" :footer="null">
    <div class="row">
      <span class="label">
        {{ this.from === 'business' ? ' 品牌商姓名' : '分销商姓名' }}:
      </span>
      <span>{{ withdrawDetail.name }}</span>
    </div>
    <div class="row" v-if="this.from === 'distributor'">
      <span class="label">所属品牌:</span>
      <span>{{ withdrawDetail.brand_name }}</span>
    </div>
    <div class="row">
      <span class="label">账户名:</span>
      <span>{{ withdrawDetail.bank_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行:</span>
      <span>{{ withdrawDetail.bank_user_name }}</span>
    </div>
    <div class="row">
      <span class="label">支行名称:</span>
      <span>{{ withdrawDetail.bank_subbranch_name }}</span>
    </div>
    <div class="row">
      <span class="label">银行卡号:</span>
      <span>{{ withdrawDetail.bank_card_number }}</span>
    </div>
  </oa-modal>
</template>
<script>
import { getCashWithdrawInfo } from '@/api/cash_withdraw'
import { getBrandBank } from '@/api/brand'
import { get } from 'lodash-es'
export default {
  name: 'CashWithdraw',
  data() {
    return {
      show: true,
      withdrawDetail: {}
    }
  },
  props: {
    from: {
      type: String,
      default: ''
    },
    withdrawId: {
      type: String,
      required: true
    }
  },
  async: {
    getWithdrawDetail() {
      switch (this.from) {
        case 'distributor':
          return getCashWithdrawInfo({ id: this.withdrawId }).then(res => {
            this.withdrawDetail = {
              ...res.info,
              name: res.info.distributor_name
            }
          })
        case 'business':
          return getBrandBank({
            settlement_id: this.withdrawId
          }).then(res => {
            this.withdrawDetail = {
              ...res,
              name: res.brand_dealer_name
            }
          })
      }
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
