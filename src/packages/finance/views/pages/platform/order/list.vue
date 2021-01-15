<template>
  <oa-panel app>
    <div :class="b()">
      <p class="order-title">客户名称：{{ stat.leads_name }}</p>
      <div :class="b('filter')">
        <div>
          <oa-select
            class="mg-r16"
            placeholder="请选择支付状态"
            @change="handlerSearch"
            :options="mapping.status"
            v-model="$searchQuery.status"
          ></oa-select>
          <oa-date-range-filter
            class="mg-r16"
            :start.sync="$searchQuery.start_date"
            :end.sync="$searchQuery.end_date"
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
          <span class="label">账户总营收</span>
          <span class="val">{{ stat.total_revenue }}</span>
        </div>
        <div class="info-wrap mg-l32">
          <span class="label">总订单量</span>
          <span class="val">{{ stat.total_order_num }}</span>
        </div>
      </oa-alert-intro>
      <div class="content mg-t16">
        <oa-table
          rowKey="id"
          :scroll="{ x: 1500 }"
          :dataSource="dataSource"
          :loading="getOrderList$loading"
          :columns="tableOptions.columns"
          :pager="pager"
          @change="tbOnTableChange"
        ></oa-table>
      </div>
    </div>
  </oa-panel>
</template>

<script>
import { getOrderList } from '@/api/platform'
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
      mapping: {
        status: []
      },
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
    getOrderList() {
      return getOrderList({ ...this.$searchQuery }).then(res => {
        this.stat = get(res, 'info', {})
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
        this.mapping = get(res, 'mapping')
      })
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getOrderList()
    }
  },

  created() {
    this.getOrderList()
  },

  methods: {
    //查询
    handlerSearch() {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1
        }
      })
    },
    //重置
    handlerReset() {
      this.$searchQuery = { p: 1, ps: 20 }
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
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
