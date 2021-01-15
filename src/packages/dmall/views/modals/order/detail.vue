<template>
  <oa-page-modal v-model="show">
    <div class="order-detail">
      <div class="order-detail__title">{{ orderDetail.member_name }}</div>
      <div class="order-detail__status">{{ orderDetail.status_text }}</div>
      <div class="order-detail__info">
        <div class="order-detail__refund-info__title mg-b16">基础信息</div>
        <a-row class="mg-b16">
          <a-col :span="6">
            <span class="mg-r8">订单编号</span>
            <span>{{ orderDetail.order_sn }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">消费用户</span>
            <span>{{ orderDetail.member_name }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">商品拿货价</span>
            <span>{{ orderDetail.total_stock_price }}元</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="6">
            <span class="mg-r8">消费用户手机号</span>
            <span>{{ orderDetail.mobile }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">订单拿货金额</span>
            <span>{{ orderDetail.total_stock_price }}元</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="6">
            <span class="mg-r8">分销商</span>
            <span>{{ orderDetail.distributor_name }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">订单利润</span>
            <span>{{ orderDetail.distributor_profit }}元</span>
          </a-col>
        </a-row>
        <a-row class="mg-b16">
          <a-col :span="6">
            <span class="mg-r8">订单金额</span>
            <span>{{ orderDetail.order_amount }}元</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">分销商等级</span>
            <span>{{ orderDetail.distributor_level_name }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">付款时间</span>
            <span>{{ orderDetail.pay_time }}</span>
          </a-col>
          <a-col :span="6">
            <span class="mg-r8">创建时间</span>
            <span>{{ orderDetail.created_time }}</span>
          </a-col>
        </a-row>
        <div class="order-detail__ship-info mg-t24 mg-b24">
          <div class="order-detail__ship-info__title mg-b16">商品信息</div>
          <oa-table
            class="mg-t16"
            :scroll="{ x: 1600 }"
            :columns="tableOptions.columns"
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
          v-if="refundDetail.refund_sn || orderDetail.status === 5"
        >
          <div class="order-detail__refund-info__title mg-b16">退款信息</div>
          <a-row class="mg-b16">
            <a-col :span="6">
              <span class="mg-r8">退款单号</span>
              <span>{{ refundDetail.refund_sn }}</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">退款状态</span>
              <span>{{ refundDetail.status_desc }}</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">发起退款时间</span>
              <span>{{ refundDetail.refund_time }}</span>
            </a-col>
          </a-row>
          <a-row class="mg-b16">
            <a-col :span="6">
              <span class="mg-r8">退款金额</span>
              <span>{{ refundDetail.refund_money }}元</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">退款操作人</span>
              <span>{{ refundDetail.operator_name }}</span>
            </a-col>
            <a-col :span="6">
              <span class="mg-r8">退款完成时间</span>
              <span>{{ refundDetail.end_time }}</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <span>
                图片：
                <viewer :images="refundDetail.voucher">
                  <template v-for="(item, index) in refundDetail.voucher">
                    <img :src="item" alt="退款凭证" :key="index" width="70" />
                  </template>
                </viewer>
              </span>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </oa-page-modal>
</template>
<script>
import tableMixins from 'oa-core/mixins/table'
import { getOrderDetail } from '@/api/order'
import { tableOptions } from './detail#config'
import { get } from 'lodash-es'

export default {
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
    tableOptions
  },
  async: {
    getOrderDetail() {
      return getOrderDetail({ order_sn: this.order_sn }).then(res => {
        this.orderDetail = res
        this.refundDetail = get(res, 'refund_info', {})
      })
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
}
</style>
