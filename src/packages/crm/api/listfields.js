import axios from '@/axios'

// 自定字段列表
export const getListFields = query =>
  axios.get('/web/listfields/index', {
    params: query
  })
// 自定字段列表
export const getAddFormData = query =>
  axios.get('/web/listfields/add_form', {
    params: query
  })
// 自定字段列表
export const getEditFormData = query =>
  axios.get('/web/listfields/edit_form', {
    params: query
  })
// 自定字段添加
export const addField = data => axios.post('/web/listfields/add', data, {})
// 自定字段修改
export const editField = data => axios.post('/web/listfields/edit', data, {})
// 自定字段删除
export const deleteField = data =>
  axios.post('/web/listfields/delete', data, {})
