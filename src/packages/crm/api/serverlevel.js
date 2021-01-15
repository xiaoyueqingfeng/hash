import axios from '@/axios'

// 客户分级列表
export const getBrandActiveList = query =>
  axios.get('/web/serverlevel/brand_active_list', {
    params: query
  })
// 筛选接口
export const getBrandActiveHeader = query =>
  axios.get('/web/serverlevel/brand_active_header', {
    params: query
  })
// 品牌分级列表
export const getBrandActiveSelect = query =>
  axios.get('/web/serverlevel/brand_active_select', {
    params: query
  })
// 品牌分级日报导出
export const brandActiveExport = data =>
  axios.post('/web/serverlevel/brand_active_export', data, {})

// 品牌运营日报统计列表(时间维度)
export const brandOperateListDate = query =>
  axios.get('/web/serverlevel/brand_operate_list_date', {
    params: query
  })
// 品牌运营日报统计列表(品牌维度)
export const brandOperateListBrand = query =>
  axios.get('/web/serverlevel/brand_operate_list_brand', {
    params: query
  })
// 获取筛选条件
export const brandOperateListDateSelect = query =>
  axios.get('/web/serverlevel/brand_operate_date_select', {
    params: query
  })
// 获取筛选条件
export const brandOperateListBrandSelect = query =>
  axios.get('/web/serverlevel/brand_operate_brand_select', {
    params: query
  })
// 品牌分级筛选MAP接口
export const getbrandLevelDailyMap = query =>
  axios.get('/web/serverlevel/brand_level_map', {
    params: query
  })
// 品牌分级日报导出
export const exportBrandLevel = data =>
  axios.post('/web/serverlevel/brand_level_export', data)
// 品牌分级列表
export const getbrandLevelDailyList = query =>
  axios.get('/web/serverlevel/brand_level_list', {
    params: query
  })

// 客户分级列表
export const getLeadsLevelList = query =>
  axios.get('/web/serverlevel/leads_level_statistics', {
    params: query
  })
