import axios from '@/axios'

// 统一去除最后一级children字段
export const getChannelList = () => axios.get('/web/channel/channel_list')
// 渠道来源编辑
export const editChannel = data => axios.post('/web/channel/edit', data, {})
// 渠道来源列表
export const getChannelInfo = query =>
  axios.get('/web/channel/list', {
    params: query
  })
// 添加渠道来源
export const addChannel = data => axios.post('/web/channel/add', data, {})
// 渠道置顶
export const ToTopChannel = data => axios.post('/web/channel/order', data, {})
