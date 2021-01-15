<template>
  <div class="stat-sale-organ-team">
    <div class="stat-sale-organ-team__head">
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.soft"
        title="本月软件业绩"
        color="red"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.hard"
        title="本月硬件业绩"
        color="green"
      />
      <card
        v-if="Object.keys(headCard).length > 0"
        :info="headCard.pay"
        title="本月签单数"
        color="purple"
      />
    </div>
    <div class="head">
      <ul>
        <li>
          <MonthWeekDatePicker @emitDate="getDate" />
        </li>
        <li>
          <a-select
            placeholder="选择团队"
            style="width: 120px"
            @change="teamChange"
          >
            <a-select-option
              v-for="item in organs"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </li>
        <li></li>
        <li>
          <a-radio-group @change="onChange" defaultValue="1">
            <a-radio-button value="1">按团队维度</a-radio-button>
            <a-radio-button value="2">按城市维度</a-radio-button>
          </a-radio-group>
        </li>
      </ul>
    </div>
    <div class="stat">
      <ul>
        <li>本次筛选统计</li>
        <li>
          总销售业绩
          <span>{{ stat.sale_achievement }}</span>
        </li>
        <li>
          软件销售业绩
          <span>{{ stat.soft_sale_achievement }}</span>
        </li>
        <li>
          软件新签客户数
          <span>{{ stat.soft_sale_pay }}</span>
        </li>
        <li>
          硬件销售业绩
          <span>{{ stat.hard_sale_achievement }}</span>
        </li>
        <li>
          硬件新签客户数
          <span>{{ stat.hard_sale_pay }}</span>
        </li>
        <li>
          拜访量
          <span>{{ stat.visit_number }}</span>
        </li>
      </ul>
    </div>
    <div class="table">
      <oa-table
        :columns="columns"
        :dataSource="tb_data"
        @change="TableChange"
        :pagination="false"
      />
    </div>
    <div class="text-right margin-t10" v-if="pageTotal > 0">
      <a-pagination
        :defaultCurrent="1"
        :total="pageTotal"
        @change="PageChange"
      />
    </div>
  </div>
</template>
<script>
import { getSaleTeamStat } from '@/api/stat'
import { getDepartmentList } from '@/api/user'
import card from '.././stat#/card'
import moment from 'moment'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '团队',
    dataIndex: 'organ_name',
    sorter: (a, b) => a.organ_name.length - b.organ_name.length
  },
  {
    title: '总业绩',
    dataIndex: 'sale_achievement',
    sorter: (a, b) => a.sale_achievement - b.sale_achievement
  },
  {
    title: '软件销售业绩',
    dataIndex: 'soft_sale_achievement',
    sorter: (a, b) => a.soft_sale_achievement - b.soft_sale_achievement
  },
  {
    title: '软件新签客户数',
    dataIndex: 'soft_sale_pay',
    sorter: (a, b) => a.soft_sale_pay - b.soft_sale_pay
  },
  {
    title: '硬件销售业绩',
    dataIndex: 'hard_sale_achievement',
    sorter: (a, b) =>
      a.hard_sale_achievement.length - b.hard_sale_achievement.length
  },
  {
    title: '硬件新签客户数',
    dataIndex: 'hard_sale_pay',
    sorter: (a, b) => a.hard_sale_pay - b.hard_sale_pay
  },
  {
    title: '拜访量',
    dataIndex: 'visit_number',
    sorter: (a, b) => a.visit_number - b.visit_number
  }
]

function TableChange(pagination, filters, sorter) {}

export default {
  name: 'Report',
  props: {},
  data() {
    return {
      header: {
        hard: { month: 0, week: 0, yesterday: 0 },
        soft: { month: 0, week: 0, yesterday: 0 },
        pay: { month: 0, week: 0, yesterday: 0 }
      },
      organs: [],
      columns,

      currentPart: '1',
      pageIndex: 1,
      pageTotal: 10,
      organ_id: -1,
      tb_data: [],
      stat: {
        hard_sale_achievement: 0,
        hard_sale_pay: 0,
        sale_achievement: 0,
        soft_sale_achievement: 0,
        soft_sale_pay: 0,
        visit_number: 0
      },
      headCard: {},
      searchOption: {
        date_start: '',
        date_end: ''
      }
    }
  },
  computed: {},
  components: {
    card
  },
  created() {
    // this.getCurrentDate()
    this.getDepartmentList()
    this.getSaleTeamStat({
      date_start: this.searchOption.date_start,
      date_end: this.searchOption.date_end,
      ps: 10,
      p: this.pageIndex
    })
  },
  methods: {
    getDepartmentList() {
      getDepartmentList().then(res => {
        this.organs = res[0].children
      })
    },
    timeFormat(date) {
      if (!date || typeof date === 'string') {
        this.error('参数异常，请检查...')
      }
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()
      return y + '-' + m + '-' + d
    },
    getCurrentDate() {
      // var myDate = new Date()
      // let year = myDate.getFullYear()
      // let month = myDate.getMonth() + 1
      // let day = myDate.getDate()
      // let currentDate = year + '-' + month + '-' + day
      // myDate.setDate(1)
      // let start = this.timeFormat(myDate)
      // this.date_start = start
      // this.date_end = currentDate
    },
    getDate(val) {
      this.searchOption.date_start = moment(val[0]).format('YYYY-MM-DD')
      this.searchOption.date_end = moment(val[1]).format('YYYY-MM-DD')
      this.getSaleTeamStat()
    },
    getSaleTeamStat() {
      let query = {
        date_start: this.searchOption.date_start,
        date_end: this.searchOption.date_end,
        organ_id: this.organ_id,
        ps: 10,
        p: this.pageIndex
      }
      getSaleTeamStat({ ...query }).then(res => {
        this.pageTotal = parseInt(res.pager.t)
        this.stat = res.table_header

        this.headCard = res.header
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
    },
    teamChange(v) {
      this.organ_id = v
      this.getSaleTeamStat()
    },
    TableChange,
    PageChange(page, pageSize) {
      this.pageIndex = page
      this.getSaleTeamStat({
        date_start: this.searchOption.date_start,
        date_end: this.searchOption.date_end,
        organ_id: this.organ_id,
        ps: 10,
        p: this.pageIndex
      })
    },
    onChange(e) {
      this.currentPart = e.target.value
      this.$emit('listentDimension', this.currentPart)
    }
  }
}
</script>
<style lang="less" scoped>
.stat-sale-organ-team {
  background: white;
  &__head {
    display: flex;
    justify-content: space-between;
    background: rgba(240, 242, 245, 1);
  }
  .month-stat {
    height: 164px;
    background: rgba(247, 249, 252, 1);
    position: relative;
    width: 103%;
    left: -24px;
    padding: 24px;
    .stat-con {
      .month-software,
      .month-hardware,
      .month-sign {
        float: left;
        width: 32.3%;
        height: 116px;
      }
      .month-hardware,
      .month-sign {
        margin-left: 24px;
      }
      .month-software {
        background: white;
        ul {
          li {
            float: left;
          }
          li:nth-child(1) {
            width: 4px;
            height: 116px;
            background: rgba(255, 108, 126, 1);
          }
          li:nth-child(2) {
            padding: 24px;
            .soft-title {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
            }
            .soft-value {
              color: rgba(255, 108, 126, 1);
              font-size: 36px;
              font-weight: bold;
            }
          }
          li:nth-child(3) {
            padding: 28px;
            .week {
              padding-top: 20px;
              .week-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
            .yesterday {
              .yesterday-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
          }
        }
      }
      .month-hardware {
        background: white;
        ul {
          li {
            float: left;
          }
          li:nth-child(1) {
            width: 4px;
            height: 116px;
            background: rgba(54, 203, 203, 1);
          }
          li:nth-child(2) {
            padding: 24px;
            .hard-title {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
            }
            .hard-value {
              color: rgba(54, 203, 203, 1);
              font-size: 36px;
              font-weight: bold;
            }
          }
          li:nth-child(3) {
            padding: 28px;
            .week {
              padding-top: 20px;
              .week-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
            .yesterday {
              .yesterday-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
          }
        }
      }
      .month-sign {
        background: white;
        ul {
          li {
            float: left;
          }
          li:nth-child(1) {
            width: 4px;
            height: 116px;
            background: rgba(168, 138, 220, 1);
          }
          li:nth-child(2) {
            padding: 24px;
            .sign-title {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
            }
            .sign-value {
              color: rgba(168, 138, 220, 1);
              font-size: 36px;
              font-weight: bold;
            }
          }
          li:nth-child(3) {
            padding: 28px;
            .week {
              padding-top: 20px;
              .week-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
            .yesterday {
              .yesterday-tips {
                display: inline-block;
                padding-right: 5px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
              }
              color: rgba(0, 0, 0, 0.65);
              font-weight: bold;
            }
          }
        }
      }
      .month-hardware,
      .month-sign,
      .month-software {
        ul {
          .sign-title {
          }
          .sign-value {
          }
          .week {
            .week-tips {
            }
          }
          .yesterday {
            .yesterday-tips {
            }
          }
        }
      }
    }
  }
  padding: 24px;
  padding-top: 0;
  .stat {
    margin-top: 24px;
    margin-bottom: 16px;
    height: 40px;
    background: rgba(230, 247, 255, 1);
    border-radius: 4px;
    border: 1px solid rgb(143, 162, 172);
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
    margin-top: 24px;
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
}
</style>
