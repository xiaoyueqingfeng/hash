<template>
  <div class="stat-server-report">
    <div class="stat-server-report__head">
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.repay_achievement"
        title="本月续费业绩"
        :isShowIcon="true"
        color="red"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.repay_number"
        title="本月续费客户数"
        color="green"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.service_number"
        title="本月服务数"
        color="purple"
      />
    </div>
    <oa-filter-box class="margin-t24 margin-b16">
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
import card from '.././stat#/card'
import { getEmployeeList, getDepartmentList } from '@/api/user'
import { getServerUserList } from '@/api/stat'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import { columns } from './report#config'

export default {
  name: 'Report',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      tb_data: [],
      organs: [],
      headCard: {},
      users: [],
      columns,
      currentPart: '1',

      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      }
    }
  },
  computed: {},
  components: { card },
  created() {
    this.getServerUserList()
    // this.getDepartmentList()
  },
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getServerUserList()
    next()
  },
  async: {
    getServerUserList() {
      return getServerUserList({ ...this.$searchQuery }).then(res => {
        this.pager = get(res, 'pager', this.pager)
        this.headCard = res.header
        if (res.list.length > 0) {
          this.tb_data = []
          for (let i = 0; i < res.list.length; i++) {
            let item = {
              key: i + 1,
              date: res.list[i].date,
              organ_name: res.list[i].organ_name,
              phone_record_number: res.list[i].phone_record_number,
              repay_server_achievement: res.list[i].repay_server_achievement,
              repay_server_number: res.list[i].repay_server_number,
              server_level0_number: res.list[i].server_level0_number,
              server_level1_number: res.list[i].server_level1_number,
              server_level2_number: res.list[i].server_level2_number,
              server_level3_number: res.list[i].server_level3_number,
              server_level4_number: res.list[i].server_level4_number,
              service_number: res.list[i].service_number,
              user_name: res.list[i].user_name
            }
            this.tb_data.push(item)
          }
        } else {
          this.tb_data = []
        }
        console.log('userList', res)
      })
    }
  },
  methods: {
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
    getOrganVal() {
      this.searchList()
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
.stat-server-report {
  background: white;
  &__head {
    display: flex;
    padding: 16px;
    .mg(-16px -16px 0);
    justify-content: space-between;
    background: rgba(247, 249, 252, 1);
  }
}
</style>
