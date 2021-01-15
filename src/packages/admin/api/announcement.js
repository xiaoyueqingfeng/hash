import axios from '@/axios'

export const getAnnouncementList = query =>
  axios.get('/api/announcement/list', {
    params: query
  })
export const getAnnouncementAddFormData = query =>
  axios.get('/api/announcement/add_form_data', {
    params: query
  })
export const getAnnouncementEditFormData = query =>
  axios.get('/api/announcement/edit_form_data', {
    params: query
  })
export const addAnnouncement = data =>
  axios.post('/api/announcement/add', data, {})
export const editAnnouncementStatus = data =>
  axios.post('/api/announcement/edit_status', data, {})
export const editAnnouncement = data =>
  axios.post('/api/announcement/edit', data, {})
export const deleteAnnouncement = data =>
  axios.post('/api/announcement/delete', data, {})
export const SearchBrand = query =>
  axios.get('/api/announcement/brand_search', {
    params: query
  })
export const scan = query =>
  axios.get('/api/announcement/look_content', {
    params: query
  })
// 根据id数组查列表
export const getBrandInfoList = query =>
  axios.get('/api/announcement/get_brand_info', {
    params: query
  })
export const getCityTree = query =>
  axios.get('/api/region/list', {
    params: query
  })
