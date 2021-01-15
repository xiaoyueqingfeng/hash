<template>
  <div class="stat-sale-default">
    <oa-filter-box>
      <template slot="actions">
        <a-radio-group
          :value="$route.name"
          @change="e => $router.push({ name: e.target.value })"
        >
          <a-radio-button value="stat-sale-default-list">列表</a-radio-button>
          <a-radio-button value="stat-sale-default-chart">图表</a-radio-button>
        </a-radio-group>
      </template>
      <oa-date-range-filter
        :start.sync="$searchQuery.date_start"
        :end.sync="$searchQuery.date_end"
        @change="getDateVal"
      ></oa-date-range-filter>
    </oa-filter-box>

    <oa-alert-intro class="margin-t24 margin-b24">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">软件销售总额</span>
        <span class="val">{{ stat.soft_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">软件新签客户数</span>
        <span class="val">{{ stat.soft_new_pay }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">硬件销售额</span>
        <span class="val">{{ stat.hard_sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">硬件新签客户数</span>
        <span class="val">{{ stat.hard_new_pay }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">客户拜访量</span>
        <span class="val">{{ stat.visit_number }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">总销售额</span>
        <span class="val">{{ stat.sale_achievement }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">占比</span>
        <span class="val">{{ stat.proportion }}%</span>
      </div>
    </oa-alert-intro>
    <oa-table
      :columns="areaColumns"
      :Key="Math.random().toString()"
      :dataSource="area_data"
      @change="tbOnTableChange"
      :pagination="false"
      class="margin-b24"
    />

    <oa-table
      :columns="teamColumns"
      :dataSource="team_data"
      :Key="Math.random().toString()"
      @change="tbOnTableChange"
      :pagination="false"
    />
  </div>
</template>
<script>
import { getSaleStat } from '@/api/stat'
import tableMixins from 'oa-core/mixins/table'
const areaColumns = [
  {
    title: '大区',
    dataIndex: 'region_name',
    width: '100px'
  },
  {
    title: '软件销售额',
    dataIndex: 'soft',
    sorter: (a, b) => a.soft - b.soft,
    align: 'right'
  },
  {
    title: '软件新签客户',
    dataIndex: 'pay_soft',
    sorter: (a, b) => a.pay_soft - b.pay_soft,
    align: 'right'
  },
  {
    title: '硬件销售额',
    dataIndex: 'hard',
    sorter: (a, b) => a.hard - b.hard,
    align: 'right'
  },
  {
    title: '硬件新签客户数',
    dataIndex: 'pay_hard',
    sorter: (a, b) => a.pay_hard - b.pay_hard,
    align: 'right'
  },
  {
    title: '客户拜访量',
    dataIndex: 'visit',
    sorter: (a, b) => a.visit - b.visit,
    align: 'right'
  },
  {
    title: '总销售额',
    dataIndex: 'total_sale',
    sorter: (a, b) => a.total_sale - b.total_sale,
    align: 'right'
  },
  {
    title: '占比',
    dataIndex: 'proportion',
    sorter: (a, b) => parseFloat(a.proportion) - parseFloat(b.proportion),
    align: 'right'
  }
]
const teamColumns = [
  {
    title: '团队',
    dataIndex: 'organ_name',
    width: '100px',
    sorter: (a, b) => a.organ_name.length - b.organ_name.length
  },
  {
    title: '软件销售额',
    dataIndex: 'soft',
    sorter: (a, b) => a.soft - b.soft,
    align: 'right'
  },
  {
    title: '软件新签客户',
    dataIndex: 'pay_soft',
    sorter: (a, b) => a.pay_soft - b.pay_soft,
    align: 'right'
  },
  {
    title: '硬件销售额',
    dataIndex: 'hard',
    sorter: (a, b) => a.hard - b.hard,
    align: 'right'
  },
  {
    title: '硬件新签客户数',
    dataIndex: 'pay_hard',
    sorter: (a, b) => a.pay_hard - b.pay_hard,
    align: 'right'
  },
  {
    title: '客户拜访量',
    dataIndex: 'visit',
    sorter: (a, b) => a.visit - b.visit,
    align: 'right'
  },
  {
    title: '总销售额',
    dataIndex: 'total_sale',
    sorter: (a, b) => a.total_sale - b.total_sale,
    align: 'right'
  },
  {
    title: '占比',
    dataIndex: 'proportion',
    sorter: (a, b) => parseFloat(a.proportion) - parseFloat(b.proportion),
    align: 'right'
  }
]
export default {
  name: 'Default',
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      area_data: [],
      team_data: [],
      teamColumns,
      areaColumns,

      currentPart: '1',
      stat: {}
    }
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getSaleStat()
    next()
  },
  created() {
    this.getSaleStat()
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
    getSaleStat() {
      getSaleStat({
        ...this.$searchQuery
      }).then(res => {
        this.stat = res.header
        this.team_data = []
        this.area_data = []
        if (res.organ.length > 0) {
          for (let i = 0; i < res.organ.length; i++) {
            let item = {
              key: res.organ[i].organ_id,
              hard: res.organ[i].hard,
              organ_id: res.organ[i].organ_id,
              organ_name: res.organ[i].organ_name,
              pay_hard: res.organ[i].pay_hard,
              pay_soft: res.organ[i].pay_soft,
              proportion: res.organ[i].proportion,
              region_id: res.organ[i].region_id,
              soft: res.organ[i].soft,
              total_sale: res.organ[i].total_sale,
              visit: res.organ[i].visit
            }
            this.team_data.push(item)
          }
        } else {
          this.team_data = []
        }
        if (res.region.length > 0) {
          this.area_data = []
          for (let i = 0; i < res.region.length; i++) {
            let item = {
              key: res.region[i].region_id,
              hard: res.region[i].hard,
              organ_id: res.region[i].organ_id,
              region_name: res.region[i].region_name,
              pay_hard: res.region[i].pay_hard,
              pay_soft: res.region[i].pay_soft,
              proportion: res.region[i].proportion,
              region_id: res.region[i].region_id,
              soft: res.region[i].soft,
              total_sale: res.region[i].total_sale,
              visit: res.region[i].visit
            }
            this.area_data.push(item)
          }
        } else {
          this.area_data = []
        }
      })
    },
    getDate(date) {
      this.$searchQuery.date_start = date.start
      this.$searchQuery.date_end = date.end
      this.searchList()
      // this.getSaleStat()
    },
    onChange(e) {
      this.currentPart = e.target.value
      this.$emit('listentCurrentPart', this.currentPart)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.stat-sale-default {
  background: white;
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
