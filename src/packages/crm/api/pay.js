import axios from '@/axios'

/**
 * 签约客户列表
 */
export const getPayList = query => axios.get('/web/pay/list', { params: query })

/**
 * 获取签约客户可分配部门列表
 */
export const getOrganList = () => axios.get('/web/pay/get_organ_list')
/**
 * 获取付费用户可分配的销售列表（数据域）
 */
export const getSaleList = query =>
  axios.get('/web/pay/get_sale_list', { params: query })

/**
 * 获取付费用户可分配的电销列表（数据域）
 */
export const getTelSaleList = query =>
  axios.get('/web/pay/get_tel_sale_list', { params: query })
/**
 * 获取硬件销售人员列表
 */
export const getHarwareList = query =>
  axios.get('/web/pay/get_hardware_sale_list', { params: query })
/**
 * 获取付费用户可分配的商服列表（数据域）
 */
export const getServerList = query =>
  axios.get('/web/pay/get_cs_list', { params: query })

/**
 * 付费客户—确认分配销售
 */
export const assignSale = data => axios.post('/web/pay/assign_sale', data)

/**
 * 付费客户—确认分配电销
 */
export const assignTelSale = data =>
  axios.post('/web/pay/assign_tel_sale', data)

/**
 * 付费客户—确认分配硬件销售
 */
export const assignHardwareSale = data =>
  axios.post('/web/pay/assign_hardware_sale', data)
/**
 * 付费客户—批量解绑硬件销售
 */
export const batchUnbindHardware = data =>
  axios.post('/web/pay/batch_unbind_hardware', data)
/**
 * 付费客户—解绑硬件销售
 */
export const unbindHardware = data =>
  axios.post('/web/pay/unbind_hardware', data)
/**
 * 付费客户—分配商运
 */
export const assignServer = data => axios.post('/web/pay/assign_server', data)
/**
 * 付费客户—分配客运
 */
export const assignCustomServer = data =>
  axios.post('/web/pay/assign_custom_operation_server', data)
/**
 * 付费客户—分配客续
 */
export const assignCustomRenewServer = data =>
  axios.post('/web/pay/assign_custom_renew_server', data)
/**
 * 获取当前付费客户的等级标签模型值
 */
export const getUserTag = query =>
  axios.get('/web/pay/get_user_tag', { params: query })

/**
 * 续签-表单
 */
export const getReNewOptions = query =>
  axios.get('/web/pay/renew_sign_form_data', {
    params: query
  })
/**
 * 续签-保存
 */
export const setReNew = data => axios.post('/web/pay/renew_sign', data, {})

/**
 * 停转店-表单
 */
export const getRefundOptions = query =>
  axios.get('/web/pay/refund_form_data', {
    params: query
  })

/**
 * 停转店-保存
 */
export const setRefund = data => axios.post('/web/pay/refund', data, {})

/**
 * 硬件售卖-表单
 */
export const gethardwareOptions = query =>
  axios.get('/web/pay/hardware_form_data', {
    params: query
  })

/**
 * 硬件售卖-保存
 */
export const setSaleHardWare = data => axios.post('/web/pay/hardware', data, {})
// 客户合并里的搜索
export const searchMergeCustom = query =>
  axios.get('/web/pay/search', {
    params: query
  })
// 提交客户合并
export const sendMergeCustom = data => axios.post('/web/pay/merge', data, {})
export const openSystem = data =>
  axios.post('/web/pay/change_open_time', data, {})
/**
 * 获取付费用户可分配的客运列表（数据域）
 */
export const getOperatorList = query =>
  axios.get('/web/pay/get_cs_operator_list', {
    params: query
  })
/**
 * 获取付费用户可分配的客续列表（数据域）
 */
export const getRenewList = query =>
  axios.get('/web/pay/get_cs_renew_list', {
    params: query
  })

export const getContactList = data => axios.post('/web/pay/contact_list', data)
/**
 * 合并leads客户记录列表
 */
export const getMergeRecord = query =>
  axios.get('/web/pay/merge_record', {
    params: query
  })
/**
 * 开通系统信息
 */
export const getSystemInfo = query =>
  axios.get('/web/pay/change_open_time_form_data', {
    params: query
  })
/**
 * 新签/续签/增购获取模块列表
 */
export const getModuleList = query =>
  axios.get('/web/pay/module_list', { params: query })
// Test
export const getTableOptions = query =>
  axios.get('/web/table/options', {
    params: query
  })
// Test
export const setTableOptions = data =>
  axios.post('/web/table/set', data, {
    test: 1
  })
