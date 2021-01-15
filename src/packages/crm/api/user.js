import axios from '@/axios'

// 获取筛选项的部门树
export const getOrganList = () => axios.get('/web/user/organ')

// 获取筛选项的员工树
export const getUserList = query =>
  axios.get('/web/user/user_list', { params: query })

/**
 * 获取筛选用的销售列表
 */
export const getSaleList = query =>
  axios.get('/web/user/sale_server_list', { params: query })

/**
 * 获取筛选用的商运列表
 */
export const getServerList = () =>
  axios.get('/web/user/sale_server_list', {
    params: {
      type: 2
    }
  })
//  获取员工
export const getEmployeeList = query =>
  axios.get('/web/user/user_list', {
    params: query
  })

//  获取部门
export const getDepartmentList = query =>
  axios.get('/web/user/organ', {
    params: query
  })

// 发送短信验证码
export const getSmsCaptcha = data =>
  axios.post('/web/user/sms_captcha', data, {})

// 验证短信验证码
export const CheckSmsCaptcha = data =>
  axios.post('/web/user/sms_captcha_check', data, {})
