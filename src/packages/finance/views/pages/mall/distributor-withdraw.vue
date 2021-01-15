<template>
  <oa-panel app>
    <a-input-search
      enterButton
      placeholder="搜索订单编号、商品名称"
      v-model="$searchQuery.keywords"
      style="width: 300px"
      @search="tbOnSearchKeywords('keywords', $event)"
    ></a-input-search>
    <oa-table
      class="mg-t16"
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getCashWithdrawList$loading"
      @change="tbOnTableChange"
    >
      <template slot="status" slot-scope="text">
        {{ withdrawStatusFilter(text) }}
      </template>
      <template slot="status_reason" slot-scope="record">
        <a-tooltip v-if="record.status === 3" placement="top">
          <a-icon type="question-circle" />
          <template slot="title">
            <span>
              {{ record.status_reason }}
            </span>
          </template>
        </a-tooltip>
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-modal-link="{
              name: 'mall-distributor-withdraw-detail',
              props: {
                withdrawId: record.id,
                from: 'distributor'
              }
            }"
          >
            详情
          </a>
          <a @click="withdrawConfirm(record.id)">
            结算
          </a>
          <a
            v-modal-link="{
              name: 'mall-distributor-withdraw-reject',
              props: {
                withdrawId: record.id
              },
              on: { done: getCashWithdrawList }
            }"
          >
            驳回
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getCashWithdrawList, cashWithdrawSetPass } from '@/api/cash_withdraw'
import { tableOptions } from './distributor-withdraw#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
import { mapGetters } from 'vuex'
export default {
  name: 'WithDraw',
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    cashWithdrawSetPass(data) {
      return cashWithdrawSetPass(data).then(res => {
        this.$message.success('已确认结算完成')
        this.getCashWithdrawList()
      })
    },
    getCashWithdrawList() {
      return getCashWithdrawList(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  computed: {
    tableOptions,
    ...mapGetters('finance', ['withdrawStatus'])
  },
  created() {
    this.getCashWithdrawList()
  },
  watch: {
    $route(newRoute) {
      this.getCashWithdrawList()
    }
  },
  methods: {
    withdrawStatusFilter(value) {
      let name = ''
      this.withdrawStatus.forEach(item => {
        if (item.id == value) name = item.name
      })
      return name
    },
    withdrawConfirm(id) {
      this.$confirm({
        title: '结算完成',
        content: '确认已完成结算打款后点击确认按钮',
        onOk: () => {
          return this.cashWithdrawSetPass({ id: id })
        }
      })
    }
  }
}
</script>
