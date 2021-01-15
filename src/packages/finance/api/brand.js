import axios from '@/axios'

//商家结算记录
export const getBrandSettlementList = query =>
  axios.get('/web/settlement/settlement', { params: query })

//账户信息
export const getBrandBank = query =>
  axios.get('/web/settlement/settlement_bank', { params: query })
//商家结算
export const brandSettl = data => axios.post('/web/settlement/settl', data)
