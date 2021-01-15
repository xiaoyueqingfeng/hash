import axios from '@/axios'

//订单记录
export const getOrderList = query =>
  axios.get('/web/order/list', { params: query })

//订单详情
export const getOrderDetail = query =>
  axios.get('/web/order/detail', { params: query })
//订单操作展示
export const getOrderInfo = query =>
  axios.get('/web/order/order_info', { params: query })

//订单发货
export const orderSendOutGoods = data =>
  axios.post('/web/order/send_out_goods', data)

//订单退款
export const orderRefund = data => axios.post('/web/order/refund', data)

//拒绝退款
export const orderRefusalRefund = data =>
  axios.post('/web/order/refusal_refund', data)

//取消订单
export const orderCancel = data => axios.post('/web/order/cancel', data)

//退款记录列表
export const orderRefundList = query =>
  axios.get('/web/order/refund_list', { params: query })
