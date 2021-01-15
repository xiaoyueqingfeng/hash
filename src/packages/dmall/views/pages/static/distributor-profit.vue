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
      rowKey="order_id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getDistributorProfitList$loading"
      @change="tbOnTableChange"
    ></oa-table>
  </oa-panel>
</template>
<script>
import { statDistributorProfit } from '@/api/stat'
import { tableOptions } from './distributor-profit#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'

export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getDistributorProfitList() {
      return statDistributorProfit(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getDistributorProfitList()
  },
  watch: {
    $route(newRoute) {
      this.getDistributorProfitList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
