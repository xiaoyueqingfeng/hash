<template>
  <div
    class="crm-funnel-chart"
    :class="{ 'crm-funnel-chart--small': height < 350 }"
  ></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'

export default {
  props: {
    // [{name:'leads客户',value:12},{name:'潜在客户',value:13},{name:'签约客户',value:16}]
    sourceData: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      c1: null
    }
  },
  computed: {
    dv1() {
      const _dv = new View()
      const _source = this.sourceData.concat([{ name: '', value: 0 }])
      _dv.source(_source)

      const len = _source.length
      const first = _source[0]

      _dv.transform({
        type: 'map',
        callback(row, idx) {
          row.value = +row.value
          // 显示用值
          row.idx = idx
          const max = _dv.max('value') || 50
          // 展示value修正
          row.showValue = {
            0: max + max * 1 + row.value,
            1: max + max * 0.95 + row.value,
            2: max + max * 0.65 + row.value,
            3: max * 0.8 + max * 0.4
          }[idx]
          row.percent = first.value ? row.value / first.value : 0
          // 名称的对应高度位置
          row.nameTop = ((100 / len / 2) * (2 * idx + 1)).toFixed(2) + '%'
          // 百分比的对应高度位置
          row.percentTop = ((100 / len) * (idx + 1)).toFixed(2) + '%'
          return row
        }
      })
      // console.log(_dv)
      return _dv
    }
  },
  methods: {
    initC1() {
      this.c1 = new Chart({
        container: this.$el,
        width: this.width,
        height: this.height,
        padding: [0, 0, -this.height / this.sourceData.length, 0]
      })
      this.c1.source(this.dv1, {
        showValue: {
          // 使y轴的数据正好铺满
          tickInterval: 1
        }
      })
      this.c1
        .coord('rect')
        .transpose()
        .scale(1, -1)

      this.c1
        .axis(false)
        .legend(false)
        .tooltip(false)
      this.c1
        .intervalSymmetric()
        .position('name*showValue')
        .shape('funnel')
        .color('name', [
          'l(270) 0:#3F66F6 1:rgb(40,148,204)',
          'l(270) 0:rgb(40,148,204) 1:rgb(19,192,165)',
          'l(270) 0:rgb(19,192,165) 1:#00E881'
        ])
        .active(false)
      this.dv1.rows.forEach((row, idx) => {
        this.c1.guide('value').html({
          position: ['50%', row.nameTop],
          html: () => {
            if (idx !== 3) {
              return `<div class='crm-funnel-chart__guide-name'><p class='title'>${
                this.dv1.rows[idx].name
              }</p><p class='value font-number'>${
                this.dv1.rows[idx].value
              }</p></div>`
            }
            return '<div></div>'
          }
        })
        if (idx < this.sourceData.length - 1) {
          this.c1.guide('percent').html({
            position: ['50%', row.percentTop],
            html: () =>
              `<div class='crm-funnel-chart__guide-percent font-number'>${(
                this.dv1.rows[idx + 1].percent * 100
              ).toFixed(0)}%</div>`
          })
        }
      })
      this.c1.render()
    }
  },
  watch: {
    sourceData() {
      this.$nextTick().then(() => {
        if (!this.c1) {
          this.initC1()
        } else {
          this.c1.changeData(this.dv1)
        }
      })
    }
  },
  mounted() {
    if (this.sourceData.length) {
      this.initC1()
    }
  }
}
</script>

<style lang="less">
.crm-funnel-chart {
  display: inline-block;
  vertical-align: top;
  user-select: none;
  &--small {
    .crm-funnel-chart__guide-percent {
      .s(32px, 32px);
      .fz(12px);
      .lh(20px);
      &::before,
      &::after {
        .w(100px);
      }
      &::before {
        right: 36px;
      }
      &::after {
        left: 36px;
      }
    }
    .crm-funnel-chart__guide-name {
      .title {
        display: inline-block;
        .fz(12px);
        .lh(20px);
      }
      .value {
        display: inline-block;
        .mg-t(0);
        .mg-l(8px);
        .fz(14px);
        .lh(22px);
      }
    }
  }
  &__guide-name {
    .w(200px);
    .c(white);
    .ta-c;
    .title {
      .fz(14px);
      .mg-b(0);
      .lh(22px);
    }
    .value {
      .fz(20px);
      .mg-t(6px);
      .mg-b(0);
      .lh(24px);
    }
  }
  &__guide-percent {
    .pos-r;
    .fz(14px);
    .lh(24px);
    .s(44px, 44px);
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    .bg(white);
    font-weight: bold;
    background-clip: content-box;
    .c(#3e4d5c);
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.2);
    &::before,
    &::after {
      content: '';
      .pos-a;
      top: 50%;
      border-top: 1px solid white;
      .w(191px);
    }
    &::before {
      right: 48px;
    }
    &::after {
      left: 48px;
    }
  }
}
</style>
