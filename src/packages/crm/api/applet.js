import axios from '@/axios'

//获取合伙人列表
export const getMinaList = query =>
  axios.get('/web/applet/list', { params: query })

//邀请合伙人
export const batchAuditMina = data => axios.post('/web/applet/audit', data, {})

//邀请合伙人
export const allAuditMina = data =>
  axios.post('/web/applet/audit_all', data, {})
