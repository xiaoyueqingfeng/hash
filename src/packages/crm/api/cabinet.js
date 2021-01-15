import axios from '@/axios'

// 获取中控柜组列表
export const getCabinetGroupList = query =>
  axios.get('/web/cabinet/group_list', {
    params: query
  })

// 获取门店储物柜列表
export const getShopCabinetList = query =>
  axios.get('/web/cabinet/shop_cabinet_list', {
    params: query
  })

// 绑定智能柜及储物柜
export const bindCabinet = data => axios.post('/web/cabinet/bind', data)

// 解绑绑定智能柜及储物柜
export const unbindCabinet = data => axios.post('/web/cabinet/unbind', data)

// 新增柜组
export const addCabinetGroup = data =>
  axios.post('/web/cabinet/group_add', data)

// 删除柜组
export const deleteCabinetGroup = data =>
  axios.post('/web/cabinet/group_delete', data)

// 无线柜锁表区号导入
export const lockImport = data => axios.post('/web/cabinet/lock_import', data)

// 无线柜开锁
export const lockOpen = data => axios.post('/web/cabinet/lock_open', data)

// 获取使用中的储物柜数量
export const CabinetUsingCount = query =>
  axios.get('/web/cabinet/using_count', {
    params: query
  })
