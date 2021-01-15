<template>
  <oa-panel :loading="getOrganKinked$loading">
    <oa-t3>业绩曲线</oa-t3>
    <template slot="actions">
      <oa-date-range-filter
        @change="onSearchChange"
        :allowClear="false"
        :start.sync="search.date_start"
        :end.sync="search.date_end"
      ></oa-date-range-filter>
    </template>
    <div class="mg-t16">
      <oa-cascader
        @change="onSearchChange"
        change-on-select
        placeholder="选择团队"
        v-model="search.organ_id"
        :options="organOptions"
      ></oa-cascader>
      <a-radio-group class="fl-r" v-model="cat">
        <a-radio-button value="c1">增长</a-radio-button>
        <a-radio-button value="c2">变化</a-radio-button>
      </a-radio-group>
    </div>
    <div class="mg-t24">
      <div id="sale-organ-kinked-grow"></div>
      <div id="sale-organ-kinked-change"></div>
    </div>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import { getOrganList } from '@/api/user'
import { getOrganKinked } from '@/api/stat'
import { get } from 'lodash-es'
import DataSet from '@antv/data-set'
import G2 from '@antv/g2'
import { toKFilter, moneyFilter } from 'oa-core/filters/decimal.filters'

const COLORS = ['#3BA0FF', '#36CBCB']
export default {
  data() {
    return {
      search: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        organ_id: undefined
      },
      organOptions: [],
      // 增长源数据
      growData: [],
      // 变化源数据
      changeData: [],

      cat: 'c1',

      c1: null,
      c2: null
    }
  },
  computed: {
    dv1() {
      const _dv = new DataSet.View()
      _dv.source(this.growData)
      _dv
        .transform({
          type: 'fold',
          // 展开数据使用的字段
          fields: ['soft_number', 'hard_number'],
          key: 'type',
          value: 'value'
        })
        .transform({
          type: 'map',
          callback: row => {
            row.value = +row.value
            row.type = {
              hard_number: '硬件',
              soft_number: '软件'
            }[row.type]
            return row
          }
        })
      // console.log(_dv)
      return _dv
    },
    dv2() {
      const _dv = new DataSet.View()
      _dv.source(this.changeData)
      _dv
        .transform({
          type: 'fold',
          // 展开数据使用的字段
          fields: ['soft_number', 'hard_number'],
          key: 'type',
          value: 'value'
        })
        .transform({
          type: 'map',
          callback: row => {
            row.value = +row.value
            // 加入中文名称
            row.type = {
              hard_number: '硬件',
              soft_number: '软件'
            }[row.type]
            return row
          }
        })
      return _dv
    }
  },
  methods: {
    onSearchChange() {
      this.getOrganKinked().then(() => {
        this.c1.changeData(this.dv1)
        this.c2.changeData(this.dv2)
      })
    },
    initC1() {
      this.c1 = new G2.Chart({
        container: 'sale-organ-kinked-grow',
        forceFit: true,
        height: 300
      })
      this.c1.source(this.dv1, {
        date: {
          type: 'cat',
          tickCount: 12
        },
        value: {
          tickCount: 4,
          formatter: toKFilter
        }
      })
      this.c1.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.c1
        .areaStack()
        .position('date*value')
        .shape('smooth')
        .color('type', COLORS)
        .tooltip('type*value', (type, value) => {
          return {
            name: type,
            value: moneyFilter(value)
          }
        })
        .opacity(0.2)
      this.c1
        .lineStack()
        .position('date*value')
        .shape('smooth')
        .color('type', COLORS)
        .tooltip(false)
      this.c1.render()
    },
    initC2() {
      this.c2 = new G2.Chart({
        container: 'sale-organ-kinked-change',
        forceFit: true,
        height: 300
      })
      this.c2.source(this.dv2, {
        date: {
          type: 'cat',
          tickCount: 12
        },
        value: {
          tickCount: 4,
          formatter: toKFilter
        }
      })
      this.c2.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.c2
        .areaStack()
        .position('date*value')
        .shape('smooth')
        .tooltip('type*value', (type, value) => {
          return {
            name: type,
            value: moneyFilter(value)
          }
        })
        .color('type', ['#3BA0FF', '#36CBCB'])
        .opacity(0.2)

      this.c2
        .lineStack()
        .position('date*value')
        .shape('smooth')
        .color('type', ['#3BA0FF', '#36CBCB'])
        .tooltip(false)
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
  mounted() {
    this.initData().then(() => {
      this.initC1()
      this.initC2()
      this.makeChartVisible()
    })
  },
  watch: {
    cat(newVal) {
      this.$nextTick().then(() => {
        this.makeChartVisible()
      })
    }
  },
  async: {
    initData() {
      return Promise.all([this.getOrganList(), this.getOrganKinked()])
    },
    getOrganKinked() {
      return getOrganKinked({ ...this.search }).then(res => {
        this.growData = res.grow || []
        this.changeData = res.change || []
      })
    },
    getOrganList() {
      return getOrganList().then(res => {
        this.organOptions = get(res, '0.children', [])
      })
    }
  }
}
</script>
