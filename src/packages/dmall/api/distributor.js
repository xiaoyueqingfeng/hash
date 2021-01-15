import axios from '@/axios'
//获取商品分类列表
export const getList = query =>
  axios.get('/web/distributor/list', { params: query })
//分销商等级编辑回显
export const getDistributorLevel = query =>
  axios.get('/web/distributor/level', { params: query })

//添加供应商
export const add = data => axios.post('/web/distributor/add', data)

//分销商等级信息编辑
export const update = data => axios.post('/web/distributor/level_edit', data)

//获取供应商账户信息
export const getBank = query =>
  axios.get('/web/distributor/bank', { params: query })
//购买记录
export const getBuyLog = query =>
  axios.get('/web/distributor/level_order', { params: query })

//编辑供应商账户信息
export const updateBank = data => axios.post('/web/distributor/bank_edit', data)

// 查看分销商
export const getInfo = query =>
  axios.get('/web/distributor/info', { params: query })

// 查看分销商选择列表
export const getSelectList = query =>
  axios.get('/web/distributor/select_list', { params: query })
// 查看分销商选择列表
export const getWithdraw_log = query =>
  axios.get('/web/distributor/Withdraw_log', { params: query })

//获取分销商禁用B
export const setProhibit = data => axios.post('/web/distributor/prohibit', data)
//获取分销商禁用B
export const setEnable = data => axios.post('/web/distributor/enable', data)

// 供应商获取手机验证码
export const setSysPhoneCode = query => axios.post('/sys/phone_code', data)
