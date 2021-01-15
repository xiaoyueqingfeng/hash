<template>
  <oa-panel>
    <a-input-search
      enterButton
      placeholder="搜索合伙人姓名、手机号"
      v-model="$searchQuery.keywords"
      style="width: 300px"
      @search="tbOnSearchKeywords('keywords', $event)"
    ></a-input-search>
    <oa-table
      class="mg-t16"
      rowKey="id"
      :scroll="{ x: 1400 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getCommissionDefiniteList$loading"
      @change="tbOnTableChange"
    ></oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './commission-detail#config'
import { getCommissionDefiniteList } from '@/api/commission'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getCommissionDefiniteList() {
      return getCommissionDefiniteList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  created() {
    this.getCommissionDefiniteList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getCommissionDefiniteList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
