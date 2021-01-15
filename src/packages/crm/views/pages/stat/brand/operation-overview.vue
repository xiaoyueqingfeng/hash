<template>
  <div :class="b()">
    <!-- <div class="mg-b16" :class="b('stat')">
      <div class="stat">
        <div class="stat__title">
          品牌活跃统计
        </div>
        <div class="stat__content">
          <div>
            C4占比
            <span>{{ brand_active_summary.percent_c4 }}</span>
          </div>
          <div>
            活跃数
            <span>{{ brand_active_summary.staff_login_times }}</span>
          </div>
          <div>
            排课数
            <span>{{ brand_active_summary.course_schedule }}</span>
          </div>
          <div>
            预约数
            <span>{{ brand_active_summary.course_reserve }}</span>
          </div>
        </div>
      </div>
      <div class="stat">
        <div class="stat__title">
          品牌插件统计
        </div>
        <div class="stat__content">
          <div>
            插件数
            <span></span>
          </div>
          <div>
            插件获客数
            <span></span>
          </div>
          <div>
            插件收益
            <span></span>
          </div>
        </div>
      </div>
      <div class="stat">
        <div class="stat__title">
          品牌活动统计
        </div>
        <div class="stat__content">
          <div>
            活动数
            <span></span>
          </div>
          <div>
            活动获客数
            <span></span>
          </div>
          <div>
            活动收益
            <span></span>
          </div>
        </div>
      </div>
    </div> -->
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
          v-if="auth_area['web/serverlevel/brand_active_export']"
        >
          导出
        </oa-button>
      </template>
      <!-- 选择期初时间 -->
      <oa-date-picker
        v-model="$searchQuery.start_date"
        placeholder="选择期初时间"
        style="width: 200px"
        :needStatFormate="true"
        allowClear
      ></oa-date-picker>
      <!-- 选择期末时间 -->
      <oa-date-picker
        v-model="$searchQuery.end_date"
        placeholder="选择期末时间"
        style="width: 200px"
        :needStatFormate="true"
        allowClear
      ></oa-date-picker>
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
        :options="work_model"
        allowClear
      ></oa-select>
    </oa-filter-box>

    <div :class="b('content')">
      <oa-table
        :columns="tableColumns"
        rowKey="id"
        :scroll="{
          x: 1000
        }"
        :dataSource="dataSource"
        :pager="pager"
        :loading="getBrandActiveList$loading"
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
  getBrandActiveList,
  getBrandActiveHeader,
  getBrandActiveSelect,
  brandActiveExport
} from '@/api/serverlevel'
import tableColumns from './operation-overview#config'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: 'brand-operation-overview',

  bem: {
    b: 'brand-operation-overview'
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
      brand_active_summary: {
        percent_c4: '',
        staff_login_times: '',
        course_schedule: '',
        course_reserve: ''
      },
      work_model: [],
      auth_area: {}
    }
  },

  computed: {},

  watch: {
    $route(value) {
      this.getBrandActiveList()
    }
  },

  async: {
    getBrandActiveList() {
      return getBrandActiveList(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.pager = res.pager
        this.auth_area = res.auth_area
      })
    },
    getBrandActiveHeader() {
      return getBrandActiveHeader()
    },
    getBrandActiveSelect() {
      return getBrandActiveSelect().then(res => {
        this.work_model = res
      })
    },
    brandActiveExport() {
      return brandActiveExport(this.$searchQuery)
    },
    init() {
      return Promise.all([
        this.getBrandActiveSelect(),
        this.getBrandActiveList()
      ])
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    handleExport() {
      this.brandActiveExport().then(res => {
        this.$message.success('导出成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.brand-operation-overview {
  &__stat {
    display: flex;
  }
  &__filter {
    display: flex;
    justify-content: space-between;
  }
}
.stat {
  &__title {
    font-size: 24px;
  }
  &__content {
    font-size: 24px;
  }
}
</style>
