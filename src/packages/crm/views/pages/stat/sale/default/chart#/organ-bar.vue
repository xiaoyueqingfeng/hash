<template>
  <oa-panel :loading="getOrganBar$loading">
    <oa-t3>团队业绩统计</oa-t3>
    <template slot="actions">
      <oa-date-range-filter
        @change="onSearchChange"
        :allowClear="false"
        :start.sync="search.date_start"
        :end.sync="search.date_end"
      ></oa-date-range-filter>
    </template>
    <div>
      <div class="ta-r mg-t24">
        <a-radio-group v-model="cat">
          <a-radio-button value="c1">业绩</a-radio-button>
          <a-radio-button value="c2">签单</a-radio-button>
        </a-radio-group>
      </div>
      <div id="sale-organ-bar-achievement"></div>
      <div id="sale-organ-bar-count"></div>
    </div>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import { getOrganBar } from '@/api/stat'
import {
  toKFilter,
  unitFilter,
  moneyFilter
} from 'oa-core/filters/decimal.filters'
const COLORS = ['#3BA0FF', '#36CBCB']

export default {
  data() {
    return {
      search: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD')
      },
      c1: null,
      c2: null,
      achievementData: [],
      countData: [],
      cat: 'c1'
    }
  },
  computed: {
    dv1() {
      const dv = new DataSet.View()
      dv.source(this.achievementData)
      dv.transform({
        type: 'fold',
        // 展开数据使用的字段
        fields: ['soft_number', 'hard_number'],
        key: 'type',
        value: 'value'
      }).transform({
        type: 'map',
        // name | type | value
        callback: row => {
          row.name = row.organ_name
          row.value = +row.value
          // 变为中文名称
          row.type = {
            hard_number: '硬件',
            soft_number: '软件'
          }[row.type]
          return row
        }
      })
      return dv
    },
    dv2() {
      const dv = new DataSet.View()
      dv.source(this.countData)
      dv.transform({
        type: 'fold',
        // 展开数据使用的字段
        fields: ['soft_number', 'hard_number'],
        key: 'type',
        value: 'value'
      }).transform({
        type: 'map',
        callback: row => {
          row.name = row.organ_name
          row.value = +row.value
          // 加入中文名称
          row.type = {
            hard_number: '硬件',
            soft_number: '软件'
          }[row.type]
          return row
        }
      })
      return dv
    }
  },
  methods: {
    onSearchChange() {
      this.getOrganBar().then(() => {
        this.c1.changeData(this.dv1)
        this.c2.changeData(this.dv2)
      })
    },
    initC1() {
      this.c1 = new G2.Chart({
        container: 'sale-organ-bar-achievement',
        forceFit: true,
        height: 300
      })
      this.c1.source(this.dv1, {
        value: {
          formatter: toKFilter
        }
      })
      this.c1.tooltip(true)
      this.c1
        .interval()
        .position('name*value')
        .color('type', COLORS)
        .tooltip('type*value', (type, value) => {
          return {
            name: type,
            value: moneyFilter(value)
          }
        })
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0
          }
        ])
      this.c1.render()
    },
    initC2() {
      this.c2 = new G2.Chart({
        container: 'sale-organ-bar-count',
        forceFit: true,
        height: 300
      })
      this.c2.source(this.dv2, {
        value: {
          tickCount: 2,
          formatter: v => unitFilter(v, '单')
        }
      })
      this.c2
        .interval()
        .position('name*value')
        .color('type', COLORS)
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0
          }
        ])
      this.c2.render()
    },
    makeChartVisible() {
      if (this.cat === 'c1') {
        this.c1.changeVisible(true)
        this.c2.changeVisible(false)
      }
      if (this.cat === 'c2') {
        this.c1.changeVisible(false)
        this.c2.changeVisible(true)
      }
    }
  },
  watch: {
    cat(newVal) {
      this.$nextTick().then(() => {
        this.makeChartVisible()
      })
    }
  },
  mounted() {
    this.initData().then(() => {
      this.initC1()
      this.initC2()
      this.makeChartVisible()
    })
  },
  async: {
    initData() {
      return Promise.all([this.getOrganBar()])
    },
    getOrganBar() {
      return getOrganBar({ ...this.search }).then(res => {
        this.achievementData = res.achievement || []
        this.countData = res.count || []
      })
    }
  }
}
</script>
