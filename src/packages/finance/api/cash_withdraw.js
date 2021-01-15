import axios from '@/axios'

//利润佣金明细
export const getCashWithdrawList = query =>
  axios.get('/web/cash-withdraw/list', { params: query })

//分销商提现记录列表
export const getCashWithdrawInfo = query =>
  axios.get('/web/cash-withdraw/info', { params: query })

//分销商提现通过
export const cashWithdrawSetPass = data =>
  axios.post('/web/cash-withdraw/set_pass', data)

//分销商驳回
export const cashWithdrawSetReject = data =>
  axios.post('/web/cash-withdraw/set_reject', data)
