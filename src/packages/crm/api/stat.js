import axios from '@/axios'

// 首页 可用 模块
export const getHomeMenu = () => axios.get('/web/stat/get_home_menu')

// 首页——战报
export const getReportData = () => axios.get('/web/stat/get_report_data')
// 首页——客户转化
export const getHomeSaleData = query =>
  axios.get('/web/stat/get_sale_data', { params: query })

// 首页——服务情况
export const getHomeServerData = query =>
  axios.get('/web/stat/get_server_data', { params: query })
// 首页——销售团队PK
export const getSaleOrganCompare = query =>
  axios.get('/web/stat/get_sale_organ_compare', { params: query })

// 首页——销售员工PK
export const getSaleCompare = query =>
  axios.get('/web/stat/get_sale_compare', { params: query })

// 首页——商服PK
export const getServeCompare = query =>
  axios.get('/web/stat/get_server_compare', { params: query })

// 全站数据统计
export const getTotalDataAnalysis = query =>
  axios.get('/web/stat/site_list', {
    params: query
  })

// leads统计
export const getLeadsStat = query =>
  axios.get('/web/stat/leads_calculate_list', {
    params: query
  })
// leads报表
export const getLeadsRreport = query =>
  axios.get('/web/stat/leads_chart', {
    params: query
  })
/**
 * leads_环形图
 */
export const getLeadsCircle = query =>
  axios.get('/web/stat/leads_circle', { params: query })

// leads漏斗图
export const getLeadsFunnel = query =>
  axios.get('/web/stat/leads_funnel', { params: query })

// 业绩统计
export const getSaleStat = query =>
  axios.get('/web/stat/sale_calculate_list', {
    params: query
  })
// 业绩团队(维度)报表
export const getSaleTeamStat = query =>
  axios.get('/web/stat/sale_organ_list', {
    params: query
  })
// 业绩城市(维度)报表
export const getSaleCityStat = query =>
  axios.get('/web/stat/sale_city_list', {
    params: query
  })

// 员工业绩统计
export const getSaleUserList = query =>
  axios.get('/web/stat/sale_user_list', {
    params: query
  })

/**
 * 团队条形图
 */
export const getOrganBar = query =>
  axios.get('/web/stat/sale_organ_bar', {
    params: query
  })

/**
 * 团队曲线图
 */
export const getOrganKinked = query =>
  axios.get('/web/stat/sale_organ_kinked', {
    params: query
  })

/**
 * 业绩-城市客户图
 */
export const getCityBar = query =>
  axios.get('/web/stat/sale_city_bar', {
    params: query
  })

// 商服统计
export const getServerList = query =>
  axios.get('/web/stat/server_calculate_list', {
    params: query
  })
// 商服报表
export const getServerUserList = query =>
  axios.get('/web/stat/server_user_list', {
    params: query
  })
// 环形图
export const getCircleData = query =>
  axios.get('/web/stat/leads_circle', {
    params: query
  })

/**
 * 商服-客户条形图
 */
export const getServerLevelBar = query =>
  axios.get('/web/stat/server_level_bar', { params: query })
/**
 * 商服-流失客户分析
 */
export const getServerLostBar = query =>
  axios.get('/web/stat/server_lose_bar', { params: query })

/**
 * 商服-客户环形图
 */
export const getServerLevelRing = query =>
  axios.get('/web/stat/server_level_ring', { params: query })

// 团队拜访统计-时间维度
export const getVisitOrgan = query =>
  axios.get('/web/stat/visit_organ', { params: query })
// 团队拜访统计-团队维度
export const getVisitOrganDate = query =>
  axios.get('/web/stat/visit_organ_date', { params: query })

// 员工拜访统计-时间维度
export const getVisitStaff = query =>
  axios.get('/web/stat/visit_user', { params: query })
// 员工拜访统计-团队维度
export const getVisitStaffDate = query =>
  axios.get('/web/stat/visit_user_date', { params: query })

// 团队客户统计-时间维度
export const getCustomOrgan = query =>
  axios.get('/web/stat/custom_organ', { params: query })
// 团队客户统计-团队维度
export const getCustomOrganDate = query =>
  axios.get('/web/stat/custom_organ_date', { params: query })

// 员工客户统计-员工维度
export const getCustomStaff = query =>
  axios.get('/web/stat/custom_user', { params: query })
// 员工客户统计-时间维度
export const getCustomStaffDate = query =>
  axios.get('/web/stat/custom_user_date', { params: query })
