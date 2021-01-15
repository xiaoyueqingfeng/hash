<template>
  <div class="stat-sale-default-chart">
    <div class="ta-r">
      <a-radio-group
        :value="$route.name"
        @change="e => $router.push({ name: e.target.value })"
      >
        <a-radio-button value="stat-sale-default-list">列表</a-radio-button>
        <a-radio-button value="stat-sale-default-chart">图表</a-radio-button>
      </a-radio-group>
    </div>
    <a-row class="mg-t24">
      <a-col :span="24">
        <organ-bar class="chart-panel"></organ-bar>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mg-t16">
      <a-col :span="12">
        <organ-kinked class="chart-panel"></organ-kinked>
      </a-col>
      <a-col :span="12">
        <city-bar class="chart-panel"></city-bar>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import OrganBar from './chart#/organ-bar'
import CityBar from './chart#/city-bar'
import OrganKinked from './chart#/organ-kinked'
export default {
  components: {
    OrganBar,
    CityBar,
    OrganKinked
  }
}
</script>
<style lang="less" scoped>
.stat-sale-default-chart {
  .chart-panel {
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
