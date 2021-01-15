import axios from '@/axios'

// 拜访记录搜索
export const searchVisitList = query =>
  axios.get('/web/visit/list', {
    params: query
  })
// 拜访记录详情
export const getVisitDetail = query =>
  axios.get('/web/visit/detail', {
    params: query
  })
export const addComment = data => axios.post('/web/visit/comment_add', data, {})
// 模糊搜索
export const searchCustomeByBrandId = query =>
  axios.get('/web/visit/add_search_brand', {
    params: query
  })
// 添加拜访记录获取联系人等信息
export const getVisitOtherInfo = query =>
  axios.get('/web/visit/add_form_data', {
    params: query
  })
// 添加拜访记录
export const addVisit = data => axios.post('/web/visit/add', data, {})
// 拜访记录导出
export const exportVisit = data =>
  axios.post('/web/visit/export_visit_record', data, {})
