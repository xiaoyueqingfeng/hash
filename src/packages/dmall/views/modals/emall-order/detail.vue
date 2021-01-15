<template>
  <oa-page-modal v-model="show">
    <div class="order-detail">
      <div class="order-detail__title">{{ orderDetail.member_name }}</div>
      <div class="order-detail__status">{{ orderDetail.status_text }}</div>
      <div class="order-detail__info">
        <div class="order-detail__refund-info__title mg-b16">基础信息</div>
        <a-row class="mg-b16">
          <a-col :span="8">
            <span class="mg-r8">订单编号</span>
            <span>{{ orderDetail.order_sn }}</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">消费用户</span>
            <span>{{ orderDetail.member_name }}</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">消费用户手机号</span>
            <span>{{ orderDetail.mobile }}</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="8">
            <span class="mg-r8">商品金额</span>
            <span>{{ orderDetail.product_amount }}元</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">优惠券</span>
            <span>{{ orderDetail.coupon_price }}元</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">运费</span>
            <span>{{ orderDetail.shopping_price }}元</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="8">
            <span class="mg-r8">订单实付金额</span>
            <span>{{ orderDetail.order_amount }}元</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">创建时间</span>
            <span>{{ orderDetail.created_time }}</span>
          </a-col>
          <a-col :span="8">
            <span class="mg-r8">付款时间</span>
            <span>{{ orderDetail.pay_time }}</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="8">
            <span class="mg-r8">主订单编号</span>
            <span>{{ orderDetail.master_order_sn }}</span>
          </a-col>
        </a-row>
        <div class="order-detail__ship-info mg-t24 mg-b24">
          <div class="order-detail__ship-info__title mg-b16">商品信息</div>
          <oa-table
            class="mg-t16"
            :scroll="{ x: 1600 }"
            :columns="tableGoodsOptions.columns"
            rowKey="id"
            @change="tbOnTableNoClearSelectChange"
            :pager="pager"
            :dataSource="orderDetail.order_items"
          ></oa-table>
        </div>
        <div class="order-detail__ship-info mg-t24 mg-b24">
          <div class="order-detail__ship-info__title mg-b16">收货信息</div>
          <a-row class="mg-b16">
            <a-col :span="6">
              <span class="mg-r8">收货人</span>
              <span>{{ orderDetail.consignee_name }}</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">运单号</span>
              <span>{{ orderDetail.express_no }}</span>
            </a-col>
          </a-row>
          <a-row class="mg-b16">
            <a-col :span="6">
              <span class="mg-r8">收货人手机号</span>
              <span>{{ orderDetail.consignee_mobile }}</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">物流公司</span>
              <span>{{ orderDetail.express_company }}</span>
            </a-col>
          </a-row>
          <a-row class="mg-b16">
            <a-col :span="12">
              <span class="mg-r8">收货地址</span>
              <span>{{ orderDetail.consignee_address }}</span>
            </a-col>
          </a-row>
        </div>
        <div
          class="order-detail__refund-info"
          v-if="refundDetail.length || orderDetail.status === 5"
        >
          <div class="order-detail__refund-info__title mg-b16">退款信息</div>
          <oa-table
            class="mg-t16"
            :scroll="{ x: 1600 }"
            :columns="tableRefundOptions.columns"
            rowKey="refund_sn"
            :pager="pager"
            :dataSource="refundArray"
          >
            <div slot="refundItems" class="goods-table-col">
              <span class="goods-table-col__item name">商品名称</span>
              <span class="goods-table-col__item num">数量</span>
              <span class="goods-table-col__item price">单价(元)</span>
            </div>
            <template slot="refund_items" slot-scope="text, record">
              <div
                v-for="(item, index) in record.refund_items"
                :key="index"
                class="goods-table-col-value"
              >
                <span class="goods-table-col-value__item name">
                  {{ item.goods_name }}
                </span>
                <span class="goods-table-col-value__item num">
                  {{ item.goods_number }}
                </span>
                <span class="goods-table-col-value__item price">
                  {{ item.goods_price }}
                </span>
              </div>
            </template>
            <template slot="voucher" slot-scope="text">
              <viewer
                class="refund-voucher__img-wapper"
                style="width: 40px; height: 40px"
                :images="text"
              >
                <img
                  style="width: 100%"
                  v-for="(item, index) in text"
                  :key="index"
                  :src="item"
                />
              </viewer>
            </template>
          </oa-table>
        </div>
      </div>
    </div>
  </oa-page-modal>
</template>
<script>
import tableMixins from 'oa-core/mixins/table'
import { getOrderDetail } from '@/api/emall-order'
import { tableGoodsOptions, tableRefundOptions } from './detail#config'
import { get } from 'lodash-es'
import { mapGetters } from 'vuex'

export default {
  name: 'EmallOrderDetail',
  mixins: [tableMixins],
  data() {
    return {
      show: true,
      orderDetail: {},
      refundDetail: {},
      pager: {}
    }
  },
  props: {
    order_sn: {
      type: String,
      required: true
    }
  },
  computed: {
    tableGoodsOptions,
    tableRefundOptions,
    refundArray() {
      return this.refundDetail
    },
    ...mapGetters('dmall', ['showReasonList'])
  },
  async: {
    getOrderDetail() {
      return getOrderDetail({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res
        this.refundDetail = get(res, 'refund_info', {})
      })
    }
  },
  methods: {
    getReasonName(id) {
      const reason = this.showReasonList.find(item => item.id === id)
      return reason ? reason.name : ''
    }
  },
  mounted() {
    this.getOrderDetail()
  }
}
</script>
<style lang="less" scoped>
.order-detail {
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  background: white;
  position: relative;
  &__title {
    font-size: 20px;
    color: @black;
    .mg-b(16px);
  }
  &__status {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 2px solid @border-color;
    text-align: center;
    line-height: 80px;
    color: @black;
  }
  &__ship-info {
    &__title {
      color: @black;
    }
  }
  &__refund-info {
    &__title {
      color: @black;
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
    &__item {
      overflow: hidden;
    }
  }
}
</style>
