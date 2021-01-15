<template>
  <oa-panel :loading="getServerLevelRing$loading">
    <oa-t3>分级客户占比</oa-t3>
    <template slot="actions">
      <oa-date-picker
        :disabledDate="disabledDate"
        @change="onReloadData"
        v-model="search.date"
      ></oa-date-picker>
    </template>
    <div id="stat-server-chart-level-bar"></div>
    <div v-show="!total" class="ta-c mg-t40">
      <oa-empty></oa-empty>
    </div>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'
import { getServerLevelRing } from '@/api/stat'
import { get } from 'lodash-es'
import { percentFilter } from 'oa-core/filters/decimal.filters'

export default {
  data() {
    return {
      search: {
        date: moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      },
      c1Source: [],
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new DataSet.View()
      _dv.source(this.c1Source)
      _dv
        .transform({
          type: 'map',
          callback(row) {
            row.value = +row.value
            return row
          }
        })
        .transform({
          type: 'percent',
          field: 'value',
          dimension: 'name',
          as: 'percent'
        })

      return _dv
    },
    total() {
      return this.dv1.sum('value')
    }
  },
  methods: {
    disabledDate(current) {
      return current && current > moment().subtract(1, 'days')
    },
    onReloadData() {
      this.getServerLevelRing().then(() => {
        if (this.c1) {
          if (this.total) {
            this.c1.changeVisible(true)
            this.c1.changeData(this.dv1)
          } else {
            this.c1.changeVisible(false)
          }
        } else {
          if (this.total) {
            this.initC1()
          }
        }
      })
    },
    initC1() {
      this.c1 = new Chart({
        container: 'stat-server-chart-level-bar',
        forceFit: true,
        padding: [60, 180, 60, 0],
        height: 300,
        renderer: 'svg'
      })
      this.c1.source(this.dv1)
      this.c1.coord('theta', {
        innerRadius: 0.7
      })
      this.c1.tooltip(false).legend({
        position: 'right-center',
        itemWidth: 160,
        useHtml: true,
        clickable: false,
        itemTpl: (text, color, checked, index) => {
          const row = this.dv1.rows[index]
          const legendEl = new Vue({
            render: h => (
              <crm-circle-legend-item
                from="server"
                percent={percentFilter(row.percent, 0)}
                value={row.value + '个'}
                index={index}
                color={color}
                checked={checked}
                text={text}
              />
            )
          }).$mount().$el

          return legendEl.outerHTML
        }
      })
      this.c1.guide().html({
        position: ['50%', '50%'],
        html: () => {
          const maxRow = this.dv1.findRow({
            value: this.dv1.max('value')
          })
          console.log(this.dv1)
          return `<div class='crm-ring-guide'><h3 class='crm-ring-guide__name'>${
            maxRow.name
          }</h3><p class='crm-ring-guide__value'>${percentFilter(
            maxRow.percent,
            0
          )}
          </p></div>`
        }
      })
      this.c1
        .intervalStack()
        .position('value')
        .style({
          // 不需要fillOpacity
          fillOpacity: 1,
          cursor: 'pointer'
        })
        .color('name', ['#e3e3e3', '#3BA0FF', '#00E881', '#36CBCB', '#6578FF'])
        .select(false)
        .active({
          style: {
            fillOpacity: 1,
            lineWidth: 8
          }
        })
      this.c1.on('interval:mouseenter', e => {
        const $s = document.querySelector.bind(document)
        const data = e.data._origin
        $s('.crm-ring-guide__name').textContent = data.name
        $s('.crm-ring-guide__value').textContent = percentFilter(data.percent)
      })

      this.c1.render()
    }
  },
  mounted() {
    this.initData().then(() => {
      if (this.total) {
        this.initC1()
      }
    })
  },
  async: {
    initData() {
      return Promise.all([this.getServerLevelRing()])
    },
    getServerLevelRing() {
      return getServerLevelRing({
        ...this.search
      }).then(res => {
        const _c1Source = []
        _c1Source.push({
          name: 'C0',
          value: get(res, 'level.level0.num', 0)
        })
        _c1Source.push({
          name: 'C1',
          value: get(res, 'level.level1.num', 0)
        })
        _c1Source.push({
          name: 'C2',
          value: get(res, 'level.level2.num', 0)
        })
        _c1Source.push({
          name: 'C3',
          value: get(res, 'level.level3.num', 0)
        })
        _c1Source.push({
          name: 'C4',
          value: get(res, 'level.level4.num', 0)
        })
        this.c1Source = _c1Source
      })
    }
  }
}
</script>

<style lang="less">
.crm-ring-guide {
  .ta-c;
  .w(150px);
  user-select: none;
  &__name {
    .c(@primary-color);
    .fz(14px);
    .lh(22px);
    .mg-b(0);
  }
  &__value {
    .c(@primary-color);
    .fz(24px);
    .lh(32px);
    .mg-b(0);
  }
}
</style>
