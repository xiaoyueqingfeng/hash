<template>
  <oa-panel
    tabs
    :loading="
      getSaleOrganCompare$loading ||
        getSaleCompare$loading ||
        getServeCompare$loading
    "
    class="pk-panel"
  >
    <div slot="actions">
      <!-- 时间范围选择 通用 -->
      <oa-date-range-filter
        class="pk-panel__rangepicker"
        @change="onPickerChange"
        :start.sync="date_start"
        :end.sync="date_end"
        :allowClear="false"
      ></oa-date-range-filter>
      <!-- 团队 -->
      <oa-cascader
        v-if="activeTab === 'organ'"
        :allowClear="false"
        v-model="organCat"
        class="pk-panel__cascader"
        :options="options.organ"
      ></oa-cascader>
      <!-- 个人 -->
      <oa-cascader
        v-if="activeTab === 'sale'"
        :allowClear="false"
        v-model="saleCat"
        class="pk-panel__cascader"
        :options="options.sale"
      ></oa-cascader>
      <!-- 商服 -->
      <oa-cascader
        v-if="activeTab === 'serve'"
        :allowClear="false"
        v-model="serveCat"
        class="pk-panel__cascader"
        :options="options.serve"
      ></oa-cascader>
    </div>
    <a-tabs v-model="activeTab" @change="onChangeTab">
      <a-tab-pane
        v-if="homeAuth.sale_organ_compare"
        tab="销售团队PK榜"
        key="organ"
      >
        <!-- 团队 总业绩 -->
        <pk-list
          tab="organ"
          v-if="organCat === 'total_achievement'"
          :loading="getSaleOrganCompare$loading"
          type="total_achievement"
          :list="organData.total_achievement"
        ></pk-list>
        <!-- 团队 硬件业绩 -->
        <pk-list
          tab="organ"
          v-if="organCat === 'hard_achievement'"
          :loading="getSaleOrganCompare$loading"
          type="hard_achievement"
          :list="organData.hard_achievement"
        ></pk-list>
        <!--  团队 软件业绩 -->
        <pk-list
          tab="organ"
          v-if="organCat === 'soft_achievement'"
          :loading="getSaleOrganCompare$loading"
          type="soft_achievement"
          :list="organData.soft_achievement"
        ></pk-list>
        <!--  团队 拜访次数 -->
        <pk-list
          tab="organ"
          v-if="organCat === 'visit_number'"
          :loading="getSaleOrganCompare$loading"
          type="visit_number"
          :list="organData.visit_number"
        ></pk-list>
      </a-tab-pane>
      <a-tab-pane v-if="homeAuth.sale_compare" tab="销售员工PK榜" key="sale">
        <!-- 员工 总业绩 -->
        <pk-list
          tab="sale"
          v-if="saleCat === 'total_achievement'"
          :loading="getSaleCompare$loading"
          type="total_achievement"
          :list="saleData.total_achievement"
        ></pk-list>
        <!-- 员工 总业绩 -->
        <pk-list
          tab="sale"
          v-if="saleCat === 'hard_achievement'"
          :loading="getSaleCompare$loading"
          type="hard_achievement"
          :list="saleData.hard_achievement"
        ></pk-list>
        <!-- 员工 硬件业绩 -->
        <pk-list
          tab="sale"
          v-if="saleCat === 'soft_achievement'"
          :loading="getSaleCompare$loading"
          type="soft_achievement"
          :list="saleData.soft_achievement"
        ></pk-list>
        <!-- 员工 拜访次数 -->
        <pk-list
          tab="sale"
          v-if="saleCat === 'visit_number'"
          :loading="getSaleCompare$loading"
          type="visit_number"
          :list="saleData.visit_number"
        ></pk-list>
      </a-tab-pane>
      <a-tab-pane v-if="homeAuth.server_compare" tab="商服PK榜" key="serve">
        <!-- 商服 续签  -->
        <pk-list
          tab="serve"
          v-if="serveCat === 'repay_achievement'"
          :loading="getServeCompare$loading"
          type="repay_achievement"
          :list="serveData.repay_achievement"
        ></pk-list>
        <!-- 商服 服务次数  -->
        <pk-list
          tab="serve"
          v-if="serveCat === 'service_number'"
          :loading="getServeCompare$loading"
          type="service_number"
          :list="serveData.service_number"
        ></pk-list>
      </a-tab-pane>
    </a-tabs>
  </oa-panel>
</template>

<script>
import PkList from './pk-panel#/pk-list.vue'
import { get } from 'lodash-es'
import moment from 'moment'
import { cascaderOptions } from './pk-panel#config'
import {
  getSaleOrganCompare,
  getSaleCompare,
  getServeCompare
} from '@/api/stat'
export default {
  props: {
    homeAuth: {
      type: Object,
      required: true
    }
  },
  components: {
    PkList
  },
  data() {
    return {
      activeTab: '',
      date_start: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      date_end: moment().format('YYYY-MM-DD'),
      organData: {
        total_achievement: [],
        soft_achievement: [],
        hard_achievement: [],
        visit_number: []
      },
      saleData: {
        total_achievement: [],
        soft_achievement: [],
        hard_achievement: [],
        visit_number: []
      },
      serveData: {
        repay_achievement: [],
        service_number: []
      },
      organCat: 'total_achievement',
      saleCat: 'total_achievement',
      serveCat: 'repay_achievement',
      options: cascaderOptions
    }
  },
  computed: {
    reqMap() {
      return {
        organ: () => {
          this.getSaleOrganCompare()
        },
        sale: () => {
          this.getSaleCompare()
        },
        serve: () => {
          this.getServeCompare()
        }
      }
    }
  },
  methods: {
    onChangeTab(tab) {
      this.reqMap[tab]()
    },
    onPickerChange() {
      this.reqMap[this.activeTab]()
    }
  },
  created() {
    if (this.homeAuth.sale_organ_compare) {
      this.activeTab = 'organ'
      this.getSaleOrganCompare()
      return
    }
    if (this.homeAuth.sale_compare) {
      this.activeTab = 'sale'
      this.getSaleCompare()
      return
    }
    if (this.homeAuth.server_compare) {
      this.activeTab = 'serve'
      this.getServeCompare()
    }
  },
  async: {
    getSaleOrganCompare() {
      return getSaleOrganCompare({
        date_start: this.date_start,
        date_end: this.date_end
      }).then(res => {
        const total_achievement = get(res, 'achievement.total_achievement', [])
        const soft_achievement = get(res, 'achievement.soft_achievement', [])
        const hard_achievement = get(res, 'achievement.hard_achievement', [])
        const visit_number = get(res, 'visit_number', [])
        this.organData = {
          total_achievement,
          soft_achievement,
          hard_achievement,
          visit_number
        }
      })
    },
    getSaleCompare() {
      return getSaleCompare({
        date_start: this.date_start,
        date_end: this.date_end
      }).then(res => {
        const total_achievement = get(res, 'achievement.total_achievement', [])
        const soft_achievement = get(res, 'achievement.soft_achievement', [])
        const hard_achievement = get(res, 'achievement.hard_achievement', [])
        const visit_number = get(res, 'visit_number', [])
        this.saleData = {
          total_achievement,
          soft_achievement,
          hard_achievement,
          visit_number
        }
      })
    },
    getServeCompare() {
      return getServeCompare({
        date_start: this.date_start,
        date_end: this.date_end
      }).then(res => {
        const repay_achievement = get(res, 'repay_achievement', [])
        const service_number = get(res, 'service_number', [])
        this.serveData = {
          repay_achievement,
          service_number
        }
      })
    }
  }
}
</script>

<style lang="less">
.pk-panel {
  .mg-t(16px);
  min-height: 300px;
  &__rangepicker {
    .w(224px);
  }
  &__cascader {
    .mg-l(8px);
    .w(146px);
  }
}
</style>
