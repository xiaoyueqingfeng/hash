<template>
  <div class="stat-sale-team">
    <div class="stat-sale-team__head">
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.soft"
        :isShowIcon="true"
        title="本月软件业绩"
        color="red"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.hard"
        title="本月硬件业绩"
        :isShowIcon="true"
        color="green"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.pay"
        title="本月签单数"
        color="purple"
      />
    </div>
    <div class="stat-sale-team__form">
      <oa-filter-box class="margin-t24">
        <oa-date-range-filter
          :start.sync="$searchQuery.date_start"
          :end.sync="$searchQuery.date_end"
          @change="getDateVal"
        >
          >
        </oa-date-range-filter>
        <oa-select
          v-if="isShowTeame"
          v-model="$searchQuery.organ_id"
          placeholder="选择团队"
          style="width: 120px"
          @change="teamChange"
          :options="organs"
        ></oa-select>
        <oa-region-cascader
          v-else
          @change="getCityId"
          v-model="model"
          style="width:220px;"
        ></oa-region-cascader>
        <span class="fl-r">
          <a-radio-group @change="onChange" defaultValue="1">
            <a-radio-button value="1">按团队维度</a-radio-button>
            <a-radio-button value="2">按城市维度</a-radio-button>
          </a-radio-group>
        </span>
      </oa-filter-box>
      <oa-alert-intro class="margin-t24 margin-b24">
        <div class="info-wrap">
          <span class="label">本次筛选</span>
          <span class="val">总计</span>
        </div>
        <div class="info-wrap mg-l32">
          <span class="label">总销售业绩</span>
          <span class="val">{{ stat.sale_achievement }}</span>
        </div>
        <div class="info-wrap mg-l32">
          <span class="label">软件销售业绩</span>
          <span class="val">{{ stat.soft_sale_achievement }}</span>
        </div>
        <div class="info-wrap mg-l32">
          <span class="label">软件新签客户数</span>
          <span class="val">{{ stat.soft_sale_pay }}</span>
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
          :columns="columns"
          :dataSource="tb_data"
          @change="tbOnTableChange"
          :pager="pager"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getSaleTeamStat, getSaleCityStat } from '@/api/stat'
import { getDepartmentList } from '@/api/user'
import card from '.././stat#/card'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '团队',
    dataIndex: 'organ_name'
  },
  {
    title: '总业绩',
    align: 'right',
    dataIndex: 'sale_achievement',
    sorter: (a, b) => a.sale_achievement - b.sale_achievement
  },
  {
    title: '软件销售业绩',
    align: 'right',
    dataIndex: 'soft_sale_achievement',
    sorter: (a, b) => a.soft_sale_achievement - b.soft_sale_achievement
  },
  {
    title: '软件新签客户数',
    align: 'right',
    dataIndex: 'soft_sale_pay',
    sorter: (a, b) => a.soft_sale_pay - b.soft_sale_pay
  },
  {
    title: '硬件销售业绩',
    align: 'right',
    dataIndex: 'hard_sale_achievement',
    sorter: (a, b) =>
      a.hard_sale_achievement.length - b.hard_sale_achievement.length
  },
  {
    title: '硬件新签客户数',
    align: 'right',
    dataIndex: 'hard_sale_pay',
    sorter: (a, b) => a.hard_sale_pay - b.hard_sale_pay
  },
  {
    title: '拜访量',
    align: 'right',
    dataIndex: 'visit_number',
    sorter: (a, b) => a.visit_number - b.visit_number
  }
]

export default {
  name: 'Report',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      organs: [],
      columns,
      city_id: '',
      currentPart: '1',
      pageIndex: 1,
      pageTotal: 10,
      organ_id: -1,
      tb_data: [],
      stat: {},
      headCard: {},
      model: [],
      isShowTeame: true,
      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      }
    }
  },
  computed: {},
  components: {
    card
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate', this.$route.meta.query)
    this.$searchQuery = this.$route.meta.query
    if (this.isShowTeame) {
      this.getSaleTeamStat()
    } else {
      this.getCityId()
    }
    next()
  },
  created() {
    this.getDepartmentList()
    this.getSaleTeamStat()
  },
  async: {
    getSaleTeamStat() {
      this.tb_data = []
      this.$searchQuery.city_id = ''
      getSaleTeamStat({ ...this.$searchQuery }).then(res => {
        this.pager = get(res, 'pager', this.pager)
        this.stat = res.table_header
        this.headCard = res.header instanceof Object && res.header
        if (res.list.length > 0) {
          for (let i = 0; i < res.list.length; i++) {
            let item = {
              key: res.list[i].organ_id,
              hard_sale_achievement: res.list[i].hard_sale_achievement,
              hard_sale_pay: res.list[i].hard_sale_pay,
              date: res.list[i].date,
              organ_name: res.list[i].organ_name,
              sale_achievement: res.list[i].sale_achievement,
              soft_sale_achievement: res.list[i].soft_sale_achievement,
              soft_sale_pay: res.list[i].soft_sale_pay,
              visit_number: res.list[i].visit_number
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
    getDateVal(date) {
      this.$searchQuery.date_start = date.start
      this.$searchQuery.date_end = date.end
      this.searchList()
    },
    searchList() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    getCityId() {
      this.tb_data = []
      this.$searchQuery.city_id = this.model[2]
      getSaleCityStat({
        date_start: this.$searchQuery.date_start,
        date_end: this.$searchQuery.date_end,
        city_id: this.model[2],
        ps: this.$searchQuery.ps,
        p: this.$searchQuery.p
      }).then(res => {
        this.headCard = res.header instanceof Object && res.header
        this.stat = res.table_header
        this.pager = get(res, 'pager', this.pager)
        this.tb_data = res.list instanceof Array && res.list
      })
    },
    getDepartmentList() {
      getDepartmentList().then(res => {
        this.organs = res[0].children
      })
    },
    teamChange() {
      this.searchList()
    },
    onChange(e) {
      this.$searchQuery.p = 1
      this.pager.p = 1
      /* eslint-disable */
      this.isShowTeame = e.target.value == 1
      if (e.target.value == 1) {
        this.columns[1].title = '团队'
        this.columns[1].dataIndex = 'organ_name'
        // this.getSaleTeamStat()
      } else {
        this.columns[1].title = '城市'
        this.columns[1].dataIndex = 'city_name'
        // this.getCityId()
      }
      this.searchList()
    }
  }
}
</script>
<style lang="less" scoped>
.stat-sale-team {
  background: white;
  &__head {
    display: flex;
    padding: 16px;
    .mg(-16px -16px 0);
    justify-content: space-between;
    background: rgba(247, 249, 252, 1);
  }
  .stat {
    margin-top: 24px;
    margin-bottom: 24px;
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
