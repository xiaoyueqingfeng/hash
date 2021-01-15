<template>
  <oa-panel :loading="getServerLostBar$loading">
    <oa-t3>流失客户占比</oa-t3>
    <template slot="actions">
      <oa-date-range-filter
        @change="onReloadData"
        :start.sync="search.date_start"
        :end.sync="search.date_end"
        :allow-clear="false"
      ></oa-date-range-filter>
    </template>
    <div class="ta-r mg-t24">
      <a-radio-group @change="onReloadData" v-model="search.select_type">
        <a-radio-button value="week">按周</a-radio-button>
        <a-radio-button value="month">按月</a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <div id="stat-server-lost-bar"></div>
    </div>
  </oa-panel>
</template>

<script>
import { getServerLostBar } from '@/api/stat'
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
import moment from 'moment'
export default {
  data() {
    return {
      search: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        select_type: 'week'
      },
      c1Source: [],
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new View()
      _dv.source(this.c1Source)
      _dv
        .transform({
          type: 'fold',
          fields: ['level0', 'level1', 'level2', 'level3', 'level4'],
          key: 'type'
        })
        .transform({
          type: 'map',
          callback(row) {
            row.type = {
              level0: 'C0',
              level1: 'C1',
              level2: 'C2',
              level3: 'C3',
              level4: 'C4'
            }[row.type]
            row.value = +row.value
            return row
          }
        })
      return _dv
    }
  },
  methods: {
    onReloadData() {
      this.getServerLostBar().then(() => {
        this.c1.changeData(this.dv1)
      })
    },
    initC1() {
      this.c1 = new Chart({
        container: 'stat-server-lost-bar',
        forceFit: true,
        height: 240,
        padding: [32, 16, 32, 48]
      })

      this.c1.source(this.dv1, {
        date: {
          type: 'cat',
          tickCount: 6
        },
        value: {
          tickCount: 2,
          formatter(v) {
            return v + '个'
          }
        }
      })
      this.c1.legend({
        position: 'top-right'
      })
      this.c1
        .intervalStack()
        .position('date*value')
        .color('type', '#B3DAFF-#1A87EE')
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
      return Promise.all([this.getServerLostBar()])
    },
    getServerLostBar() {
      return getServerLostBar({ ...this.search }).then(res => {
        this.c1Source = res.list
      })
    }
  }
}
</script>
