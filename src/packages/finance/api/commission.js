import axios from '@/axios'

//佣金列表
export const getCommissionList = query =>
  axios.get('/web/commission/list', { params: query })

//停止分佣
export const commissionStop = data =>
  axios.post('/web/commission/stop', data, {})

//佣金明细列表
export const getCommissionDefiniteList = query =>
  axios.get('/web/commission/definite-list', { params: query })

//合伙人统计列表
export const getCommissionStatList = query =>
  axios.get('/web/commission/stat-list', { params: query })
