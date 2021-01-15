import axios from '@/axios'

export const getBusinesscaseList = query =>
  axios.get('/api/businesscase/list', {
    params: query
  })
export const getBusinesscaseAddFormData = query =>
  axios.get('/api/businesscase/add_form_data', {
    params: query
  })
export const getBusinesscaseEditFormData = query =>
  axios.get('/api/businesscase/edit_form_data', {
    params: query
  })
export const addBusinesscase = data =>
  axios.post('/api/businesscase/add', data, {})
export const editBusinesscase = data =>
  axios.post('/api/businesscase/edit', data, {})
export const editBusinesscaseStatus = data =>
  axios.post('/api/businesscase/edit_status', data, {})
