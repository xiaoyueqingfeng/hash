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
      rowKey="leads_id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getBrandProfitList$loading"
      @change="tbOnTableChange"
    ></oa-table>
  </oa-panel>
</template>
<script>
import { statBrandProfit } from '@/api/stat'
import { tableOptions } from './business-profit#config'
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
    getBrandProfitList() {
      return statBrandProfit(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getBrandProfitList()
  },
  watch: {
    $route(newRoute) {
      this.getBrandProfitList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
