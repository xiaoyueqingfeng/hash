<template>
  <div class="dashboard">
    <div class="dashboard__main">
      <report-panel
        v-if="isReportPanelEnable"
        :homeAuth="homeAuth"
      ></report-panel>
      <data-panel v-if="isDataPanelEnable" :homeAuth="homeAuth"></data-panel>
      <pk-panel v-if="isPkPanelEnable" :homeAuth="homeAuth"></pk-panel>
    </div>
    <!-- <div class="dashboard__sider"></div> -->
  </div>
</template>

<script>
import ReportPanel from './dashboard#/report-panel.vue'
import DataPanel from './dashboard#/data-panel.vue'
import PkPanel from './dashboard#/pk-panel.vue'
import { getHomeMenu } from '@/api/stat'

export default {
  components: {
    ReportPanel,
    DataPanel,
    PkPanel
  },
  beforeRouteEnter(to, from, next) {
    getHomeMenu().then(res => {
      next(vm => {
        vm.homeAuth = res
      })
    })
  },
  data() {
    return {
      homeAuth: {
        // 战报数据
        report_data: 0,
        // 客户转化
        sale_data: 0,
        // 服务情况
        server_data: 0,
        // 销售团队PK
        sale_organ_compare: 0,
        // 销售员工PK
        sale_compare: 0,
        // 商服员工PK
        server_compare: 0
      }
    }
  },
  computed: {
    isReportPanelEnable() {
      return this.homeAuth.report_data
    },
    isDataPanelEnable() {
      return this.homeAuth.sale_data || this.homeAuth.server_data
    },
    isPkPanelEnable() {
      return (
        this.homeAuth.sale_organ_compare ||
        this.homeAuth.sale_compare ||
        this.homeAuth.server_compare
      )
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  &__main {
    flex: 1;
  }
  &__sider {
    .w(264px);
    .mg-l(24px);
  }
}
</style>
