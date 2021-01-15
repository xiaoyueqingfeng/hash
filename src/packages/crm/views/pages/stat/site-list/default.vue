<template>
  <div class="site-list">
    <div class="site-list__header">
      <card
        v-if="Object.keys(totalInfo).length > 0"
        :info="totalInfo.header.leads"
        title="本月新增leads"
        color="red"
        type="siteList"
      />
      <card
        v-if="Object.keys(totalInfo).length > 0"
        :info="totalInfo.header.potential"
        title="本月新增潜在客户"
        color="green"
        type="siteList"
      />
      <card
        v-if="Object.keys(totalInfo).length > 0"
        :info="totalInfo.header.pay"
        title="本月新签约客户"
        color="purple"
        type="siteList"
      />
    </div>

    <div class="site-list__content">
      <oa-filter-box class="margin-t24 margin-b16">
        <oa-date-range-filter
          :start.sync="$searchQuery.date_start"
          :end.sync="$searchQuery.date_end"
          @change="getDateVal"
        ></oa-date-range-filter>
      </oa-filter-box>
      <oa-table
        rowKey="id"
        :columns="columns"
        :dataSource="totalInfo.list"
        :loading="getTotalList$loading"
        @change="tbOnTableChange"
        :pager="pager"
      />
    </div>
  </div>
</template>
<script>
import card from '.././stat#/card'
import { getTotalDataAnalysis } from '@/api/stat'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 1
  },
  {
    title: '俱乐部总数',
    align: 'right',
    dataIndex: 'club_number',
    key: 4,
    sorter: (a, b) => parseFloat(a.club_number) - parseFloat(b.club_number)
  },
  {
    title: '工作室总数',
    align: 'right',
    dataIndex: 'studio_number',
    key: 5,
    sorter: (a, b) => parseFloat(a.studio_number) - parseFloat(b.studio_number)
  },
  {
    title: 'leads总数',
    align: 'right',
    dataIndex: 'leads_number',
    key: 2,
    sorter: (a, b) => parseFloat(a.leads_number) - parseFloat(b.leads_number)
  },
  {
    title: '潜在客户总数',
    align: 'right',
    dataIndex: 'potential_number',
    key: 3,
    sorter: (a, b) =>
      parseFloat(a.potential_number) - parseFloat(b.potential_number)
  },
  {
    title: '签约客户总数',
    align: 'right',
    dataIndex: 'pay_number',
    key: 6,
    sorter: (a, b) => parseFloat(a.pay_number) - parseFloat(b.pay_number)
  },
  {
    title: '新增leads',
    align: 'right',
    dataIndex: 'new_leads_number',
    key: 7,
    sorter: (a, b) =>
      parseFloat(a.new_leads_number) - parseFloat(b.new_leads_number)
  },
  {
    title: '新增潜在客户',
    align: 'right',
    dataIndex: 'new_potential_number',
    key: 8,
    sorter: (a, b) =>
      parseFloat(a.new_potential_number) - parseFloat(b.new_potential_number)
  },
  {
    title: '新增签约客户',
    align: 'right',
    dataIndex: 'new_pay_number',
    key: 9,
    sorter: (a, b) =>
      parseFloat(a.new_pay_number) - parseFloat(b.new_pay_number)
  },
  {
    title: '新增断约客户',
    align: 'right',
    dataIndex: 'new_break_number',
    key: 10,
    sorter: (a, b) =>
      parseFloat(a.new_break_number) - parseFloat(b.new_break_number)
  }
  // {
  //   title: '会员数',
  //   dataIndex: 'member_number'
  // },
  // {
  //   title: '新增会员数',
  //   dataIndex: 'member_number'
  // }
]
export default {
  name: 'SiteList',
  mixins: [tableMixins],
  data() {
    return {
      columns,
      organ_id: 12,
      totalInfo: {},
      date_start: '',
      date_end: '',
      organList: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query

    this.getTotalList()
    next()
  },
  async: {
    getTotalList() {
      return getTotalDataAnalysis({ ...this.$searchQuery }).then(res => {
        this.totalInfo = res instanceof Object && res
        this.pager = get(res, 'pager', this.pager)
      })
    }
  },
  created() {
    this.getTotalList()
  },
  components: {
    card
  },
  methods: {
    getDateVal(date) {
      this.$searchQuery.date_start = date.start
      this.$searchQuery.date_end = date.end
      this.searchList()
    },
    searchList() {
      this.$router.push({
        query: this.$searchQuery
      })
    }
  }
}
</script>
<style lang="less" scoped>
.site-list {
  &__header {
    display: flex;
    padding: 0 0 16px;
    .mg(-16px -16px 0);
    justify-content: space-between;
    background: rgba(240, 242, 245, 1);
  }
  &__content {
    background: #fff;
    &__column {
      margin-bottom: 24px;
    }
  }
}
</style>
