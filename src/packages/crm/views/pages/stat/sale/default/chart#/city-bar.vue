<template>
  <oa-panel :loading="getCityBar$loading">
    <oa-t3>客户贡献分布</oa-t3>

    <template slot="actions">
      <oa-date-range-filter
        :allowClear="false"
        @change="onSearchChange"
        :start.sync="search.date_start"
        :end.sync="search.date_end"
      ></oa-date-range-filter>
    </template>
    <div class="mg-t24">
      <div id="sale-city-bar" style="height:300px"></div>
      <div class="sale-city-bar__legend">
        <i class="marker"></i>
        <span>新签客户数</span>
      </div>
    </div>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import { getCityBar } from '@/api/stat'
import { View } from '@antv/data-set'
import { Chart } from '@antv/g2'
import { unitFilter } from 'oa-core/filters/decimal.filters'
export default {
  data() {
    return {
      search: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD')
      },
      cityData: [],
      organOptions: [],
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new View()
      _dv.source(this.cityData)
      _dv.transform({
        type: 'map',
        callback(row) {
          row.name = row.city_name
          row.value = +row.number
          return row
        }
      })
      return _dv
    }
  },
  methods: {
    onSearchChange() {
      this.getCityBar().then(() => {
        this.c1.changeData(this.dv1)
      })
    },
    initC1() {
      console.log(this.dv1)
      this.c1 = new Chart({
        container: 'sale-city-bar',
        forceFit: true,
        height: 300
      })
      this.c1.source(this.dv1, {
        value: {
          tickCount: 2,
          formatter(v) {
            return unitFilter(v)
          }
        }
      })
      this.c1.legend(false)
      this.c1.tooltip({
        showTitle: false
      })
      this.c1
        .interval()
        .position('name*value')
        .color('name', ['l(270) 0:#36CBCB 1:#3BA0FF'])
      this.c1.render()
    }
  },
  mounted() {
    this.initData().then(() => {
      this.initC1()
    })
  },
  async: {
    initData() {
      return Promise.all([this.getCityBar()])
    },
    getCityBar() {
      return getCityBar({ ...this.search }).then(res => {
        this.cityData = res.grow
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sale-city-bar {
  &__legend {
    .ta-c;
    .mg-t(-60px);
    .lh(20px);
    .marker {
      display: inline-block;
      .s(8px, 8px);
      .bg(@primary-color);
      .mg-r(8px);
    }
  }
}
</style>
