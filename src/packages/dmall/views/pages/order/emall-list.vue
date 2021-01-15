<template>
  <div class="order">
    <div class="header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <oa-select
          style="width: 200px"
          class="mg-r8"
          placeholder="选择订单状态"
          v-model="$searchQuery.status"
          :options="emallOrderStatus"
        ></oa-select>
        <div slot="prepend">
          <oa-select
            v-model="searchType"
            :options="searchTypeOption"
          ></oa-select>
          <a-input-search
            v-if="searchType === 2"
            enterButton
            placeholder="搜索订单编号"
            v-model="$searchQuery.keywords"
            style="width: 300px"
            @search="tbOnSearchKeywords('keywords', $event)"
          ></a-input-search>
          <a-input-search
            v-else
            enterButton
            placeholder="搜索手机号"
            v-model="$searchQuery.mobile"
            style="width: 300px"
            @search="tbOnSearchKeywords('mobile', $event)"
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
          <dmall-table-column-order
            name="emall-order-detail"
            :record="record"
          />
        </template>
        <div slot="goodsItems" class="goods-table-col">
          <span class="goods-table-col__item name">商品名称</span>
          <span class="goods-table-col__item num">数量</span>
          <span class="goods-table-col__item price">单价(元)</span>
          <span class="goods-table-col__item status">售后状态</span>
        </div>
        <template slot="order_items" slot-scope="text, record">
          <div
            v-for="(item, index) in record.order_items"
            :key="index"
            class="goods-table-col-value"
          >
            <span class="goods-table-col-value__item name">
              {{ item.goods_name }}
              <div class="goods_desc">{{ item.goods_spec_desc }}</div>
            </span>
            <span class="goods-table-col-value__item num">
              {{ item.goods_number }}
            </span>
            <span class="goods-table-col-value__item price">
              {{ item.goods_price }}
            </span>
            <span class="goods-table-col-value__item status">
              {{ item.refund_status }}
            </span>
          </div>
        </template>
        <template slot="goods_price" slot-scope="text, record">
          <div v-for="(item, index) in record.order_items" :key="index">
            <span class="goods_price">{{ item.goods_price }}</span>
          </div>
        </template>
        <template slot="after-sale" slot-scope="text, record">
          <div v-for="(item, index) in record.order_items" :key="index">
            <span class="goods_refund-status">{{ item.refund_status }}</span>
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
        <template slot="order_price" slot-scope="text, record">
          <div class="order_price">订单金额: {{ record.order_amount }}</div>
          <div class="goods_price">商品总额: {{ record.product_amount }}</div>
          <div class="goods_bill">运费: {{ record.shipping_price }}</div>
          <div class="goods_coupon">优惠券: {{ record.coupon_price }}</div>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-modal-link="{
                name: 'emall-order-ship',
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
                name: 'emall-order-refund',
                props: {
                  order_sn: record.order_sn
                },
                on: { done: getOrderList }
              }"
            >
              主动退款
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </div>
</template>
<script>
import { getOrderList, orderCancel } from '@/api/emall-order'
import { tableOptions } from './emall-list#config'
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
      searchType: 2,
      searchTypeOption: [
        { name: '手机号', id: 1 },
        { name: '订单编号', id: 2 }
      ],
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
    ...mapGetters('dmall', ['emallOrderStatus', 'reasonOptions'])
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
<style lang="less">
.oa-filter-box__search {
  display: flex;
  align-items: center;
}
</style>
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
  .goods-table-col {
    display: flex;
    justify-content: space-between;
    .name {
      flex: none;
      width: 258px;
      overflow: hidden;
    }
    .num {
      flex: none;
      width: 32px;
    }
    .price {
      flex: none;
      width: 32px;
    }
    .status {
      flex: none;
      width: 100px;
    }
    &__item {
      margin-left: 16px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .goods-table-col-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    .name {
      flex: none;
      width: 258px;
      overflow: hidden;
    }
    .num {
      flex: none;
      width: 32px;
    }
    .price {
      flex: none;
      width: 32px;
    }
    .status {
      flex: none;
      width: 100px;
    }
    &__item {
      overflow: hidden;
    }
  }
}
</style>
