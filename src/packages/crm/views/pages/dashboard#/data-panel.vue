<template>
  <oa-panel tabs class="data-panel">
    <template slot="actions">
      <oa-date-range-filter
        @change="onReloadData"
        :allowClear="false"
        :start.sync="date_start"
        :end.sync="date_end"
      ></oa-date-range-filter>
      <crm-organ-user-picker
        class="mg-l8"
        change-on-select
        @change="onReloadData"
        :organ-id.sync="organ_id"
        :user-id.sync="user_id"
      ></crm-organ-user-picker>
    </template>
    <a-tabs v-model="activeKey">
      <a-tab-pane v-if="hasSale" tab="客户转化" key="sale">
        <chart-sale
          ref="chartSale"
          :search="{
            organ_id,
            date_start,
            date_end,
            user_id
          }"
        />
      </a-tab-pane>
      <a-tab-pane v-if="hasServer" tab="服务情况" key="serve">
        <chart-server
          ref="chartServer"
          :search="{
            organ_id,
            date_start,
            date_end,
            user_id
          }"
        />
      </a-tab-pane>
    </a-tabs>
  </oa-panel>
</template>

<script>
import ChartSale from './data-panel#/sale'
import ChartServer from './data-panel#/server'
import moment from 'moment'
export default {
  props: {
    homeAuth: {
      type: Object,
      required: true
    }
  },
  components: {
    ChartSale,
    ChartServer
  },
  data() {
    return {
      activeKey: 'sale',
      date_start: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      date_end: moment().format('YYYY-MM-DD'),
      organ_id: undefined,
      user_id: undefined
    }
  },
  methods: {
    onReloadData() {
      this.$nextTick().then(() => {
        this.hasSale && this.$refs.chartSale.reloadData()
        this.hasServer && this.$refs.chartServer.reloadData()
      })
    }
  },
  computed: {
    hasSale() {
      return this.homeAuth.sale_data
    },
    hasServer() {
      return this.homeAuth.server_data
    }
  },
  created() {
    if (this.hasSale) {
      this.activeKey = 'sale'
      return
    }
    if (this.hasServer) {
      this.activeKey = 'serve'
    }
  }
}
</script>

<style lang="less" scoped>
.data-panel {
  .mg-t(16px);
}
</style>
