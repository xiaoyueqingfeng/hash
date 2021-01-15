import axios from '@/axios'

// 自定字段列表
export const getList = query =>
  axios.get('/web/list/index', {
    params: query
  })
// 自定字段列表基础信息
export const getBaseSetFieldsForm = query =>
  axios.get('/web/list/set_fields_form', {
    params: query
  })
// 设置列表字段
export const setFields = data => axios.post('/web/list/set_fields', data, {})
// 获取用户设置的列字段
export const getUserFieldsForm = query =>
  axios.get('/web/list/get_user_fields', {
    params: query
  })
// 设置用户列表展示字段
export const setUserFields = data =>
  axios.post('/web/list/set_user_fields', data, {})
// 用户设置列表展示字段表单数据
export const getUserSetFieldsForm = data =>
  axios.post('/web/list/set_user_fields_form', data, {})
