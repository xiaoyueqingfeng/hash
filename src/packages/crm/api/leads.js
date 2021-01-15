import axios from '@/axios'

/**
 * leads私海列表
 */
export const getLeadsPrivateList = query =>
  axios.get('/web/leads/private_sea_list', {
    params: query
  })
/**
 * leads公海列表
 */
export const getLeadsPublicList = query =>
  axios.get('/web/leads/public_sea_list', {
    params: query
  })
/**
 * leads无效列表
 */
export const getLeadsInvilidList = query =>
  axios.get('/web/leads/invalid_list', {
    params: query
  })

/**
 * 获取leads可分配部门列表
 */
export const getOrganList = () => axios.get('/web/leads/get_organ_list')
/**
 * 获取leads可分配的销售列表（数据域）
 */
export const getSaleList = query =>
  axios.get('/web/leads/get_sale_list', {
    params: query
  })

/**
 * 获取leads可分配的电销列表（数据域）
 */
export const getTelSaleList = query =>
  axios.get('/web/leads/get_tel_sale_list', {
    params: query
  })

/**
 *
 * leads私海—分配销售
 */
export const assignSale = data => axios.post('/web/leads/assign_sale', data)

/**
 *
 * leads私海—分配电销
 */
export const assignTelSale = data =>
  axios.post('/web/leads/assign_tel_sale', data)

/**
 * leads私海—放弃原因
 */
export const getGiveUpReason = () => axios.get('/web/leads/give_up_reason')

/**
 * leads私海—放弃
 */
export const giveUp = data => axios.post('/web/leads/give_up', data)

/**
 * leads私海—转面销原因
 */
export const getTranslateNormalSaleReason = () =>
  axios.get('/web/leads/translate_normal_sale_reason')

/**
 * leads私海—转面销
 */
export const translateNormalSale = data =>
  axios.post('/web/leads/translate_normal_sale', data)

/**
 * leads—删除
 */
export const del = data => axios.post('/web/leads/delete', data)

/**
 * leads公海—领取
 */
export const receive = data => axios.post('/web/leads/receive', data)

/**
 * leads—还原
 */
export const recovery = data => axios.post('/web/leads/recovery', data)

/**
 * leads私海—转化等级和标签列表
 */
export const getTranslateTag = query =>
  axios.get('/web/leads/get_translate_form', {
    params: query
  })

/**
 * leads私海—转化
 */
export const translate = data => axios.post('/web/leads/translate', data, {})

/**
 * 获取品牌等级 标签选项
 */
export const getLevelTag = query =>
  axios.get('/web/leads/level_tag_form', {
    params: query
  })
export const getDetailHeaderInfo = query =>
  axios.get('/web/leads/header_detail', {
    params: query
  })
// export const getDetailDetailInfo = (data) =>axios.post('/leads/detail', data, {mock: {}})
export const getDetailInfo = query =>
  axios.get('/web/leads/detail', {
    params: query
  })
export const getDetailShopInfo = query =>
  axios.get('/web/leads/shop_info', {
    params: query
  })
export const getDetailVisitInfo = query =>
  axios.get('/web/leads/detail_visit', {
    params: query
  })
export const getDetailContactInfo = query =>
  axios.get('/web/leads/detail_contact', {
    params: query
  })
// 添加服务记录获取联系人等信息
export const getDetailPayrecordInfo = query =>
  axios.get('/web/leads/detail_pay', {
    params: query
  })
// 变动记录
export const getDetailChangeInfo = query =>
  axios.get('/web/leads/detail_operation_log', {
    params: query
  })
// 客户查重
export const searchConflictInfo = query =>
  axios.get('/web/leads/check_duplicate_list', {
    params: query
  })
// 获取注意事项列表 。。。
export const getDetailMentionInfo = query =>
  axios.get('/web/leads/detail_attention', {
    params: query
  })
export const addDetailMentionInfo = data =>
  axios.post('/web/leads/detail_attention_add', data, {})
// 获取添加客户的其他信息
export const getAddCustomerOtherInfo = query =>
  axios.get('/web/leads/add_form_data', {
    params: query
  })
// 编辑获取信息
export const getEditCustomerOtherInfo = query =>
  axios.get('/web/leads/edit_form_data', {
    params: query
  })
// export const searchConflictInfo = (data) => axios.post('/web/leads/add', data, {})
export const addCustomer = data => axios.post('/web/leads/add', data, {})
export const editCustomer = data => axios.post('/web/leads/edit', data, {})
// 客户详情服务记录列表
export const getDetailDetailServeInfo = query =>
  axios.get('/web/leads/detail_service', {
    params: query
  })
export const getPluginList = query =>
  axios.get('/web/leads/detail_plugins', {
    params: query
  })
// leads导出
export const exportLeads = data => axios.post('/web/leads/export', data, {})
// leads导入
export const importLeads = data => axios.post('/web/leads/import', data, {})
// 获取创建人组织
export const getCreaterOrganList = query =>
  axios.get('/web/leads/export_creater_organ')
// 获取创建人列表
export const getCreaterUserList = query =>
  axios.get('/web/leads/export_get_creater_list', {
    params: query
  })
// 获取销售组织列表
export const getSaleOrganList = query =>
  axios.get('/web/leads/export_sale_organ')
// 获取销售列表
export const getSaleUserList = query =>
  axios.get('/web/leads/export_get_sale_list', {
    params: query
  })
// 获取商服组织
export const getCsOrganList = query => axios.get('/web/leads/export_cs_organ')
// 获取商服列表
export const getCsUserList = query =>
  axios.get('/web/leads/export_get_cs_list', {
    params: query
  })
// 获取硬件销售组织列表
export const getHardwareSaleOrganList = query =>
  axios.get('/web/leads/export_hardware_sale_organ')
// 获取硬件销售列表
export const getHardwareSaleUserList = query =>
  axios.get('/web/leads/export_get_hardware_sale_list', {
    params: query
  })
// 获取导出类型数据
export const getExportTypeList = query =>
  axios.get('/web/leads/export_form_data')
// leads白名单用户添加
export const getWhiteListLeadsData = query =>
  axios.get('/web/leads/add_whitelist_form_data')
// leads白名单用户添加
export const addWhiteListLeads = data =>
  axios.post('/web/leads/add_whitelist', data)

//获取pro绑定手机号
export const getAdminMobile = query =>
  axios.get('/web/leads/get_admin_mobile', { params: query })
//pro修改绑定手机号
export const changeAdminMobile = data =>
  axios.post('/web/leads/change_admin_mobile', data)

//获取超管手机号
export const getSaas1AdminMobileData = query =>
  axios.get('/web/leads/change_saas1_admin_mobile_form', { params: query })
//修改超管手机号
export const changeSaas1AdminMobile = data =>
  axios.post('/web/leads/change_saas1_admin_mobile', data)

// 冻结头部信息
export const frozenBrandInfo = query =>
  axios.get('/web/leads/frozen_brand_info', { params: query })

//品牌冻结
export const frozen = data => axios.post('/web/leads/frozen', data)

//品牌解冻
export const unfrozen = data => axios.post('/web/leads/unfrozen', data)
// 停店顶部展示信息
export const stopBrandInfo = query =>
  axios.get('/web/leads/stop_brand_info', { params: query })
