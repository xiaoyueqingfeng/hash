<template>
  <div class="card" :class="'card--' + color">
    <div class="card__left">
      <span>{{ title }}</span>
      <div class="big">
        <span>{{ isShowIcon ? '¥' : '' }}</span>
        <ICountUp
          :startVal="Number(startVal)"
          :endVal="Number(info.month)"
          :options="
            info.month.toString().indexOf('.') > -1 ? options : options1
          "
          @ready="onReady"
        />
      </div>
    </div>
    <div class="card__right">
      <div class="card__right--column">
        <span class="card__right--column-label">本周</span>
        <span class="card__right--column-val">
          {{ isShowIcon ? moneyFilter(info.week) : info.week }}
        </span>
      </div>
      <div class="card__right--column">
        <span class="card__right--column-label">昨日</span>
        <span class="card__right--column-val">
          {{ isShowIcon ? moneyFilter(info.yesterday) : info.yesterday }}
        </span>
      </div>
    </div>
    <a-tooltip class="tip" placement="topRight">
      <template slot="title">
        <span>
          {{
            type === 'siteList' ? '数据实时统计' : '每日凌晨4:00统计昨日数据'
          }}
        </span>
      </template>
      <span style="color:rgba(0,0,0,0.45)">
        <a-icon type="exclamation-circle" />
      </span>
    </a-tooltip>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2'
import { moneyFilter } from 'oa-core/filters/decimal.filters'
export default {
  name: 'Card',
  data() {
    return {
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
        decimalPlaces: 2
      },
      options1: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      startVal: 0
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    isShowIcon: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: { ICountUp },
  created() {},
  methods: {
    moneyFilter(val) {
      return moneyFilter(val)
    },
    onReady: function(instance, CountUp) {}
  }
}
</script>
<style lang="less" scoped>
@red: #ff6c7e;
@green: #36cbcb;
@purple: #a88adc;
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 32.2%;
  height: 116px;
  padding: 24px 58px 24px 24px;
  font-size: 14px;
  border-radius: 4px;
  background: #fff;
  .big {
    font-size: 24px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
  }
  &--red {
    border-left: 4px solid @red;
    margin-right: 24px;
    .big {
      color: @red;
    }
  }
  &--green {
    border-left: 4px solid @green;
    margin-right: 24px;
    .big {
      color: @green;
    }
  }
  &--purple {
    border-left: 4px solid @purple;
    .big {
      color: @purple;
    }
  }
  &__right {
    .mg-t(8px);
    &--column {
      &-label {
        display: inline-block;
        .mg-r(8px);
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
      }
      &-val {
        font-family: DINAlternate-Bold;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .tip {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 14px;
    height: 14px;
    line-height: 14px;
    font-size: 10px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    // border: 1px solid rgba(0, 0, 0, 0.45);
  }
}
</style>
