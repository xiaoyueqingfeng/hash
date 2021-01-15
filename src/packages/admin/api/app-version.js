import axios from '@/axios'

//获取app列表
export const getAppVersionList = query =>
  axios.get('/api/app-version', { params: query })
//app详情
export const getAppdetail = query =>
  axios.get('/api/app-version/detail', { params: query })

//添加app
export const addApp = data => axios.post('/api/app-version/add', data, {})

//修改app
export const editApp = data => axios.post('/api/app-version/edit', data, {})

//删除app
export const deleteApp = data => axios.post('/api/app-version/delete', data, {})

//app推送
export const pushApp = data => axios.post('/api/app-version/push', data, {})
