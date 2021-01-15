<template>
  <div class="stat-server-default">
    <oa-filter-box>
      <template slot="actions">
        <a-radio-group
          :value="$route.name"
          @change="e => $router.push({ name: e.target.value })"
        >
          <a-radio-button value="stat-server-default-list">列表</a-radio-button>
          <a-radio-button value="stat-server-default-chart">
            图表
          </a-radio-button>
        </a-radio-group>
      </template>
      <oa-date-range-filter
        :start.sync="$searchQuery.date_start"
        :end.sync="$searchQuery.date_end"
        @change="getDateVal"
      ></oa-date-range-filter>
    </oa-filter-box>
    <oa-table
      rowKey="date"
      class="margin-t16"
      :columns="columns"
      :dataSource="tb_data"
      @change="tbOnTableChange"
      :pager="pager"
    />
  </div>
</template>
<script>
import { getServerList } from '@/api/stat'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '电话录入量',
    dataIndex: 'phone_record_number',
    sorter: (a, b) => a.phone_record_number - b.phone_record_number,
    align: 'right'
  },
  {
    title: 'C0客户',
    dataIndex: 'server_level0_number',
    sorter: (a, b) => a.server_level0_number - b.server_level0_number,
    align: 'right'
  },
  {
    title: 'C1客户',
    dataIndex: 'server_level1_number',
    sorter: (a, b) => a.server_level1_number - b.server_level1_number,
    align: 'right'
  },
  {
    title: 'C2客户',
    dataIndex: 'server_level2_number',
    sorter: (a, b) => a.server_level2_number - b.server_level2_number,
    align: 'right'
  },
  {
    title: 'C3客户',
    dataIndex: 'server_level3_number',
    sorter: (a, b) => a.server_level3_number - b.server_level3_number,
    align: 'right'
  },
  {
    title: 'C4客户',
    dataIndex: 'server_level4_number',
    sorter: (a, b) => a.server_level4_number - b.server_level4_number,
    align: 'right'
  },
  {
    title: '续费业绩',
    dataIndex: 'repay_server_achievement',
    sorter: (a, b) => a.repay_server_achievement - b.repay_server_achievement,
    align: 'right'
  },
  {
    title: '续费客户数',
    dataIndex: 'repay_server_number',
    sorter: (a, b) => a.repay_server_number - b.repay_server_number,
    align: 'right'
  },
  {
    title: '服务数',
    dataIndex: 'service_number',
    sorter: (a, b) => a.service_number - b.service_number,
    align: 'right'
  }
]
export default {
  name: 'Default',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      date_start: '',
      pageSize: 1,
      pageTotal: 0,
      date_end: '',
      tb_data: [],
      columns,
      currentPart: '1',
      pager: {
        p: 1, // 分页当前页
        ps: 5 // 每页数量
      }
    }
  },
  computed: {},
  created() {
    this.getServerList()
  },
  components: {},
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getServerList()
    next()
  },
  async: {
    getServerList() {
      return getServerList({ ...this.$searchQuery }).then(res => {
        if (res.list.length > 0) {
          this.pager = get(res, 'pager', this.pager)
          this.tb_data = []
          for (let i = 0; i < res.list.length; i++) {
            let item = {
              key: i + 1,
              date: res.list[i].date,
              phone_record_number: res.list[i].phone_record_number,
              repay_server_achievement: res.list[i].repay_server_achievement,
              repay_server_number: res.list[i].repay_server_number,
              server_level0_number: res.list[i].server_level0_number,
              server_level1_number: res.list[i].server_level1_number,
              server_level2_number: res.list[i].server_level2_number,
              server_level3_number: res.list[i].server_level3_number,
              server_level4_number: res.list[i].server_level4_number,
              service_number: res.list[i].service_number
            }
            this.tb_data.push(item)
          }
        } else {
          this.tb_data = []
        }
      })
    }
  },
  methods: {
    onChange(e) {
      this.currentPart = e.target.value
      this.$emit('listentCurrentPart', this.currentPart)
    },
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
.stat-server-default {
  background: white;
  .table {
    margin-top: 24px;
  }
}
</style>
