<template>
  <oa-panel app>
    <a-input-search
      enterButton
      placeholder="搜索订单编号、商品名称"
      v-model="$searchQuery.keywords"
      style="width: 300px"
      @search="tbOnSearchKeywords('keywords', $event)"
    ></a-input-search>
    <div class="refund">
      <oa-table
        class="mg-t16"
        rowKey="refund_sn"
        :columns="tableOptions.columns"
        :dataSource="dataSource"
        :pager="pager"
        :loading="getRefundList$loading"
        @change="tbOnTableChange"
      >
        <template slot="detail" slot-scope="text, record">
          <dmall-table-column-order
            name="emall-order-detail"
            :record="record"
          ></dmall-table-column-order>
        </template>
        <div slot="refundItems" class="goods-table-col">
          <span class="goods-table-col__item name">商品名称</span>
          <span class="goods-table-col__item num">数量</span>
          <span class="goods-table-col__item price">价格(元)</span>
        </div>
        <template slot="refund_items" slot-scope="text, record">
          <div
            v-for="(item, index) in record.refund_items"
            :key="index"
            class="goods-table-col-value"
          >
            <span class="goods-table-col-value__item name">
              {{ item.goods_name }}
              <div class="goods-table-col-value__item status">
                {{ item.goods_spec_desc }}
              </div>
            </span>
            <span class="goods-table-col-value__item num">
              {{ item.goods_number }}
            </span>
            <span class="goods-table-col-value__item price">
              {{ item.goods_price }}
            </span>
          </div>
        </template>
        <template slot="unit_price" slot-scope="text, record">
          <div v-for="(item, index) in record.refund_items" :key="index">
            <span class="goods_price">{{ item.goods_price }}</span>
          </div>
        </template>
        <template slot="goods_num" slot-scope="text, record">
          <div v-for="(item, index) in record.refund_items" :key="index">
            <span class="goods_price">{{ item.goods_number }}</span>
          </div>
        </template>
        <template slot="voucher" slot-scope="text">
          <viewer
            class="refund-voucher__img-wapper"
            style="width: 40px; height: 40px"
            :images="text"
          >
            <img v-for="(item, index) in text" :key="index" :src="item" />
          </viewer>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-modal-link="{
                name: 'emall-order-reject',
                props: {
                  refund_sn: record.refund_sn
                },
                on: { done: getRefundList }
              }"
            >
              拒绝退款
            </a>
            <a
              v-modal-link="{
                name: 'emall-order-check-refund',
                props: {
                  refund_sn: record.refund_sn
                },
                on: { done: getRefundList }
              }"
            >
              同意退款
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </oa-panel>
</template>
<script>
import { orderRefundList } from '@/api/emall-order'
import { tableOptions } from './emall-refund#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'

export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getRefundList() {
      return orderRefundList(this.$searchQuery).then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getRefundList()
  },
  watch: {
    $route(newRoute) {
      this.getRefundList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
<style lang="less" scoped>
.refund {
  .goods_name {
    margin-right: 4px;
  }
  .goods_desc {
    color: @text-light;
  }
  .goods_number {
    color: @text-light;
  }
  .refund-voucher {
    &__img-wapper {
      display: flex;
      width: 40px;
      height: 40px;
      margin-right: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
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
      color: @text-light;
    }
    &__item {
      overflow: hidden;
    }
  }
}
</style>
