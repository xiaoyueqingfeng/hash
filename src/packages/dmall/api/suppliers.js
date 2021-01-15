import axios from '@/axios'

//获取商品分类列表
export const getList = query =>
  axios.get('/web/supplier/list', { params: query })

//添加供应商
export const add = data => axios.post('/web/supplier/add', data)

//编辑供应商
export const update = data => axios.post('/web/supplier/edit', data)

//获取供应商账户信息
export const getBank = query =>
  axios.get('/web/supplier/bank', { params: query })
//获取供应商选择列表
export const getSelectList = query =>
  axios.get('/web/supplier/select_list', { params: query })
export const getRandomAccount = query =>
  axios.get('/web/supplier/random_account', { params: query })

//编辑供应商账户信息
export const updateBank = data => axios.post('/web/supplier/bank_edit', data)

//获取供应商禁用
export const setProhibit = data => axios.post('/web/supplier/prohibit', data)
//获取供应商禁用
export const setEnable = data => axios.post('/web/supplier/enable', data)

// 供应商获取手机验证码
export const setSysPhoneCode = query =>
  axios.post('/web/sys/phone_code', { params: query })
