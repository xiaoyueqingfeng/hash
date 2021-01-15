import axios from '@/axios'
/**
 * 获取所有组织
 */
export const getOrganList = () => axios.get('/organ')

export const addOrgan = data => axios.post('/organ/add', data)

export const updateOrgan = data => axios.post('/organ/update', data)

export const deleteOrgan = data => axios.post('/organ/delete', data)

/**
 * 设定关联区域
 */
export const setOrganArea = data => axios.post('/organ/set_area', data)

/**
 * 获取关联区域
 */
export const getOrganAreaInfo = query =>
  axios.get('/organ/get_area', { params: query })
