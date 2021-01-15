import axios from '@/axios'

// 工作计划编辑获取信息
export const getWorkplan = query =>
  axios.get('/web/workplan/edit_form_data', {
    params: query
  })
// 工作计划编辑
export const editWorkplan = data => axios.post('/web/workplan/edit', data, {})
// 工作计划列表
export const workplanList = query =>
  axios.get('/web/workplan/list', {
    params: query
  })
// 工作计划添加
export const addWorkplan = data => axios.post('/web/workplan/add', data, {})
// 工作计划日统计
export const getDayWorkpalnList = query =>
  axios.get('/web/workplan/day_statistics', {
    params: query
  })
// 工作计划模糊搜索
export const searchCustomerByBrandId = query =>
  axios.get('/web/workplan/add_search_brand', {
    params: query
  })
