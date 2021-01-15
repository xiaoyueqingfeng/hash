<template>
  <div class="visit-staff">
    <oa-filter-box>
      <template slot="actions">
        <a-radio-group @change="onChange" defaultValue="date">
          <a-radio-button value="date">
            时间维度
          </a-radio-button>
          <a-radio-button value="team">
            团队维度
          </a-radio-button>
        </a-radio-group>
      </template>
      <oa-date-range-filter
        :start.sync="$searchQuery.start_time"
        :end.sync="$searchQuery.end_time"
        :allowClear="false"
        @change="handlerRouteChange"
      ></oa-date-range-filter>
      <!-- 选择团队 -->
      <crm-organ-picker
        v-model="$searchQuery.organ_id"
        placeholder="选择团队"
        @change="handlerOrganChange"
        v-if="!organDimensionality"
      ></crm-organ-picker>
    </oa-filter-box>
    <oa-alert-intro class="margin-t24 margin-b24">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">上门拜访数</span>
        <span class="val">{{ stat.sum_sale_home_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">有效上门数</span>
        <span class="val">{{ stat.sum_valid_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">无效上门数</span>
        <span class="val">{{ stat.sum_invalid_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">工作室数</span>
        <span class="val">{{ stat.sum_studio_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">俱乐部数</span>
        <span class="val">{{ stat.sum_club_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">A类客户</span>
        <span class="val">{{ stat.sum_brand_level_a_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">B类客户</span>
        <span class="val">{{ stat.sum_brand_level_b_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">C类客户</span>
        <span class="val">{{ stat.sum_brand_level_c_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">D类客户</span>
        <span class="val">{{ stat.sum_brand_level_d_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">F类客户</span>
        <span class="val">{{ stat.sum_brand_level_f_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">电话</span>
        <span class="val">{{ stat.sum_mobile_visit_num }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">微信</span>
        <span class="val">{{ stat.sum_wechat_visit_num }}</span>
      </div>
    </oa-alert-intro>
    <oa-table
      :columns="columns"
      rowKey="id"
      :scroll="{
        x: 1600
      }"
      :dataSource="dataSource"
      :pager="pager"
      :loading="loading"
      @change="handlerTableChange"
      class="margin-b24"
    >
      <span slot="studio_num">
        工作室数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户运营模式为工作室的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="club_num">
        俱乐部数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户运营模式为俱乐部的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="brand_level_a_num">
        A类客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户等级为A的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="brand_level_b_num">
        B类客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户等级为B的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="brand_level_c_num">
        C类客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户等级为C的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="brand_level_d_num">
        D类客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              团队内员工录入的上门拜访记录中拜访的客户等级为D的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="brand_level_f_num">
        F类客户数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的上门拜访记录中拜访的客户等级为F的数量
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="mobile_visit_num">
        电话
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的拜访方式为电话拜访的记录数
            </span>
          </template>
        </a-tooltip>
      </span>
      <span slot="wechat_visit_num">
        微信
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              员工录入的拜访方式为微信拜访的记录数
            </span>
          </template>
        </a-tooltip>
      </span>
    </oa-table>
  </div>
</template>

<script>
import { getVisitOrgan, getVisitOrganDate } from '@/api/stat'
import { organColumns, organDateColumns } from './visit-organ#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      stat: {},
      dataSource: [],
      columns: organDateColumns,
      organDimensionality: false,
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    loading() {
      return this.getVisitOrgan$loading || this.getVisitOrganDate$loading
    }
  },

  async: {
    init() {
      if (this.organDimensionality) {
        return this.getVisitOrgan(this.$searchQuery)
      } else {
        return this.getVisitOrganDate(this.$searchQuery)
      }
    },
    getVisitOrgan(data) {
      return getVisitOrgan(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pager = false
      })
    },
    getVisitOrganDate(data) {
      return getVisitOrganDate(data).then(res => {
        this.stat = res.total_stat
        this.dataSource = res.list
        this.pager = get(res, 'pager', this.pager)
      })
    }
  },

  created() {
    this.getVisitOrganDate(this.$searchQuery)
  },

  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.init()
    next()
  },

  methods: {
    handlerOrganChange(e) {
      console.log('handlerOrganChange', e)
      this.$searchQuery.organ_id = e
      this.handlerRouteChange()
    },
    handlerRouteChange() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    handlerTableChange(pagination, filters, sorter) {
      if (!this.organDimensionality) {
        let order = {
          descend: 1,
          ascend: 2
        }
        if (!sorter.order) this.$searchQuery.time_order = undefined
        else this.$searchQuery.time_order = order[sorter.order]
        this.$searchQuery.p = pagination.current
      }
      this.handlerRouteChange()
    },
    onChange(e) {
      this.$searchQuery.dimensionality = e.target.value
      this.organDimensionality = e.target.value === 'team'
      if (e.target.value === 'date') {
        this.columns = organDateColumns
      } else {
        this.$searchQuery.organ_id = undefined
        this.columns = organColumns
      }
      this.handlerRouteChange()
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
