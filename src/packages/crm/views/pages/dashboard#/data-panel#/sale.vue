<template>
  <div class="home-data-sale">
    <a-spin :spinning="getHomeSaleData$loading">
      <div class="funnel">
        <crm-funnel-chart
          :width="258"
          :height="300"
          :sourceData="funnel"
        ></crm-funnel-chart>
      </div>
      <div class="bar">
        <div id="home-data-sale-bar"></div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { View } from '@antv/data-set'
import { Chart } from '@antv/g2'
import { getHomeSaleData } from '@/api/stat'
import { get } from 'lodash-es'
import { toKFilter, moneyFilter } from 'oa-core/filters/decimal.filters'
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

      achievement: [],
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new View()
      _dv.source(this.achievement)
      _dv
        .transform({
          type: 'fold',
          fields: ['soft_achievement', 'hard_achievement'],
          key: 'type',
          value: 'value'
        })
        .transform({
          type: 'map',
          callback: row => {
            row.value = +row.value
            row.type = {
              hard_achievement: '硬件',
              soft_achievement: '软件'
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
        container: 'home-data-sale-bar',
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
          min: 0
        }
      })
      this.c1
        .legend({
          position: 'top-right'
        })
        .axis('value', {
          label: {
            formatter: toKFilter
          }
        })

      this.c1
        .interval()
        .position('date*value')
        .color('type', ['#3BA0FF', '#36CBCB'])
        .tooltip('type*value', (type, value) => {
          return {
            name: type,
            value: moneyFilter(value)
          }
        })
        .adjust({
          type: 'dodge',
          marginRatio: 0
        })

      this.c1.render()
    },
    reloadData() {
      this.getHomeSaleData().then(() => {
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
      return Promise.all([this.getHomeSaleData()])
    },
    getHomeSaleData() {
      return getHomeSaleData(
        Object.assign(this.search, { select_type: 'month' })
      ).then(res => {
        const _data = []
        _data.push({
          name: 'leads客户',
          value: get(res, 'funnel.leads_count', 0)
        })
        _data.push({
          name: '潜在客户',
          value: get(res, 'funnel.potential_count', 0)
        })
        _data.push({
          name: '签约客户',
          value: get(res, 'funnel.brand_count', 0)
        })
        this.funnel = _data
        this.achievement = res.achievement
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-data-sale {
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
