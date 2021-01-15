import axios from '@/axios'
/**
 * 获取角色列表
 */
export const getRoleList = params => axios.get('/role', { params })
/**
 * 新增角色
 */
export const addRole = data => axios.post('/role/add', data)
/**
 * 删除角色
 */
export const deleteRole = data => axios.post('/role/delete', data)
/**
 * 更新角色信息
 */
export const updateRole = data => axios.post('/role/update', data)
/**
 * 更新角色权限点
 */
export const updateRoleAuth = data => axios.post('/role/update_role_auth', data)

/**
 * 获取角色可用平台
 */
export const getRolePlatform = params => axios.get('/role/platform', { params })

/**
 * 获取创建角色属性
 */
export const getCreateRoleFormData = params =>
  axios.get('/role/add_form_data', { params })

/**
 * 获取编辑角色属性
 */
export const getEditRoleFormData = params =>
  axios.get('/role/update_form_data', { params })
