import axios from '@/axios'

//获取资源权限点
export const getPerms = query =>
  axios.get('/api/perms', {
    params: query
  })

//添加资源
export const addResource = data => axios.post('/api/perms/add_resource', data)

//编辑资源
export const editResource = data => axios.post('/api/perms/edit_resource', data)

//添加权限动作点
export const addPermsAction = data => axios.post('/api/perms/add_action', data)

//编辑权限动作点
export const editPermsAction = data =>
  axios.post('/api/perms/edit_action', data)
