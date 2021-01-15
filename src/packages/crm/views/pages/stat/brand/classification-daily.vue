<template>
  <div :class="b()">
    <oa-filter-box
      class="mg-b16"
      :class="b('filter')"
      with-toggle
      :mode.sync="$searchQuery.mode"
    >
      <a-input-search
        slot="prepend"
        enterButton
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        placeholder="搜索客户id、客户姓名、联系人电话"
      ></a-input-search>
      <template slot="actions">
        <oa-button
          @click="tbOnFilterSearch('keywords')"
          type="primary"
          class="mg-r8"
        >
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-r8">重置</oa-button>
        <oa-button
          type="primary"
          @click="handleExport"
          v-if="auth_area['web/serverlevel/brand_level_export']"
        >
          导出
        </oa-button>
      </template>
      <!-- 选择日期时间 -->
      <oa-date-range-filter
        :start.sync="$searchQuery.start_date"
        :end.sync="$searchQuery.end_date"
        :placeholder="['期初时间', '期末时间']"
        :needStatFormate="true"
      ></oa-date-range-filter>
      <!-- 选择城市 -->
      <crm-region-picker
        :province-id.sync="$searchQuery.province_id"
        :city-id.sync="$searchQuery.city_id"
      ></crm-region-picker>
      <!-- 选择部门 -->
      <crm-organ-user-picker
        :organ-id.sync="$searchQuery.organ_id"
        :user-id.sync="$searchQuery.user_id"
        :immediateReq="true"
      ></crm-organ-user-picker>
      <!-- 选择商户分级 -->
      <oa-select
        placeholder="选择商户分级"
        v-model="$searchQuery.leads_level"
        :options="mapping.leads_level"
        allowClear
      ></oa-select>
      <!-- 选择升降级 -->
      <oa-select
        placeholder="选择升降级"
        v-model="$searchQuery.leads_level_change"
        :options="mapping.leads_level_change"
        allowClear
      ></oa-select>
      <!-- 选择运营模式 -->
      <oa-select
        placeholder="选择运营模式"
        v-model="$searchQuery.work_model"
        :options="mapping.work_model"
        allowClear
      ></oa-select>
      <!-- 选择系统开通 -->
      <oa-select
        placeholder="选择系统开通"
        v-model="$searchQuery.is_open"
        :options="mapping.is_open"
        allowClear
      ></oa-select>
      <!-- 全部周期 -->
      <oa-select
        placeholder="全部周期"
        v-model="$searchQuery.is_renew_period"
        :options="mapping.is_renew_period"
        allowClear
      ></oa-select>
      <!-- 选择系统类型 -->
      <oa-select
        placeholder="选择系统类型"
        v-model="$searchQuery.system_type"
        :options="mapping.system_type"
        allowClear
      ></oa-select>
      <!-- 选择系统版本 -->
      <oa-select
        placeholder="选择系统版本"
        v-model="$searchQuery.system_version"
        :options="mapping.system_version"
        allowClear
      ></oa-select>
    </oa-filter-box>
    <div :class="b('content')">
      <oa-table
        :columns="tableColumns"
        rowKey="id"
        :scroll="{
          x: 2400
        }"
        :dataSource="dataSource"
        :pager="pager"
        @change="tbOnTableNoClearSelectChange"
        :loading="getbrandLevelDailyList$loading"
      >
        <template slot="leads_name" slot-scope="text, record">
          <oa-overflow-text maxWidth="10em" :title="record.leads_name">
            {{ record.leads_name }}
          </oa-overflow-text>
        </template>
      </oa-table>
    </div>
  </div>
</template>

<script>
import {
  getbrandLevelDailyMap,
  exportBrandLevel,
  getbrandLevelDailyList
} from '@/api/serverlevel'
import tableColumns from './classification-daily#config'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: 'brand-classification-daily',

  bem: {
    b: 'classification-daily'
  },

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      dataSource: [],
      tableColumns: tableColumns,
      pager: {
        p: 1,
        ps: 20
      },
      mapping: {
        work_model: [],
        is_open: [],
        is_renew_period: [],
        system_type: [],
        system_version: []
      },
      auth_area: {}
    }
  },

  computed: {},

  watch: {
    $route(value) {
      this.getbrandLevelDailyList()
    }
  },

  async: {
    getbrandLevelDailyMap() {
      return getbrandLevelDailyMap().then(res => {
        this.mapping = res
      })
    },
    getbrandLevelDailyList() {
      return getbrandLevelDailyList(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.pager = res.pager
        this.auth_area = res.auth_area
      })
    },
    exportBrandLevel() {
      return exportBrandLevel(this.$searchQuery)
    },
    init() {
      return Promise.all([
        this.getbrandLevelDailyMap(),
        this.getbrandLevelDailyList()
      ])
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    handleExport() {
      this.exportBrandLevel().then(res => {
        this.$message.success('数据导出成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.classification-daily {
  &__filter {
    display: flex;
    justify-content: space-between;
  }
}
</style>
