import axios from '@/axios'

export const getPluginList = query =>
  axios.get('/api/plugins', {
    params: query
  })
export const getPluginAddFormData = query =>
  axios.get('/api/plugins/form_data', {
    params: query
  })
export const getPluginEditFormData = query =>
  axios.get('/api/plugins/info', {
    params: query
  })
export const addPlugin = data => axios.post('/api/plugins/add', data, {})
export const editPlugin = data => axios.post('/api/plugins/edit', data, {})
export const editPluginStatus = data =>
  axios.post('/api/plugins/status', data, {})

/**
 * 插件搜索权限组
 */
export const getPermissionGroup = data =>
  axios.post('/api/plugins/get-permission-group', data)
