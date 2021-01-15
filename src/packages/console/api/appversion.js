import axios from '@/axios'

export const getAppVersionList = query =>
  axios.get('/appversion/list', { params: query })

export const getAddFormData = query =>
  axios.get('/appversion/add_form_data', { params: query })

export const getEditFormData = query =>
  axios.get('/appversion/edit_form_data', { params: query })

export const getUpdateFormData = query =>
  axios.get('/appversion/push_form_data', { params: query })

export const addAppVersion = data => axios.post('/appversion/add', data)

export const editAppVersion = data => axios.post('/appversion/edit', data)

export const updateAppVersionStatus = data =>
  axios.post('/appversion/push', data)

export const uploadPackage = data =>
  axios.post('/appversion/edit_apk_url', data)
