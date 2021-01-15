import axios from '@/axios'

//获取pos机统计数据
export const getPosFinanceTotal = query =>
  axios.get('/web/pos/finance-total', { params: query })
//获取pos机流水列表
export const getPosFinanceList = query =>
  axios.get('/web/pos/finance-list', { params: query })
