import axios from '@/axios'

/**
 * 模块列表
 */
export const getModuleList = query =>
  axios.get('/api/module/get-list', { params: query })

/**
 * 模块上架
 */
export const setUp = data => axios.post('/api/module/set-up', data)

/**
 * 模块下架
 */
export const setDown = data => axios.post('/api/module/set-down', data)

/**
 * 模块添加
 */
export const add = data => axios.post('/api/module/add', data)

/**
 * 模块编辑表单
 */
export const editForm = query =>
  axios.get('/api/module/edit-form', { params: query })

/**
 * 模块编辑
 */
export const edit = data => axios.post('/api/module/edit', data)

/**
 * 添加/编辑模块搜索权限组
 */
export const getPermissionGroup = data =>
  axios.post('/api/module/get-permission-group', data)
