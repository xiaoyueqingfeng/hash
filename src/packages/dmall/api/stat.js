import axios from '@/axios'

//分销商利润统计
export const statDistributorProfit = query =>
  axios.get('/web/stat/distributor_profit', { params: query })

// 商家利润统计
export const statBrandProfit = query =>
  axios.get('/web/stat/brand_profit', { params: query })
