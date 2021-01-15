import axios from '@/axios'
//获取商品分类列表
export const getCategoryList = query =>
  axios.get('/web/goods-category/list', { params: query })
//获取商品分类列表
export const getCategoryOptions = query =>
  axios.get('/web/goods-category/select_list', { params: query })

//添加商品分类
export const addCategory = data => axios.post('/web/goods-category/add', data)

//修改商品分类
export const updateCategory = data =>
  axios.post('/web/goods-category/edit', data)

//删除商品分类
export const deleteCategory = data =>
  axios.post('/web/goods-category/delete', data)

//获取商品列表
export const getList = query => axios.get('/web/goods/list', { params: query })

//添加商品
export const add = data => axios.post('/web/goods/add', data)

//编辑商品
export const update = data => axios.post('/web/goods/edit', data)
//编辑商品回显
export const updateShow = query =>
  axios.get('/web/goods/edit_form', { params: query })

//删除商品
export const deletes = data => axios.post('/web/goods/delete', data)

//商品上架
export const setUp = data => axios.post('/web/goods/set_up', data)

//商品下架
export const setDown = data => axios.post('/web/goods/set_down', data)

//商品批量上架
export const batchSetUp = data => {
  return axios.post('/web/goods/batch_set_up', data)
}

//商品批量下架
export const batchSetDown = data =>
  axios.post('/web/goods/batch_set_down', data)
// 商品预览
export const preview = query =>
  axios.get('/web/goods/preview', { params: query })
