import axios from '@/axios'

/**
 * 获取一个部门信息
 * 参数 id status(1在职 2离职) keywords 关键字查询
 */
export const getOrganInfo = query => axios.get('/user/index', { params: query })

/** 获取用户信息
 *
 */

export const getUserInfo = query => {
  return axios({ url: '/user/info', method: 'get', params: query })
}

/**
 * 新增一个客户
 */
export const addUser = data => {
  return axios({
    url: '/user/add',
    method: 'post',
    data
  })
}

/**
 * 更新一个客户
 */
export const updateUser = data => {
  return axios({
    url: '/user/update',
    method: 'post',
    data
  })
}

/**
 * 设定员工 离/在职
 */
export const updateUserStatus = data => axios.post('/user/set_status', data)

/**
 * 设定/取消 主管
 */
export const setOrganAdmin = data => axios.post('/user/set_organ_admin', data)
