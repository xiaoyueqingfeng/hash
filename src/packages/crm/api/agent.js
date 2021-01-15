import axios from '@/axios'

//获取合伙人列表
export const getAgentList = query =>
  axios.get('/web/agent/list', { params: query })

//邀请合伙人
export const agentInvite = data => axios.post('/web/agent/invite', data, {})

//合伙人详情
export const agentDetail = query =>
  axios.get('/web/agent/detail', { params: query })

//编辑
export const agentEdit = data => axios.post('/web/agent/edit', data, {})

//分享链接
export const agentShareLink = query =>
  axios.get('/web/agent/share-link', { params: query })

//查看账户详情
export const agentbBankAccountDetail = query =>
  axios.get('/web/agent/bank-account-detail', { params: query })

//禁用
export const agentDisabled = query =>
  axios.get('/web/agent/disable', { params: query })

//等级列表
export const getLevelList = query =>
  axios.get('/web/agent/level-list', { params: query })
