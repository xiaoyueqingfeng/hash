<template>
  <oa-panel class="report-panel" :loading="getReportData$loading">
    <oa-t4>本月战报数据</oa-t4>
    <a-row class="report-list" :gutter="8">
      <a-col :span="4" v-for="item in list" :key="item.name">
        <div
          class="report-item"
          :class="{
            'report-item--blue': isPrice(item),
            'report-item--red': isNumber(item),
            'report-item--green': isPercent(item)
          }"
        >
          <h4 class="report-item__title">{{ item.name }}</h4>
          <div class="report-item__data">
            <!-- 价格 -->
            <span v-if="isPrice(item)" class="report-item__count font-number">
              ¥{{ item.value }}
            </span>

            <!-- 个数 -->
            <span v-if="isNumber(item)" class="report-item__count font-number">
              {{ item.value }}
            </span>
            <span v-if="isNumber(item)" class="report-item__unit">
              {{ item.type }}
            </span>

            <!-- 百分比 -->
            <span v-if="isPercent(item)" class="report-item__count font-number">
              {{ item.value }}%
            </span>
          </div>
        </div>
      </a-col>
    </a-row>
  </oa-panel>
</template>

<script>
import { getReportData } from '@/api/stat'
export default {
  props: {
    homeAuth: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    isPrice(item) {
      return item.type === '元'
    },
    isPercent(item) {
      return item.type === '%'
    },
    isNumber(item) {
      return item.type === '个' || item.type === '次'
    }
  },
  async: {
    initData() {
      return Promise.all([this.getReportData()])
    },
    getReportData() {
      return getReportData().then(res => {
        this.list = res.list
      })
    }
  }
}
</script>

<style lang="less" scoped>
.report {
  &-panel {
    min-height: 260px;
  }
  &-list {
    .mg-t(24px);
  }
  &-item {
    .pd(12px);
    .mg-b(8px);
    .h(86px);
    &--blue {
      .bg(rgba(@primary-color, 0.08));
      .report-item__data {
        .c(@primary-color);
      }
    }
    &--green {
      .bg(rgba(#36cbcb, 0.08));
      .report-item__data {
        .c(#36cbcb);
      }
    }
    &--red {
      .bg(rgba(#ff6c7e, 0.08));
      .report-item__data {
        .c(#ff6c7e);
      }
    }
    &__title {
      .c(@text);
      .lh(22px);
      font-weight: normal;
      white-space: nowrap;
      .mg-b(0);
    }
    &__data {
      .mg-t(12px);
      .mg-b(0);
    }
    &__count {
      .fz(18px);
      .lh(24px);
    }
    &__unit {
      vertical-align: text-bottom;
      .fz(12px);
      .mg-l(6px);
    }
  }
}
</style>
