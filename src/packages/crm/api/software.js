import axios from '@/axios'

export const getSoftwareList = query =>
  axios.get('/web/software/list', { params: query })

export const getRoleAuth = query =>
  axios.get('/web/version-menu/gray-brand-perm', { params: query })

export const getRoleBrandAuth = query =>
  axios.get('/web/software/role_brand_auth', { params: query })

export const getBatchAuthAdd = data =>
  axios.post('/web/software/batch_auth_add', data, {})

export const getAuthAdd = data =>
  axios.post('/web/version-menu/set-gray-brand', data, {})

/**
 * 系统服务
 */
export const getSystemService = query =>
  axios.get('/web/software/system_service', {
    params: query
  })
// 延期-计算有效期
export const calcExpiredTime = data =>
  axios.post('/web/software/calc_expired_time', data)

// 延期-查询对应门店相关数据
export const delaySystemFormData = query =>
  axios.get('/web/software/delay_system_form_data', {
    params: query
  })

// 门店延期
export const delaySystem = data =>
  axios.post('/web/software/delay_system', data)

/**
 * 增购表单
 */
export const getBuyMoreOptions = query =>
  axios.get('/web/software/buy_more_form_data', {
    params: query
  })

/**
 * 增购保存
 */
export const setBuyMore = data => axios.post('/web/software/buy_more', data, {})

/**
 * 系统有效期修改-表单
 */
export const systemExpiredEditForm = query =>
  axios.get('/web/software/system_expired_edit_form', { params: query })

/**
 * 系统有效期修改
 */
export const systemExpiredEdit = data =>
  axios.post('/web/software/system_expired_edit', data)
