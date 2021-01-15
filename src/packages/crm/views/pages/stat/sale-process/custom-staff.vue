<template>
  <div class="visit-staff">
    <oa-filter-box>
      <template slot="actions">
        <a-radio-group @change="onChange" defaultValue="date">
          <a-radio-button value="date">
            时间维度
          </a-radio-button>
          <a-radio-button value="user">
            员工维度
          </a-radio-button>
        </a-radio-group>
      </template>
      <oa-date-range-filter
        :start.sync="$searchQuery.start_time"
        :end.sync="$searchQuery.end_time"
        :allowClear="false"
        @change="handlerRouteChange"
      ></oa-date-range-filter>
      <!-- 选择团队,员工 -->
      <crm-organ-user-picker
        organPlaceholder="选择团队"
        :organ-id.sync="$searchQuery.organ_id"
        :user-id.sync="$searchQuery.user_id"
        @change="handlerOrganUserChange"
      ></crm-organ-user-picker>
    </oa-filter-box>
    <oa-alert-intro class="margin-t24 margin-b24">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">开发客户数</span>
        <span class="val">{{ stat.sum_new_leads_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">强开客户数</span>
        <span class="val">{{ stat.sum_force_total_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">7天未写拜访</span>
        <span class="val">{{ stat.sum_force_no_write_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">15天未上门</span>
        <span class="val">{{ stat.sum_force_no_home_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">45天未签约</span>
        <span class="val">{{ stat.sum_force_no_contract_num }}</span>
      </div>
    </oa-alert-intro>
    <oa-table
      :columns="columns"
      rowKey="id"
      :scroll="{
        x: 1600
      }"
      :dataSource="dataSource"
      :pager="pager"
      :loading="loading"
      @change="handlerTableChange"
      class="margin-b24"
    >
      <span slot="new_leads_num">
        开发客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的leads数
            </span>
          </template>
        </a-tooltip>
      </span>
    </oa-table>
  </div>
</template>

<script>
import { staffColumns, staffDateColumns } from './custom-staff#config'
import { getCustomStaff, getCustomStaffDate } from '@/api/stat'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      stat: {},
      organs: [],
      dataSource: [],
      columns: staffDateColumns,
      staffDimensionality: false,
      pager: {
        p: 1,
        ps: 0
      }
    }
  },

  computed: {
    loading() {
      return this.getCustomStaff$loading || this.getCustomStaffDate$loading
    }
  },

  async: {
    init() {
      if (this.staffDimensionality) {
        return this.getCustomStaff(this.$searchQuery)
      } else {
        return this.getCustomStaffDate(this.$searchQuery)
      }
    },
    getCustomStaff(data) {
      return getCustomStaff(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pagination = false
      })
    },
    getCustomStaffDate(data) {
      return getCustomStaffDate(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pagination = {
          current: Number(res.pager.p),
          total: res.pager.t
        }
      })
    }
  },

  beforeRouteUpdate(to, form, next) {
    this.$searchQuery = this.$route.meta.query
    this.init()
    next()
  },

  created() {
    this.getCustomStaffDate(this.$searchQuery)
  },

  methods: {
    handlerOrganUserChange(e) {
      this.$searchQuery.organ_id = e.organ_id
      this.$searchQuery.user_id = e.user_id
      this.handlerRouteChange()
    },
    handlerRouteChange() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    handlerTableChange(pagination, filters, sorter) {
      if (!this.staffDimensionality) {
        let order = {
          descend: 1,
          ascend: 2
        }
        if (!sorter.order) this.$searchQuery.time_order = undefined
        else this.$searchQuery.time_order = order[sorter.order]
        this.$searchQuery.p = pagination.current
      }
      this.handlerRouteChange()
    },
    onChange(e) {
      let tag = e.target.value
      this.staffDimensionality = e.target.value === 'user'
      this.$searchQuery.dimensionality = e.target.value
      if (e.target.value === 'date') {
        this.columns = staffDateColumns
      } else {
        this.$searchQuery.organ_id = undefined
        this.$searchQuery.user_id = undefined
        this.columns = staffColumns
      }
      this.handlerRouteChange()
    }
  }
}
</script>

<style lang="less" scoped>
.info-wrap {
  display: inline-flex;
  flex-direction: column;
  .label {
    display: inline-block;
    margin-bottom: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    line-height: 20px;
  }
  .val {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
