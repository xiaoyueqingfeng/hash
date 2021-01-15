import axios from '@/axios'

/**
 *
 * 获取所有角色列表
 */
export const getRoleList = query =>
  axios.get('/api/role-config/get-list', {
    params: query
  })

/**
 * 获取某个角色下的可配置权限点
 */
export const getAuthOptions = query =>
  axios.get('/api/role-config/auth-group-list', {
    params: query
  })

/**
 * 获取某个角色的详情和权限配置
 */
export const getAuthSetting = query =>
  axios.get('/api/role-config/auth-group-setting', {
    params: query
  })

/**
 * 获取角色等级列表
 */
export const getAuthLevelList = query =>
  axios.get('/api/role-config/level', {
    params: query
  })

/**
 * 保存编辑角色
 */
export const updateRole = data => axios.post('/api/role-config/edit', data, {})
/**
 * 添加角色
 */
export const addRole = data => axios.post('/api/role-config/add', data, {})

/**
 * 配置角色功能权限
 */
export const updateAuth = data => {
  return axios.post('/api/role-config/auth_set', data, {})
}

/**
 * 删除角色
 */
export const deleteRole = data =>
  axios.post('/api/role-config/delete', data, {})
