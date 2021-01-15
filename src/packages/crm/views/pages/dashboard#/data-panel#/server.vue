<template>
  <div class="home-data-server">
    <a-spin :spinning="getHomeServerData$loading">
      <div class="funnel">
        <crm-funnel-chart
          :width="258"
          :height="300"
          :sourceData="funnel"
        ></crm-funnel-chart>
      </div>
      <div class="bar">
        <div id="home-data-server-bar"></div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { View } from '@antv/data-set'
import { Chart } from '@antv/g2'
import { getHomeServerData } from '@/api/stat'
import { get } from 'lodash-es'
import { unitFilter } from 'oa-core/filters/decimal.filters'
export default {
  props: {
    search: {
      // {date_start,date_end,organ_id,user_id}
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      funnel: [],

      bar: [],
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new View()
      _dv.source(this.bar)
      _dv
        .transform({
          type: 'fold',
          fields: ['level1', 'level2', 'level3', 'level4'],
          key: 'type',
          value: 'value'
        })
        .transform({
          type: 'map',
          callback: row => {
            // row.date = moment(row.date).format('MM-DD')
            row.value = +row.value
            row.type = {
              level1: 'C1',
              level2: 'C2',
              level3: 'C3',
              level4: 'C4'
            }[row.type]
            return row
          }
        })
      return _dv
    }
  },
  methods: {
    initC1() {
      this.c1 = new Chart({
        container: 'home-data-server-bar',
        forceFit: true,
        height: 300,
        padding: [32, 16, 32, 48]
      })
      this.c1.source(this.dv1, {
        date: {
          type: 'cat',
          tickCount: 12
        },
        value: {
          min: 0,
          tickCount: 2,
          formatter: unitFilter
        }
      })
      this.c1.legend({
        position: 'top-right'
      })
      this.c1
        .interval()
        .position('date*value')
        .color('type', ['#3BA0FF', '#36CBCB', '#6BC788', '#6578FF'])
        .adjust({
          type: 'dodge',
          marginRatio: 0
        })

      this.c1.render()
    },
    reloadData() {
      this.getHomeServerData().then(() => {
        this.c1.changeData(this.dv1)
      })
    }
  },
  mounted() {
    this.initData().then(() => {
      this.initC1()
    })
  },
  async: {
    initData() {
      return Promise.all([this.getHomeServerData()])
    },
    getHomeServerData() {
      return getHomeServerData(
        Object.assign(this.search, { select_type: 'month' })
      ).then(res => {
        const _data = []
        _data.push({
          name: 'C4',
          value: get(res, 'funnel.level4', 0)
        })
        _data.push({
          name: 'C2,C3',
          value: get(res, 'funnel.level23', 0)
        })
        _data.push({
          name: 'C1',
          value: get(res, 'funnel.level1', 0)
        })
        this.funnel = _data
        this.bar = res.number
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-data-server {
  .pos-r;
  .funnel {
  }
  .bar {
    .pos-a;
    .mg-l(16px);
    left: 258px;
    right: 0;
    top: 0;
  }
}
</style>
