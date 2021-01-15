import axios from '@/axios'

//订单记录
export const getOrderList = query =>
  axios.get('/web/emall-order/list', { params: query })

//订单详情
export const getOrderDetail = query =>
  axios.get('/web/emall-order/detail', { params: query })
//订单操作展示
export const getOrderInfo = query =>
  axios.get('/web/emall-order/order_info', { params: query })
//订单操作展示
export const getOrderRefundInfo = query =>
  axios.get('/web/emall-order/apply_refund_show', { params: query })
//订单退款审核展示
export const getOrderRefundShow = query =>
  axios.get('/web/emall-order/refund_show', { params: query })

//订单发货
export const orderSendOutGoods = data =>
  axios.post('/web/emall-order/send_out_goods', data)
//订单发货
export const getRefundAmount = data =>
  axios.post('/web/emall-order/get_refund_amount', data)

//订单退款
export const orderRefund = data =>
  axios.post('/web/emall-order/apply_refund', data)
//订单同意退款
export const orderCheckedRefund = data =>
  axios.post('/web/emall-order/accept_refund', data)

//拒绝退款
export const orderRefusalRefund = data =>
  axios.post('/web/emall-order/reject_refund', data)

//取消订单
export const orderCancel = data => axios.post('/web/emall-order/cancel', data)

//退款记录列表
export const orderRefundList = query =>
  axios.get('/web/emall-order/refund_list', { params: query })
