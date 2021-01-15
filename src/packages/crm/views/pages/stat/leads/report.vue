<template>
  <div class="stat-leads-report">
    <div class="stat-leads-report__head">
      <card
        v-if="Object.keys(reportData).length > 0"
        :info="reportData.header.leads"
        title="本月新增leads"
        color="red"
      />
      <card
        v-if="Object.keys(reportData).length > 0"
        :info="reportData.header.potential"
        title="本月转化为潜客leads"
        color="green"
      />
      <card
        v-if="Object.keys(reportData).length > 0"
        :info="reportData.header.pay"
        title="本月签约leads"
        color="purple"
      />
    </div>
    <oa-alert-intro class="margin-t24">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">新增数据</span>
        <span class="val">{{ total }}</span>
      </div>
      <!-- <span class="mg-l32" v-for="item in columnArr" :key="item.id">
        <span >{{item.name}}</span>
        <span>{{item.val}}</span>
      </span>-->
    </oa-alert-intro>
    <div class="stat-leads-report__content">
      <oa-filter-box class="margin-t24 margin-b16">
        <oa-date-range-filter
          :allowClear="false"
          :start.sync="$searchQuery.date_start"
          :end.sync="$searchQuery.date_end"
          @change="getDateVal"
        ></oa-date-range-filter>
      </oa-filter-box>
      <oa-table
        :Key="Math.random().toString()"
        :scroll="{ x: 5760 }"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
      />
    </div>
  </div>
</template>
<script>
import { getLeadsRreport } from '@/api/stat'
import card from '.././stat#/card'
import tableMixins from 'oa-core/mixins/table'
import { columns } from './report#config'

export default {
  name: 'Report',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      reportData: {},
      columns,
      currentPart: '1',
      stat: {},
      tableData: [],
      total: 0,
      columnArr: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getLeadsRreport()
    next()
  },
  created() {
    this.getLeadsRreport()
  },
  mounted() {},
  async: {
    getLeadsRreport() {
      return getLeadsRreport({ ...this.$searchQuery }).then(res => {
        this.reportData = res instanceof Object && res
        let columns = res.table_header instanceof Array && res.table_header
        // let temp = res.table_header instanceof Array && res.table_header
        // this.columnArr = []
        // temp.map(total => {
        //   res.channel_total.map(header => {
        //     let obj = {}
        //     /* eslint-disable */
        //     if (header.id == total.id) {
        //       obj.name = total.name
        //       obj.val = header.value
        //       this.columnArr.push(obj)
        //     }
        //   })
        // })
        this.columns = [
          { title: '日期', dataIndex: 'date', width: '120px' },
          {
            title: '新增总数',
            dataIndex: 'new_leads_number',
            width: '80px',
            align: 'right'
          }
        ]
        columns.map(item => {
          let obj = {}
          obj.title = item.name
          obj.dataIndex = item.id
          obj.align = 'right'
          this.columns.push(obj)
          return obj
        })
        this.total = res.channel_all_total
        let tableData = res.list instanceof Array && res.list
        this.tableData = []
        tableData.map(item => {
          let obj = {}
          obj.date = item.date
          obj.new_leads_number = item.new_leads_number
          item.channel_list.map(channel => {
            obj[channel.id] = channel.value
          })
          this.tableData.push(obj)
        })
        // this.tableData = res.list instanceof Array && res.list;
        this.stat = res
      })
    }
  },
  computed: {},
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
      // this.getLeadsRreport()
    }
  },
  components: { card }
}
</script>
<style lang="less" scoped>
.stat-leads-report {
  &__head {
    display: flex;
    padding: 16px;
    .mg(-16px -16px 0);
    justify-content: space-between;
    background: rgba(247, 249, 252, 1);
  }
  &__content {
    .date {
      margin: 24px 0 24px 0;
    }
  }
  &__stat {
    display: flex;
    width: 100%;
    margin: 24px 0;
    height: 40px;
    line-height: 40px;
    background: rgba(230, 247, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(186, 231, 255, 1);
    .item {
      margin-right: 32px;
    }
  }
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
