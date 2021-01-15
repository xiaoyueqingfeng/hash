import axios from '@/axios'

// 客户分级列表
export const getLeadsLevelList = query =>
  axios.get('/web/leadslevel/leads_level_list', {
    params: query
  })
// 筛选接口
export const getLevelName = query =>
  axios.get('/web/leadslevel/get_level_name', {
    params: query
  })
// 品牌分级列表
export const getBrandLevelList = query =>
  axios.get('/web/leadslevel/brand_level_list', {
    params: query
  })
// 品牌分级日报导出
export const exportBrandLevel = data =>
  axios.post('/web/leadslevel/export_brand_level', data, {})
