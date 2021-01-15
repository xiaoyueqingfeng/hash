import axios from '@/axios'

export const getCallList = query =>
  axios.get('/web/udesk/call_log_list', {
    params: query
  })

export const get_agent_token = query =>
  axios.get('/web/udesk/get_agent_token', {
    params: query
  })

export const call_log_add = query =>
  axios.get('/web/udesk/call_log_add', {
    params: query
  })
