import axios from '@/axios'

//品牌列表
export const getBrandList = query =>
  axios.get('/web/platform-applet/brand-list', {
    params: query
  })

//订单列表
export const getOrderList = query =>
  axios.get('/web/platform-applet/order-list', {
    params: query
  })

//提现记录列表
export const getWithdrawList = query =>
  axios.get('/web/platform-applet/withdraw-list', {
    params: query
  })

//提现详情
export const getWithdrawDetail = query =>
  axios.get('/web/platform-applet/withdraw-detail', {
    params: query
  })

//提现通过
export const withdrawConfirm = data =>
  axios.post('/web/platform-applet/withdraw-pass', data, {})

//提现驳回
export const withdrawReject = data =>
  axios.post('/web/platform-applet/withdraw-reject', data, {})

//流水列表
export const getFlowList = query =>
  axios.get('/web/platform-applet/bill-flow-list', {
    params: query
  })
