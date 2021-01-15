<template>
  <div class="stat-server-default-chart">
    <div class="ta-r">
      <a-radio-group
        :value="$route.name"
        @change="e => $router.push({ name: e.target.value })"
      >
        <a-radio-button value="stat-server-default-list">列表</a-radio-button>
        <a-radio-button value="stat-server-default-chart">图表</a-radio-button>
      </a-radio-group>
    </div>
    <div class="mg-t24">
      <a-row :gutter="24">
        <a-col :span="12">
          <chart-level-ring class="chart-panel" />
        </a-col>
        <a-col :span="12">
          <chart-lost-bar class="chart-panel" />
        </a-col>
      </a-row>
      <a-row :gutter="24" class="mg-t24">
        <a-col :span="12">
          <chart-level-bar class="chart-panel" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import ChartLevelBar from './chart#level-bar'
import ChartLevelRing from './chart#level-ring'
import ChartLostBar from './chart#lost-bar'
export default {
  components: {
    ChartLevelBar,
    ChartLevelRing,
    ChartLostBar
  }
}
</script>

<style lang="less">
.stat-server-default-chart {
  .chart-panel {
    border: 1px solid rgba(0, 0, 0, 0.06);
    .h(350px);
  }
}
</style>
