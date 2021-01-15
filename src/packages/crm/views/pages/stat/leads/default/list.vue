<template>
  <div class="stat-leads-list">
    <div class="head">
      <oa-filter-box>
        <template slot="actions">
          <a-radio-group
            :value="$route.name"
            @change="e => $router.push({ name: e.target.value })"
          >
            <a-radio-button value="stat-leads-default-list">
              列表
            </a-radio-button>
            <a-radio-button value="stat-leads-default-chart">
              图表
            </a-radio-button>
          </a-radio-group>
        </template>
        <oa-date-range-filter
          :allowClear="false"
          :start.sync="$searchQuery.date_start"
          :end.sync="$searchQuery.date_end"
          @change="getDateVal"
        ></oa-date-range-filter>
        <crm-organ-user-picker
          :organ-id.sync="$searchQuery.organ_id"
          :user-id.sync="$searchQuery.user_id"
          @change="getOrganVal"
        ></crm-organ-user-picker>
      </oa-filter-box>
    </div>
    <oa-alert-intro class="mg-t16 mg-b16">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">数量</span>
        <span class="val">{{ stat.leads_count }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">占比</span>
        <span class="val">{{ stat.proportion }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">成单客户数</span>
        <span class="val">{{ stat.brand_count }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">总转化时长</span>
        <span class="val">{{ stat.translate_time }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">转化周期</span>
        <span class="val">{{ stat.translate_cycle }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">转化率</span>
        <span class="val">{{ stat.translate_rate }}</span>
      </div>
    </oa-alert-intro>
    <div class="table">
      <oa-table
        rowKey="channel_level2_name"
        :columns="columns"
        :dataSource="tableData"
        @change="tbOnTableChange"
        :pagination="false"
      />
    </div>
  </div>
</template>
<script>
import { getLeadsStat } from '@/api/stat'
import { getDepartmentList } from '@/api/user'
import tableMixins from 'oa-core/mixins/table'
const columns = [
  {
    title: '一级渠道',
    dataIndex: 'channel_level1_name'
  },
  {
    title: '二级渠道',
    dataIndex: 'channel_level2_name'
  },
  {
    title: '数量',
    dataIndex: 'leads_count',
    align: 'right',
    sorter: (a, b) => {
      return a.leads_count - b.leads_count
    }
  },
  {
    title: '占比',
    align: 'right',
    dataIndex: 'proportion',
    sorter: (a, b) => parseFloat(a.proportion) - parseFloat(b.proportion)
  },
  {
    title: '成单客户数',
    align: 'right',
    dataIndex: 'brand_count',
    key: 5,
    sorter: (a, b) => a.brand_count - b.brand_count
  },
  {
    title: '总转化时长',
    dataIndex: 'translate_time',
    align: 'right',
    key: 6,
    sorter: (a, b) => a.translate_time - b.translate_time
  },
  {
    title: '转化周期',
    dataIndex: 'translate_cycle',
    align: 'right',
    key: 7,
    sorter: (a, b) => a.translate_cycle - b.translate_cycle
  },
  {
    title: '转化率',
    dataIndex: 'translate_rate',
    align: 'right',
    key: 8,
    sorter: (a, b) =>
      parseFloat(a.translate_rate) - parseFloat(b.translate_rate)
  }
]

export default {
  name: 'Default',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      currentOrganId: 0,
      tableData: [],
      columns,
      currentPart: '1',
      stat: {}
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getLeadsStat()
    next()
  },
  async: {
    getLeadsStat() {
      return getLeadsStat({ ...this.$searchQuery }).then(res => {
        this.stat = res.header instanceof Object && res.header
        this.tableData = res.list instanceof Array && res.list
      })
    }
  },
  created() {
    this.getLeadsStat()
  },
  methods: {
    searchList() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    getDateVal(date) {
      this.$searchQuery.date_start = date.start
      this.$searchQuery.date_end = date.end
      this.searchList()
    },
    getOrganVal(val) {
      this.searchList()
    },
    getDepartmentList() {
      return getDepartmentList().then(res => {
        this.organs = res[0].children
      })
    },
    staffChange(id) {
      this.$searchQuery.user_id = id
      this.getLeadsStat()
    }
  }
}
</script>
<style lang="less" scoped>
.stat-leads-list {
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
}
</style>
