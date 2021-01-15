<template>
  <div class="stat-leads-default-chart">
    <div class="ta-r">
      <a-radio-group
        :value="$route.name"
        @change="e => $router.push({ name: e.target.value })"
      >
        <a-radio-button value="stat-leads-default-list">列表</a-radio-button>
        <a-radio-button value="stat-leads-default-chart">图表</a-radio-button>
      </a-radio-group>
    </div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :span="12">
        <chart-circle class="chart-panel"></chart-circle>
      </a-col>
      <a-col :span="12">
        <chart-funnel class="chart-panel"></chart-funnel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChartCircle from './chart#circle.vue'
import ChartFunnel from './chart#funnel.vue'
export default {
  components: {
    ChartCircle,
    ChartFunnel
  }
}
</script>
<style lang="less">
.stat-leads-default-chart {
  .chart-panel {
    border: 1px solid rgba(0, 0, 0, 0.06);
    min-height: 612px;
  }
}
</style>
