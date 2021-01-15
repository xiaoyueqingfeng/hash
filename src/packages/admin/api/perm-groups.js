import axios from '@/axios'

//获取权限组列表
export const getPermGroups = query =>
  axios.get('/api/perm-groups', {
    params: query
  })

//添加权限组
export const addPermGroups = data => axios.post('/api/perm-groups/add', data)

//编辑权限点
export const editPermGroups = data => axios.post('/api/perm-groups/edit', data)

export const getPermGroupPerms = query =>
  axios.get('/api/perm-groups/perms', {
    params: query
  })

// 查询单个权限组已经选择的权限点
export const getSinglePermGroupsPerms = query => {
  return axios.get('/api/perm-groups/get_perms', { params: query })
}

// 更新权限组关联权限点
export const setPermGroupsPerms = data =>
  axios.post('/api/perm-groups/set_perms', data)
