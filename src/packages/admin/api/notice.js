import axios from '@/axios'

//系统公告列表
export const getNoticeSystemList = query =>
  axios.get('/api/notice/system_list', { params: query })
//活动公告列表
export const getNoticeActivityList = query =>
  axios.get('/api/notice/activity_list', { params: query })

//设置活动公告权重
export const setActivityWeight = data =>
  axios.post('/api/notice/set_activity_weight', data)

//发布系统公告
export const noticeSendSystem = data =>
  axios.post('/api/notice/send_system', data)
//发布活动公告
export const noticeSendActivity = data =>
  axios.post('/api/notice/send_activity', data)

//删除系统公告
export const noticeDeleteSystem = data =>
  axios.post('/api/notice/delete_system', data)
//删除活动公告
export const noticeDeleteActivity = data =>
  axios.post('/api/notice/delete_activity', data)

//撤回系统公告
export const noticeWithdrawSystem = data =>
  axios.post('/api/notice/withdraw_system', data)
//撤回活动公告
export const noticeWithdrawActivity = data =>
  axios.post('/api/notice/withdraw_activity', data)

//获取公告表单
export const getFormData = query =>
  axios.get('/api/notice/get_form_data', { params: query })
//获取系统公告详情
export const getSystemDetail = query =>
  axios.get('/api/notice/get_system_detail', { params: query })
//获取活动公告详情
export const getActivityDetail = query =>
  axios.get('/api/notice/get_activity_detail', { params: query })

// 编辑系统公告
export const noticeEditSystem = data =>
  axios.post('/api/notice/system_edit', data)
// 编辑活动公告
export const noticeEditActivity = data =>
  axios.post('/api/notice/activity_edit', data)
// 新增系统公告
export const noticeAddSystem = data =>
  axios.post('/api/notice/system_add', data)
// 新增活动公告
export const noticeAddActivity = data =>
  axios.post('/api/notice/activity_add', data)
// 获取省市区
export const noticeGetRegions = query =>
  axios.get('/api/notice/system_edit', { params: query })
// 查询品牌
export const noticeGetBrands = query =>
  axios.get('/api/notice/search_brand', { params: query })
