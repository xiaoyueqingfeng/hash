<template>
  <div class="stat-sale-user">
    <div class="head">
      <oa-filter-box>
        <oa-date-range-filter
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
    <oa-alert-intro class="margin-t24 margin-b24">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">合计</span>
        <span class="val">{{ stat.sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">系统销售业绩</span>
        <span class="val">{{ stat.soft_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">系统新签客户数</span>
        <span class="val">{{ stat.soft_sale_pay }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">插件销售业绩</span>
        <span class="val">{{ stat.plugin_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">小程序销售业绩</span>
        <span class="val">{{ stat.mina_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">硬件销售业绩</span>
        <span class="val">{{ stat.hard_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">硬件新签客户数</span>
        <span class="val">{{ stat.hard_sale_pay }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">拜访量</span>
        <span class="val">{{ stat.visit_number }}</span>
      </div>
    </oa-alert-intro>
    <div class="table">
      <oa-table
        :Key="Math.random().toString()"
        :scroll="{ x: 1440 }"
        :columns="columns"
        :dataSource="tb_data"
        @change="tbOnTableChange"
        :pager="pager"
      />
    </div>
  </div>
</template>
<script>
import { getEmployeeList, getDepartmentList } from '@/api/user'
import { getSaleUserList } from '@/api/stat'
import tableMixins from 'oa-core/mixins/table'
import { columns } from './user#config'

export default {
  name: 'Default',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      tb_data: [],
      organs: [],
      users: [],
      pageIndex: 1,
      organ_id: -1,
      user_id: -1,
      columns,
      currentPart: '1',
      stat: {},

      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      }
    }
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getSaleUserList()
    next()
  },
  created() {
    this.getSaleUserList()
    this.getDepartmentList()
  },
  methods: {
    getOrganVal(val) {
      this.searchList()
    },
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
    },
    getSaleUserList() {
      getSaleUserList({ ...this.$searchQuery }).then(res => {
        this.pager = res.pager
        this.stat = res.table_header instanceof Object && res.table_header
        if (res.list.length > 0) {
          this.tb_data = []
          for (let i = 0; i < res.list.length; i++) {
            let item = {
              key: i,
              date: res.list[i].date,
              hard_sale_achievement: res.list[i].hard_sale_achievement,
              hard_sale_pay: res.list[i].hard_sale_pay,
              mina_sale_achievement: res.list[i].mina_sale_achievement,
              organ_name: res.list[i].organ_name,
              plugin_sale_achievement: res.list[i].plugin_sale_achievement,
              sale_achievement: res.list[i].sale_achievement,
              soft_sale_achievement: res.list[i].soft_sale_achievement,
              soft_sale_pay: res.list[i].soft_sale_pay,
              user_name: res.list[i].user_name,
              visit_number: res.list[i].visit_number
            }
            this.tb_data.push(item)
          }
        } else {
          this.tb_data = []
        }
      })
    },
    teamChange(v) {
      this.organ_id = v
      this.getEmployeeList(v)
      this.getSaleUserList({})
    },
    getDepartmentList() {
      getDepartmentList().then(res => {
        this.organs = res[0].children
      })
    },
    getEmployeeList(onganId) {
      getEmployeeList({ organ_id: onganId }).then(res => {
        this.users = res.list
      })
    },
    onChange(e) {
      this.currentPart = e.target.value
      this.$emit('listentCurrentPart', this.currentPart)
    },
    staffChange(v) {
      this.user_id = v
      this.getSaleUserList()
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.stat-sale-user {
  background: white;
  .stat {
    margin-top: 24px;
    margin-bottom: 16px;
    height: 40px;
    line-height: 40px;
    background: rgba(230, 247, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(186, 231, 255, 1);
    ul {
      height: 100%;
      padding: 0;
      overflow: hidden;
      li {
        height: 100%;
        line-height: 40px;
        float: left;
        list-style: none;
        margin-left: 32px;
      }
      li:nth-child(1) {
        margin-left: 18px;
      }
    }
  }
  .head {
    ul {
      padding: 0;
      overflow: hidden;
      li {
        list-style: none;
        float: left;
      }
      li:nth-child(2),
      li:nth-child(3) {
        margin-left: 8px;
      }
      li:nth-child(4) {
        float: right;
      }
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
