import axios from '@/axios'

// 添加联系人
export const addContact = data => axios.post('/web/contact/add', data, {})
// 编辑联系人
export const editContact = data => axios.post('/web/contact/edit', data, {})
// 删除联系人
export const contactDelete = data => axios.post('/web/contact/delete', data, {})
// 检测手机号是否重复
export const checkMobileRepeat = data =>
  axios.post('/web/contact/check_mobile_repeat', data, {})
