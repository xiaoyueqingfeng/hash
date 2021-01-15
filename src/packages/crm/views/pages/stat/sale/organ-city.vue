<template>
  <div class="stat-sale-organ-city">
    <div class="month-stat"></div>
    <div class="head">
      <ul>
        <li>
          <MonthWeekDatePicker v-on:emitDate="getDate" />
        </li>
        <li>
          <oa-region-cascader
            @change="getCityId"
            :options="cityTree"
          ></oa-region-cascader>
        </li>
        <li></li>
        <li>
          <a-radio-group @change="onChange" defaultValue="2">
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
    <div class="text-right margin-t10">
      <a-pagination
        :defaultCurrent="1"
        :pageSize="10"
        :total="pageTotal"
        @change="PageChange"
      />
    </div>
  </div>
</template>
<script>
import card from '.././stat#/card'

import { mapGetters } from 'vuex'
import { getSaleCityStat } from '@/api/stat'
import moment from 'moment'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '总销售业绩',
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
    sorter: (a, b) => a.hard_sale_achievement - b.hard_sale_achievement
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

function TableChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter)
}

export default {
  name: 'Report',
  props: {},
  data() {
    return {
      tb_data: [],
      header: {
        hard: { month: 0, week: 0, yesterday: 0 },
        soft: { month: 0, week: 0, yesterday: 0 },
        pay: { month: 0, week: 0, yesterday: 0 }
      },
      date_start: '',
      pageTotal: 0,
      columns,
      date_end: '',
      cityId: -1,
      currentPart: '2',
      pageIndex: 1,
      stat: {
        hard_sale_achievement: 0,
        hard_sale_pay: 0,
        sale_achievement: 0,
        soft_sale_achievement: 0,
        soft_sale_pay: 0,
        visit_number: 0
      },
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      }
    }
  },
  computed: { ...mapGetters('oa/base', ['cityTree']) },
  mounted() {
    this.getCurrentDate()
    this.getSaleCityStat({
      date_start: this.date_start,
      date_end: this.date_end,
      ps: 10,
      p: this.pageIndex
    })
  },

  methods: {
    getSaleCityStat(obj) {
      getSaleCityStat(obj).then(res => {
        this.pageTotal = parseInt(res.pager.t)
        this.stat = res.table_header
        this.header = res.header
        this.pageTotal = res.pager.t
        this.headCard = res.header instanceof Object && res.header
        if (res.list.length > 0) {
          for (let i = 0; i < res.list.length; i++) {
            let item = {
              key: res.list[i].city_id,
              city_name: res.list[i].city_name,
              date: res.list[i].date,
              hard_sale_achievement: res.list[i].hard_sale_achievement,
              hard_sale_pay: res.list[i].hard_sale_pay,
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
    getDate(val) {
      this.searchOption.date_start = moment(val[0]).format('YYYY-MM-DD')
      this.searchOption.date_end = moment(val[1]).format('YYYY-MM-DD')
      this.getSaleCityStat()
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
    getCityId(v) {
      this.cityId = v[1]
      this.getSaleCityStat({
        date_start: this.date_start,
        date_end: this.date_end,
        city_id: this.cityId,
        ps: 10,
        p: this.pageIndex
      })
    },
    getCurrentDate() {
      var myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let day = myDate.getDate()
      let currentDate = year + '-' + month + '-' + day
      myDate.setDate(1)
      let start = this.timeFormat(myDate)
      this.date_start = start
      this.date_end = currentDate
    },
    dateChange() {},
    teamChange() {},
    staffChange() {},
    TableChange,
    PageChange(page, pageSize) {
      this.pageIndex = page
      this.getSaleCityStat({
        date_start: this.date_start,
        date_end: this.date_end,
        organ_id: this.organ_id,
        ps: 10,
        p: this.pageIndex
      })
    },
    onChange(e) {
      this.currentPart = e.target.value
      this.$emit('listentDimension', this.currentPart)
    }
  },
  components: {
    card
  }
}
</script>
<style lang="less" scoped>
.stat-sale-organ-city {
  // background: white;
  &__head {
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
