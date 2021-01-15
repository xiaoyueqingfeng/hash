import axios from '@/axios'

//利润佣金明细
export const getOrderProfitCommissionList = query =>
  axios.get('/web/order/profit_commission', { params: query })
