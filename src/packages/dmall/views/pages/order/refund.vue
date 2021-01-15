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
      rowKey="refund_sn"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getRefundList$loading"
      @change="tbOnTableChange"
    >
      <template slot="detail" slot-scope="text, record">
        <dmall-table-column-order :record="record"></dmall-table-column-order>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { orderRefundList } from '@/api/order'
import { tableOptions } from './refund#config'
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
    getRefundList() {
      return orderRefundList(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getRefundList()
  },
  watch: {
    $route(newRoute) {
      this.getRefundList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
