import axios from '@/axios'

// 获取供应商列表
export const getSupplierList = query =>
  axios.get('/web/supplier/list', { params: query })
// 获取供应商详细信息
export const getSupplierInfo = query =>
  axios.get('/web/supplier/info', { params: query })
// 新增供应商
export const addSupplier = data => axios.post('/web/supplier/add', data)
// 编辑供应商
export const editSupplier = data => axios.post('/web/supplier/edit', data)
// 删除供应商
export const deleteSupplier = data => axios.post('/web/supplier/delete', data)
