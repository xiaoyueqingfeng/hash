<template>
  <oa-panel :loading="initData$loading || getLeadsCircle$loading">
    <oa-t3>渠道来源占比</oa-t3>
    <template slot="actions">
      <oa-date-range-filter
        @change="onDateRangeChange"
        :allowClear="false"
        :start.sync="start"
        :end.sync="end"
      ></oa-date-range-filter>
    </template>
    <a-row :gutter="16" class="mg-t32">
      <a-col :span="12">
        <div id="leads-circle-chart"></div>
        <div v-if="!level1Data.length" class="ta-c mg-t40">
          <oa-empty></oa-empty>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="leads-channel-l2">
          <oa-t3>{{ level2Title }}</oa-t3>
          <ul class="leads-channel-l2-list">
            <li
              class="leads-channel-l2-list-item"
              v-for="item in level2Data"
              :key="item.id"
            >
              <i class="marker"></i>
              <span class="text">{{ item.channel_level2_name }}</span>
              <a-divider type="vertical"></a-divider>
              <span class="percent">{{ item.channel_percent }}%</span>
            </li>
          </ul>
          <div id="leads-circle-chart-l2"></div>
        </div>
      </a-col>
    </a-row>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import { getLeadsCircle } from '@/api/stat'
import { get } from 'lodash-es'

export default {
  data() {
    return {
      level1Data: [],
      level1Title: '',
      level1Percent: '',
      level2Title: '',
      level2Data: [],
      hoverIndex: 0,
      start: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      c1: null,
      c2: null
    }
  },
  computed: {
    dv1() {
      const _dv = new DataSet.View()
      _dv.source(this.level1Data)
      _dv.transform({
        type: 'map',
        callback(row) {
          row.channel_total = +row.channel_total
          row.channel_percent = +row.channel_percent
          return row
        }
      })
      return _dv
    },
    dv2() {
      const _dv = new DataSet.View()
      _dv.source(this.level2Data)
      _dv.transform({
        type: 'map',
        callback(row) {
          row.channel_total = +row.channel_total
          row.channel_percent = +row.channel_percent
          return row
        }
      })
      return _dv
    }
  },

  methods: {
    onDateRangeChange() {
      this.getLeadsCircle().then(res => {
        this.c1.changeData(this.dv1)
      })
    },
    initC1() {
      this.c1 = new G2.Chart({
        container: 'leads-circle-chart',
        forceFit: true,
        height: 242,
        padding: [20, 0, 20, 0]
      })
      this.c1.source(this.dv1, {
        channel_level1_name: {
          type: 'cat'
        }
      })

      this.c1.coord('theta', {
        innerRadius: 0.75
      })

      this.c1.tooltip(false).legend({
        useHtml: true,
        itemTpl: (text, color, checked, index) => {
          const row = this.dv1.rows[index]
          const legendEl = new Vue({
            render: h => (
              <crm-circle-legend-item
                from="leads"
                percent={row.channel_percent + '%'}
                index={index}
                color={color}
                checked={checked}
                text={text}
              />
            )
          }).$mount().$el
          return legendEl.outerHTML
        },
        clickable: false
      })

      this.c1.guide().html({
        position: ['50%', '50%'],
        html: () => `<div class='circle-guide'>
        <h3 class='title'>${this.level1Title}</h3>
        <p class='value'>${this.level1Percent}%</p>
      </div>`
      })

      this.c1
        .intervalStack()
        .position('channel_percent')
        .style({
          cursor: 'pointer'
        })
        .color('channel_level1_name', [
          '#3BA0FF',
          '#00E881',
          '#FFD940',
          '#36CBCB',
          '#6578FF'
        ])
        .select(false)
        .active(true, {
          style: {
            fillOpacity: 1,
            lineWidth: 8
          }
        })

      this.c1.on('interval:mouseenter', e => {
        const $s = document.querySelector.bind(document)
        const data = e.data._origin
        $s('.circle-guide').style.opacity = 1
        $s('.circle-guide .title').textContent = data.channel_level1_name
        $s('.circle-guide .value').textContent = data.channel_percent + '%'
        this.level2Title = data.channel_level1_name
        this.level2Data = data.list
        this.updateC2()
      })

      this.c1.render()
    },

    initC2() {
      this.c2 = new G2.Chart({
        container: 'leads-circle-chart-l2',
        width: 58,
        height: 58,
        padding: 0
      })

      this.c2.source(this.dv2)

      this.c2.coord('theta', {
        innerRadius: 0.52
      })
      this.c2.tooltip(false)
      this.c2
        .interval()
        .position('channel_percent')
        // 渐变色
        .color('channel_level2_name', '#3AA0FF-rgb(206,232,255)')
        .select(false)

      this.c2.render()
    },
    updateC2() {
      this.c2.changeData(this.dv2)
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.getLeadsCircle().then(() => {
      this.initC1()
      this.initC2()
    })
  },
  async: {
    initData() {
      return Promise.all([this.getLeadsCircle()])
    },
    getLeadsCircle() {
      return getLeadsCircle({
        date_start: this.start,
        date_end: this.end
      }).then(res => {
        this.level1Data = res.length ? res : []

        if (!res.length && this.c1) {
          this.c1.changeVisible(false)
          this.c2.changeVisible(false)
        }
        if (res.length && this.c1) {
          this.c1.changeVisible(true)
          this.c2.changeVisible(false)
        }

        this.level1Title = get(this.level1Data, '0.channel_level1_name', '')
        this.level1Percent = get(this.level1Data, '0.channel_percent', 0)
        this.level2Title = get(this.level1Data, '0.channel_level1_name', '')
        this.level2Data = get(this.level1Data, '0.list', [])
      })
    }
  }
}
</script>

<style lang="less">
#leads-circle-chart {
  .circle-guide {
    .w(120px);
    overflow: hidden;
    .ta-c;
    transition: opacity 0.2s;
    .title {
      font-weight: normal;
      .c(@primary-color);
      .mg-b(0);
    }
    .value {
      .fz(24px);
      .lh(32px);
      .c(@primary-color);
      .mg-b(0);
    }
  }
  .circle-legend-item {
    display: block !important;
    .percent {
      .c(@text-light);
    }
  }
}

.leads-channel-l2 {
  .bg(fade(#3aa0ff, 6));
  .pd(24px);
  min-height: 500px;
  .oa-title {
    .c(@primary-color);
  }
  &-list {
    .mg-t(24px);
  }
  &-list-item {
    .mg-b(16px);
    .marker {
      .s(6px, 6px);
      border-radius: 50%;
      display: inline-block;
      .bg(@primary-color);
      .mg-r(8px);
    }
    .percent {
      .c(@text-light);
    }
  }
}
</style>
