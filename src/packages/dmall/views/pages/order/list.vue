<template>
  <div class="order">
    <div class="header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <oa-select
          style="width: 200px"
          class="mg-r8"
          placeholder="选择订单状态"
          v-model="$searchQuery.status"
          :options="orderStatus"
        ></oa-select>
        <div slot="prepend">
          <a-input-search
            enterButton
            placeholder="搜索订单编号"
            v-model="$searchQuery.keywords"
            style="width: 300px"
            @search="tbOnSearchKeywords('keywords', $event)"
          ></a-input-search>
        </div>

        <template slot="actions">
          <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>
      </oa-filter-box>
    </div>
    <div class="content">
      <oa-table
        class="mg-t16"
        rowKey="id"
        :scroll="{ x: 1400 }"
        :columns="tableOptions.columns"
        :dataSource="dataSource"
        :pager="pager"
        :loading="getOrderList$loading"
        @change="tbOnTableChange"
      >
        <template slot="detail" slot-scope="text, record">
          <dmall-table-column-order name="order-detail" :record="record" />
        </template>
        <template slot="order_items" slot-scope="text, record">
          <div v-for="(item, index) in record.order_items" :key="index">
            <span class="goods_name">{{ item.goods_name }}</span>
            <span class="goods_desc">{{ item.goods_spec_desc }}</span>

            <span class="goods_number">*{{ item.goods_number }}</span>
          </div>
        </template>
        <template slot="status_desc" slot-scope="text, record">
          <a-popover v-if="record.status === 5" placement="top">
            <a-icon type="question-circle" />
            <template slot="title">
              <span>退款原因</span>
              <span>
                {{ reasonOptionsFilter(record.refund_info.reason_id) }}
              </span>
            </template>
            <template slot="content">
              <span>退款说明:</span>
              <span>{{ record.refund_info.refund_mark }}</span>
            </template>
          </a-popover>
          <a-popover v-if="record.status === 8" placement="top">
            <a-icon type="question-circle" />
            <template slot="title">
              <span>拒绝原因</span>
              <span>
                {{ record.refund_info.refund_mark }}
              </span>
            </template>
          </a-popover>
          {{ text }}
        </template>
        <template slot="purchaser_type" slot-scope="record">
          <a-tag v-if="record.order_type !== 1" color="blue">
            {{ '分销商' }}
          </a-tag>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-modal-link="{
                name: 'order-ship',
                props: {
                  order_sn: record.order_sn
                },
                on: { done: getOrderList }
              }"
            >
              发货
            </a>
            <a
              v-modal-link="{
                name: 'order-refund',
                props: {
                  order_sn: record.order_sn
                },
                on: { done: getOrderList }
              }"
            >
              退款
            </a>
            <a
              v-modal-link="{
                name: 'order-reject',
                props: {
                  order_sn: record.order_sn
                },
                on: { done: getOrderList }
              }"
            >
              拒绝
            </a>
            <a @click="confirmCancelOrder(record.order_sn)">取消订单</a>
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </div>
</template>
<script>
import { getOrderList, orderCancel } from '@/api/order'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderList',
  mixins: [tableMixins],
  data() {
    return {
      order_status: [], //后端接口文档待定
      dataSource: [],
      searchTypeOption: [
        { label: '手机号', value: 1 },
        { label: '订单编号', value: 2 }
      ],
      searchType: 2,
      pager: {}
    }
  },
  async: {
    getOrderList() {
      return getOrderList(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getOrderList()
  },
  watch: {
    $route(newRoute) {
      this.getOrderList()
    }
  },
  computed: {
    tableOptions,

    ...mapGetters('dmall', ['orderStatus', 'reasonOptions'])
  },
  methods: {
    reasonOptionsFilter(value) {
      let reasonName = ''
      this.reasonOptions.forEach(item => {
        if (value === item.id) reasonName = item.name
      })
      return reasonName
    },
    confirmCancelOrder(order_sn) {
      this.$confirm({
        title: '取消订单',
        content: '是否取消订单？',
        onOk: () => {
          return orderCancel({ order_sn: order_sn }).then(res => {
            this.$message.success('订单取消成功')
            this.getOrderList()
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order {
  background-color: #fff;
  padding: 24px;
  .header {
    display: flex;
  }
  .goods_name {
    margin-right: 4px;
  }
  .goods_desc {
    color: @text-light;
  }
  .goods_number {
    color: @text-light;
  }
}
</style>
