import axios from '@/axios'

//获取品牌商列表
export const getBankList = query =>
  axios.get('/web/bank/list', { params: query })
//获取快递商列表
export const getExpressList = query =>
  axios.get('/web/express/get_list', { params: query })
