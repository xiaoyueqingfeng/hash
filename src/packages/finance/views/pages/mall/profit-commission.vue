<template>
  <oa-panel app>
    <oa-table
      class="mg-t16"
      rowKey="order_id"
      :scroll="{ x: 1400 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getOrderProfitCommissionList$loading"
      @change="tbOnTableChange"
    >
      <template slot="status" slot-scope="text">
        {{ withdrawStatusFilter(text) }}
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getOrderProfitCommissionList } from '@/api/order'
import { tableOptions } from './profit-commission#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
import { mapGetters } from 'vuex'
export default {
  name: 'Withdraw',
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  async: {
    getOrderProfitCommissionList() {
      return getOrderProfitCommissionList(this.$searchQuery).then(res => {
        this.pager = res.pager
        this.dataSource = res.list
      })
    }
  },
  created() {
    this.getOrderProfitCommissionList()
  },
  watch: {
    $route(newRoute) {
      this.getOrderProfitCommissionList()
    }
  },
  computed: {
    tableOptions,
    ...mapGetters('finance', ['withdrawStatus'])
  },
  methods: {
    withdrawStatusFilter(value) {
      let name = ''
      this.withdrawStatus.forEach(item => {
        if (item.id == value) name = item.name
      })
      return name
    }
  }
}
</script>
