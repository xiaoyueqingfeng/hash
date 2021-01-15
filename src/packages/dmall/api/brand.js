import axios from '@/axios'
//获取品牌商列表
export const getList = query => axios.get('/web/brand/list', { params: query })

//账户手机号绑定
export const bindPhone = data => axios.post('/web/brand/bind_phone', data)

//账户手机号编辑回显
export const phoneInfo = query =>
  axios.post('/web/brand/phone', { params: query })

//银行账户信息
export const getBank = query => axios.get('/web/brand/bank', { params: query })

//编辑银行账户信息
export const updateBank = data => axios.post('/web/brand/bank_edit', data)

// 品牌商结算记录
export const settlementInfo = query =>
  axios.get('/web/brand/settlement', { params: query })

// 商家结算
export const setSettlement = data => axios.post('/web/brand/settl', data)
// 创建合伙人
export const add = data => axios.post('/web/brand/create', data)
