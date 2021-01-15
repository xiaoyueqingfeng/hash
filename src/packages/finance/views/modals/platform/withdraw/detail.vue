<template>
  <oa-modal v-model="show" title="提现详情">
    <div>
      <div class="row">
        <span class="label">所属品牌:</span>
        <span>{{ withdrawDetail.leads_name }}</span>
      </div>
      <div class="row">
        <span class="label">开户名称:</span>
        <span>{{ withdrawDetail.account_name }}</span>
      </div>
      <div class="row">
        <span class="label">开户银行:</span>
        <span>{{ withdrawDetail.bank_name }}</span>
      </div>
      <div class="row">
        <span class="label">支行名称:</span>
        <span>{{ withdrawDetail.bank_subbranch_name }}</span>
      </div>
      <div class="row">
        <span class="label">银行卡号:</span>
        <span>{{ withdrawDetail.card_number }}</span>
      </div>
      <div class="row">
        <span class="label">本次提现金额:</span>
        <span>{{ withdrawDetail.amount }}</span>
      </div>
      <div class="row">
        <span class="label">状态:</span>
        <span>{{ withdrawDetail.status_text }}</span>
      </div>
      <div class="row" v-if="withdrawDetail.status === 1">
        <span class="label">备注:</span>
        <span>{{ withdrawDetail.note }}</span>
      </div>
      <div class="row" v-if="withdrawDetail.status === 2">
        <span class="label">驳回原因:</span>
        <span>{{ withdrawDetail.note }}</span>
      </div>
      <a-divider />
      <div class="row">
        <span class="label">手机号码:</span>
        <span>{{ withdrawDetail.mobile }}</span>
      </div>
      <div class="row">
        <span class="label">账户总额:</span>
        <span>{{ withdrawDetail.total_amount }}</span>
      </div>
      <div class="row">
        <span class="label">可提现总额:</span>
        <span>{{ withdrawDetail.current_amount }}</span>
      </div>
      <div class="row">
        <span class="label">已提现总额:</span>
        <span>{{ withdrawDetail.total_withdraw_amount }}</span>
      </div>
      <div class="row">
        <span class="label">已完成提现次数:</span>
        <span>{{ withdrawDetail.total_withdraw_times }}</span>
      </div>
    </div>

    <template slot="footer">
      <a-button type="primary" @click="toFlowList" class="mg-l16">
        查看流水
      </a-button>
    </template>
  </oa-modal>
</template>
<script>
import { getWithdrawDetail } from '@/api/platform'
import { get } from 'lodash-es'
export default {
  name: 'PlatformWithdrawDetail',
  data() {
    return {
      show: true,
      withdrawDetail: {}
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  async: {
    getWithdrawDetail() {
      return getWithdrawDetail({ id: this.id }).then(res => {
        this.withdrawDetail = get(res, 'info', {})
      })
    }
  },
  created() {
    this.getWithdrawDetail()
  },
  methods: {
    toFlowList() {
      this.show = false
      console.log(this.withdrawDetail)
      this.$router.push({
        name: 'platform-withdraw-flow',
        query: {
          leads_id: this.withdrawDetail.leads_id
        }
      })
    }
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
