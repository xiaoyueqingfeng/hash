import axios from '@/axios'

//提现记录列表
export const getWithdrawList = query =>
  axios.get('/web/withdraw/list', { params: query })

//提现详情
export const getWithdrawDetail = query =>
  axios.get('/web/withdraw/detail', { params: query })

//提现通过
export const withdrawConfirm = data =>
  axios.post('/web/withdraw/confirm', data, {})

//提现驳回
export const withdrawReject = data =>
  axios.post('/web/withdraw/reject', data, {})
