import axios from '@/axios'

export const getTooltipsList = query =>
  axios.get('/api/tooltips', {
    params: query
  })
export const addTooltips = data => axios.post('/api/tooltips/add', data, {})
export const editTooltips = data => axios.post('/api/tooltips/edit', data, {})
export const editTooltipsStatus = data =>
  axios.post('/api/tooltips/status', data, {})
