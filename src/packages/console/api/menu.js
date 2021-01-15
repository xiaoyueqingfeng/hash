import axios from '@/axios'

// 菜单 权限选项配置模块

/**
 * 获取所有菜单列表
 */
export const getMenuList = query =>
  axios.get('/menu', {
    numberic: ['status', 'type'],
    params: query
  })

/**
 * 新增菜单(权限)
 */
export const addMenu = data => axios.post('/menu/add', data)
/**
 * 删除菜单(权限)
 */
export const deleteMenu = data => axios.post('/menu/delete', data)
/**
 * 更新菜单(权限)
 */
export const updateMenu = data => axios.post('/menu/update', data)

/**
 * 获取菜单(权限)信息
 */
export const getMenuById = query => axios.get('/menu', { params: query })
