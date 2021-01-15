<template>
  <div class="visit-staff">
    <oa-filter-box>
      <template slot="actions">
        <a-radio-group @change="onChange" defaultValue="date">
          <a-radio-button value="date">
            时间维度
          </a-radio-button>
          <a-radio-button value="team">
            团队维度
          </a-radio-button>
        </a-radio-group>
      </template>
      <oa-date-range-filter
        :start.sync="$searchQuery.start_time"
        :end.sync="$searchQuery.end_time"
        :allowClear="false"
        @change="handlerRouteChange"
      ></oa-date-range-filter>
      <!-- 选择团队 -->
      <crm-organ-picker
        v-model="$searchQuery.organ_id"
        placeholder="选择团队"
        @change="handlerOrganChange"
        v-if="!groupDimensionality"
      ></crm-organ-picker>
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
import { groupColumns, groupDateColumns } from './custom-organ#config'
import { getCustomOrgan, getCustomOrganDate } from '@/api/stat'
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
      dataSource: [],
      columns: groupDateColumns,
      groupDimensionality: false,
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    loading() {
      return this.getCustomOrgan$loading || this.getCustomOrganDate$loading
    }
  },

  async: {
    init() {
      if (this.groupDimensionality) {
        return this.getCustomOrgan(this.$searchQuery)
      } else {
        return this.getCustomOrganDate(this.$searchQuery)
      }
    },
    getCustomOrgan(data) {
      return getCustomOrgan(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pager = false
      })
    },
    getCustomOrganDate(data) {
      return getCustomOrganDate(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pager = get(res, 'pager', this.pager)
      })
    }
  },

  beforeRouteUpdate(to, form, next) {
    console.log('beforeRouteUpdate')
    this.$searchQuery = this.$route.meta.query
    this.init()
    next()
  },

  created() {
    this.getCustomOrganDate(this.$searchQuery)
  },

  methods: {
    handlerOrganChange(e) {
      this.$searchQuery.organ_id = e
      this.handlerRouteChange()
    },
    handlerRouteChange() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    handlerTableChange(pagination, filters, sorter) {
      if (!this.groupDimensionality) {
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
      this.groupDimensionality = e.target.value === 'team'
      this.$searchQuery.dimensionality = e.target.value
      if (e.target.value === 'date') {
        this.columns = groupDateColumns
      } else {
        this.$searchQuery.organ_id = undefined
        this.columns = groupColumns
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
