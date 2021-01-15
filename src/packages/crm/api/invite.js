import axios from '@/axios'

//推荐人列表
export const inviteList = query =>
  axios.get('/web/invite/list', { params: query })
//推荐人设置无效
export const inviteSetInvalid = data =>
  axios.post('/web/invite/set-invalid', data, {})
//获取推荐人重复信息
export const getRepeatInfo = data =>
  axios.post('/web/invite/repeat-info', data, {})
