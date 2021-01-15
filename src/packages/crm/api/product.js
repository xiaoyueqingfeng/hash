import axios from '@/axios'

// 获取产品列表
export const getProductList = query =>
  axios.get('/web/product/list', { params: query })
// 获取产品对应供应商列表
export const getProductSupplierList = query =>
  axios.get('/web/product/supplier-list', {
    params: query
  })
// 获取供应商型号列表
export const getProductModelType = query =>
  axios.get('/web/product/model-list', {
    params: query
  })
// 获取产品详细信息
export const getProductInfo = query =>
  axios.get('/web/product/info', { params: query })
// 新增产品
export const addProduct = data => axios.post('/web/product/add', data)
// 编辑产品
export const editProduct = data => axios.post('/web/product/edit', data)
// 变更产品状态
export const changeSupplierStatus = data =>
  axios.post('/web/product/switch', data)
