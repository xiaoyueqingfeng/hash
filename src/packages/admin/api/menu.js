import axios from '@/axios'

//获取菜单列表
export const getMenu = query =>
  axios.get('/api/menu-config/get-list', {
    params: query
  })

//添加(子)菜单
export const addMenu = data => axios.post('/api/menu-config/add', data)

//编辑(子)菜单
export const editMenu = data => axios.post('/api/menu-config/edit', data)

//获取单个模板菜单详情
export const getMenuInfo = query =>
  axios.get('/api/menu-config/info', { params: query })

//获取菜单所有可关联权限组
export const getMenuPermGroupList = query =>
  axios.get('/api/menu/get_setting_list', {
    params: query
  })

// 获取单个菜单已经关联权限组
export const getSingleMenuPermGroupList = query =>
  axios.get('/api/menu/perm_groups', {
    params: query
  })

// 更新菜单关联权限组
export const setMenuPermGroupList = data =>
  axios.post('/api/menu/set_perm_groups', data)
