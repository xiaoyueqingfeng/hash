import axios from '@/axios'

//查询设置标签
export const getTagSet = query =>
  axios.get('/web/tag/tag_set', { params: query })

//设置标签
export const addTagLeads = data => axios.post('/web/tag/tag_leads', data, {})

export const addTag = data => axios.post('/web/tag/add', data)

export const getAddFormData = query =>
  axios.get('/web/tag/add_form_data', { params: query })

export const editTag = data => axios.post('/web/tag/edit', data)

export const getEditFormData = query =>
  axios.get('/web/tag/edit_form_data', { params: query })

export const changeTagStatus = data =>
  axios.post('/web/tag/change_tag_status', data)

export const getTagList = query => axios.get('/web/tag/list', { params: query })
