import axios from 'oa-core/axios'

export const getCurrentUserInfo = () =>
  axios.get('/user/current', {
    numberic: ['is_fresh', 'status'],
    platform: 'console'
  })

/**
 * 用户登录
 */
export const signIn = ({
  mobile,
  password,
  aliyunSessionId,
  aliyunToken,
  aliyunSig,
  aliyunScene
}) => {
  const data = {
    mobile,
    password,
    aliyunSessionId,
    aliyunToken,
    aliyunSig,
    aliyunScene
  }
  return axios({
    url: '/api/user/signin',
    data,
    method: 'post',
    platform: 'console'
  })
}

/** 重置密码-执行重置密码操作
 *
 */

export const resetPassword = data => {
  return axios({
    url: '/user/password-reset',
    method: 'post',
    platform: 'console',
    data
  })
}

export const getCrmCurrent = () =>
  axios.get('/web/user/current', {
    platform: 'crm'
  })

// 获取所有角色
export const getRoleList = query =>
  axios.get('/web/user/role', {
    params: query
  })
// 获取全部可用权限节点
export const getAuthList = query =>
  axios.get('/web/user/auth', {
    params: query
  })
// 获取某个角色下的权限节点配置
export const getAuthConfigList = query =>
  axios.get('/web/user/get_role_auth', {
    params: query
  })
// 保存权限配置
export const saveAuth = data => axios.post('/web/user/auth_set', data)
// 角色退出
export const loginout = () => {
  return axios({
    url: '/web/user/logout',
    method: 'post'
  })
}
