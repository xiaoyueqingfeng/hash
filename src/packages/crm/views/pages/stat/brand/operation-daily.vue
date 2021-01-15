<template>
  <div :class="b()">
    <div class="mg-b16" :class="b('filter')">
      <oa-filter-box
        :class="b('filter-left')"
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
          <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
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
        ></crm-organ-user-picker>
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
      <div :class="b('filter-right')">
        <a-radio-group @change="onChange" defaultValue="brand">
          <a-radio-button value="brand">
            品牌维度统计
          </a-radio-button>
          <a-radio-button value="date">
            日期维度统计
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div :class="b('content')">
      <oa-table
        :columns="tableColumns"
        rowKey="id"
        :scroll="{
          x: 4000
        }"
        :dataSource="dataSource"
        :pager="pager"
        :loading="
          $searchQuery.dimensionality === 'brand'
            ? brandOperateListBrand$loading
            : brandOperateListDate$loading
        "
        @change="tbOnTableNoClearSelectChange"
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
  brandOperateListDate,
  brandOperateListBrand,
  brandOperateListDateSelect,
  brandOperateListBrandSelect
} from '@/api/serverlevel'
import { brandColumns, dateColumns } from './operation-daily#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  name: 'brand-operation-daily',

  bem: {
    b: 'operation-daily'
  },

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      dataSource: [],
      tableColumns: brandColumns,
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
      }
    }
  },

  computed: {},

  watch: {
    $route(newRoute) {
      let dimensionality = newRoute.meta.query.dimensionality
      if (dimensionality === 'brand') {
        this.initBrand()
      } else {
        this.initDate()
      }
    }
  },

  async: {
    brandOperateListDate() {
      return brandOperateListDate(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.pager = res.pager
      })
    },
    brandOperateListBrand() {
      return brandOperateListBrand(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.pager = res.pager
      })
    },
    brandOperateListDateSelect() {
      return brandOperateListDateSelect().then(res => {
        this.mapping = res
      })
    },
    brandOperateListBrandSelect() {
      return brandOperateListBrandSelect().then(res => {
        this.mapping = res
      })
    },
    initBrand() {
      return Promise.all([
        this.brandOperateListBrandSelect(),
        this.brandOperateListBrand()
      ])
    },
    initDate() {
      return Promise.all([
        this.brandOperateListDateSelect(),
        this.brandOperateListDate()
      ])
    }
  },

  mounted() {
    this.initBrand()
  },

  methods: {
    onChange(e) {
      let dimensionality = e.target.value
      if (e.target.value === 'date') {
        this.tableColumns = dateColumns
      } else {
        this.tableColumns = brandColumns
      }
      this.$router.push({
        query: {
          dimensionality: dimensionality
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.operation-daily {
  &__filter {
    display: flex;
    justify-content: space-between;
  }
  &__filter-right {
    min-width: 235px;
    margin-left: 24px;
  }
}
</style>
