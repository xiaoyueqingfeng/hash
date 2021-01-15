import axios from '@/axios'

/**
 * 获取潜在私海客户
 */
export const getPotentialPrivateList = query =>
  axios.get('/web/potential/private_sea_list', {
    params: query
  })
/**
 * 潜在公海列表
 */
export const getPotentialPublicList = query =>
  axios.get('/web/potential/public_sea_list', {
    params: query
  })
/**
 * 潜在无效客户
 */
export const getPotentialInvilidList = query =>
  axios.get('/web/potential/invalid_list', {
    params: query
  })
/**
 * 获取新签信息
 */
export const getNewSignOptions = query =>
  axios.get('/web/potential/new_sign_form_data', { params: query })

/**
 * 确认新签
 */
export const setNewSign = data =>
  axios.post('/web/potential/new_sign', data, {})

/**
 * 获取潜在客户可分配部门列表
 */
export const getOrganList = () => axios.get('/web/potential/get_organ_list')
/**
 * 获取潜客可分配的销售列表（数据域）
 */
export const getSaleList = query =>
  axios.get('/web/potential/get_sale_list', { params: query })

/**
 * 获取潜客可分配的电销列表（数据域）
 */
export const getTelSaleList = query =>
  axios.get('/web/potential/get_tel_sale_list', { params: query })
/**
 * 潜在客户私海—分配销售
 */
export const assignSale = data => axios.post('/web/potential/assign_sale', data)
/**
 * 潜在客户私海—分配销售
 */
export const assignTelSale = data =>
  axios.post('/web/potential/assign_tel_sale', data)

/**
 * 潜在客户—放弃
 */
export const giveUp = data => axios.post('/web/potential/give_up', data)

/**
 * 潜在客户—转面销原因
 */
export const getTranslateNormalSaleReason = () =>
  axios.get('/web/potential/translate_normal_sale_reason')

/**
 * 潜在客户—转面销
 */
export const translateNormalSale = data =>
  axios.post('/web/potential/translate_normal_sale', data)

/**
 * 潜在客户—转公海原因
 */
export const getTranslatePublicSeaReason = () =>
  axios.get('/web/potential/translate_public_sea_reason')

/**
 * 潜在客户—转公海
 */
export const translatePublicSea = data =>
  axios.post('/web/potential/translate_public_sea', data)

/**
 * 潜在客户—转主管原因
 */
export const getTranslateManagerReason = () =>
  axios.get('/web/potential/translate_manager_reason')

/**
 * 潜在客户—转主管
 */
export const translateManager = data =>
  axios.post('/web/potential/translate_manager', data)

/**
 * 潜在客户删除
 */
export const del = data => axios.post('/web/potential/delete', data)

/**
 * 潜在客户—领取
 */
export const receive = data => axios.post('/web/potential/receive', data)

/**
 * 潜在客户—还原
 */
export const recovery = data => axios.post('/web/potential/recovery', data)

/**
 * 断约客户 列表
 */
export const getBreakList = query =>
  axios.get('/web/potential/public_break_list', { params: query })

/**
 * 强开客户列表
 */
export const getForceList = query =>
  axios.get('/web/potential/public_force_list', { params: query })

/**
 * 获取当前潜客的等级标签模型值
 */
export const getUserTag = query =>
  axios.get('/web/potential/get_user_tag', { params: query })

/**
 * 设置潜客的等级标签
 */
export const setUserTag = data =>
  axios.post('/web/potential/set_user_tag', data)

/**
 * 更换运营模式
 */
export const changeUserWorkModel = data =>
  axios.post('/web/potential/change_work_model', data)

/**
 * 获取客户名称
 */
export const getUserName = query =>
  axios.get('/web/potential/edit_form_data', { params: query })

/**
 * 设置客户名称
 */
export const changeUserName = data => axios.post('/web/potential/edit', data)

/**
 * 更换运营模式-表单信息
 */
export const changeUserWorkModelInfo = query =>
  axios.get('/web/potential/change_work_model_form_data', { params: query })
