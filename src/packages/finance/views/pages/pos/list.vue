<template>
  <div :class="b()">
    <div :class="b('filter')">
      <div>
        <a-input
          v-model="$searchQuery.brand_name"
          placeholder="请输入品牌名称"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.shop_name"
          placeholder="请输入场馆名称"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.terminal_no"
          placeholder="请输入设备ID"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <oa-date-range-filter
          class="mg-r16"
          :start.sync="$searchQuery.start_time"
          :end.sync="$searchQuery.end_time"
          :placeholder="['开始时间', '结束时间']"
        ></oa-date-range-filter>
        <oa-button @click="handlerSearch" type="primary">查询</oa-button>
      </div>
    </div>
    <oa-alert-intro class="mg-t16 mg-b16">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">三体收益</span>
        <span class="val">{{ stat.styd_revenue }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">通联收益</span>
        <span class="val">{{ stat.allin_pay_revenue }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">总手续费</span>
        <span class="val">{{ stat.service_fee }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">商家实际营收</span>
        <span class="val">{{ stat.real_revenue }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">商家总营收</span>
        <span class="val">{{ stat.total_revenue }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">总退款</span>
        <span class="val">{{ stat.total_refund }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">订单数</span>
        <span class="val">{{ stat.order_total }}</span>
      </div>
    </oa-alert-intro>
    <div class="content mg-t16">
      <oa-table
        rowKeys="id"
        :scroll="{ x: 1500 }"
        :dataSource="dataSource"
        :loading="getPosFinanceList$loading"
        :columns="tableOptions.columns"
        :pager="pager"
        @change="tbOnTableChange"
      ></oa-table>
    </div>
  </div>
</template>

<script>
import { getPosFinanceTotal, getPosFinanceList } from '@/api/pos'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { get } from 'lodash-es'
export default {
  name: 'pos-index-manage',

  mixins: [tableMixins],

  bem: {
    b: 'pos-index-add'
  },

  data() {
    return {
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      },
      stat: {}
    }
  },

  computed: {
    tableOptions
  },

  async: {
    getPosFinanceTotal() {
      return getPosFinanceTotal().then(res => {
        this.stat = res.info
      })
    },
    getPosFinanceList() {
      return getPosFinanceList({ ...this.$searchQuery }).then(res => {
        this.pager = res.pager
        this.dataSource = res.list
      })
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getPosFinanceTotal()
      this.getPosFinanceList()
    }
  },

  created() {
    this.getPosFinanceTotal()
    this.getPosFinanceList()
  },

  methods: {
    //查询
    handlerSearch() {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1,
          keywords: ''
        }
      })
    },
    //重置
    handlerReset() {
      this.skuList = []
      this.skuDisabled = true
      this.$searchQuery = { mode: 'filter', p: 1, ps: 20 }
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-package-manage {
  padding: 24px;
  background-color: #fff;
  &__filter {
    display: flex;
    justify-content: space-between;
    .search {
      width: 300px;
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
</style>
