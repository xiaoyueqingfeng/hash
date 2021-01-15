import axios from '@/axios'

/**
 * 版本列表
 */
export const getVersionList = query =>
  axios.get('/api/version', {
    params: query
  })
export const getOtherVersionList = query =>
  axios.get('/api/version/get_list', {
    params: query
  })
export const saveVersion = data => axios.post('/api/tooltips/add', data, {})

/**
 * 获取某个版本的详情
 */
export const getVersionInfo = query =>
  axios.get('/api/version/info', {
    params: query,
    numberic: ['is_sale', 'system_cat', 'system_type']
  })

/**
 * 获取可配置的功能点
 */
export const getSettingOptions = query =>
  axios.get('/api/version/get_setting_list', {
    params: query
  })

/**
 * 获取某个版本的功能配置
 */
export const getSetting = query =>
  axios.get('/api/version/get_setting', {
    params: query
  })

/**
 * 保存某个版本的功能配置
 */
export const updateSetting = data =>
  axios.post('/api/version/setting', data, {})

/**
 * 获取初始化配置
 */
export const getInitConfig = query =>
  axios.get('/api/version/config', {
    params: query
  })
/**
 * 设置初始化配置
 */
export const setInitConfig = data => axios.post('/api/version/set_config', data)
/**
 * 获取初始化配置模板
 */
export const getInitConfigTemplate = query =>
  axios.get('/api/version/config_template', {
    params: query
  })
/**
 * 获取初始化配置详情
 */
export const getInitConfigInfo = query =>
  axios.get('/api/version/config_info', {
    params: query
  })

/**
 * 创建版本
 */
export const addVersion = data => axios.post('/api/version/version_add', data)

/**
 * 编辑版本
 */
export const editVersion = data => axios.post('/api/version/version_edit', data)

/**
 * 创建版本表单
 */
export const versionAddForm = query =>
  axios.get('/api/version/version_add_form', { params: query })
/**
 * 编辑版本表单
 */
export const versionEditForm = query =>
  axios.get('/api/version/version_edit_form', { params: query })

/**
 * 版本下菜单列表
 */
export const getMenuList = query =>
  axios.get('/api/version/get-menu-list', { params: query })

/**
 * 版本下添加(子)菜单
 */
export const versionAddMenu = data => axios.post('/api/version/add-menu', data)

/**
 * 版本下编辑（子）菜单表单
 */
export const getVersionMenuInfo = query =>
  axios.get('/api/version/edit-menu-form', { params: query })

/**
 * 版本下编辑（子）菜单
 */
export const editVersionMenu = data =>
  axios.post('/api/version/edit-menu', data)

/**
 * 版本下删除菜单
 */
export const deleteVersionMenu = data =>
  axios.post('/api/version/delete-menu', data)

/**
 * 版本下搜索菜单
 */
export const getVersionMenuList = query =>
  axios.get('/api/version/version-menu-list', { params: query })
/**
 * 版本下权限组编辑表单
 */
export const getMenuPermDetail = query =>
  axios.get('/api/version/edit-menu-perm-form', { params: query })

/**
 * 版本下编辑权限组
 */
export const editMenuPerm = data =>
  axios.post('/api/version/edit-menu-perm', data)

/**
 * 版本下灰度权限组表单
 */
export const getMenuGrayPermDetail = query =>
  axios.get('/api/version/edit-menu-grayscale-perm-form', {
    params: query
  })

/**
 * 版本下编辑灰度权限组
 */
export const editMenuGrayPerm = data =>
  axios.post('/api/version/edit-menu-grayscale-perm', data)

/**
 * 版本下搜索权限组
 */
export const getPermGroupList = query =>
  axios.get('/api/version/perm-group-list', { params: query })
