import axios from '@/axios'

// 服务记录搜索
export const searchServeList = query =>
  axios.get('/web/service/list', {
    params: query
  })
// 服务记录详情
export const getServeDetail = query =>
  axios.get('/web/service/detail', {
    params: query
  })
// 添加服务记录
export const addServe = data => axios.post('/web/service/add', data, {})
// 服务记录模糊搜索
export const searchServeCustomeByBrandId = query =>
  axios.get('/web/service/add_search_brand', {
    params: query
  })
// 服务记录列表
export const getServeList = query =>
  axios.get('/web/service/list', {
    params: query
  })
// 服务记录 评论
export const addServeComment = data =>
  axios.post('/web/service/comment_add', data, {})
// 添加服务记录获取联系人等信息
export const getServeOtherInfo = query =>
  axios.get('/web/service/add_form_data', {
    params: query
  })
// 服务记录导出
export const exportServiceRecord = data =>
  axios.post('/web/service/export_service_record', data, {})

//客运客续点选结果
export const getServiceCategory = query =>
  axios.get('/web/service/get_service_category', {
    params: query
  })
