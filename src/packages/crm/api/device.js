import axios from '@/axios'

// 获取设备列表
export const getDeviceList = query =>
  axios.get('/web/device/list', { params: query })
// 查看设备数据列表
export const getDeviceDataList = query =>
  axios.get('/web/device/data-list', { params: query })
// 获取某种设备类型下所有的产品列表
export const getDeviceTypeProductList = query =>
  axios.get('/web/device/get-product-list', { params: query })
// 获取设备详细信息
export const getDeviceInfo = query =>
  axios.get('/web/device/info', { params: query })
// 新增设备
export const addDevice = data => axios.post('/web/device/add', data)
// 编辑设备
export const editDevice = data => axios.post('/web/device/edit', data)
// 变更设备状态
export const switchDeviceStatus = data => axios.post('/web/device/switch', data)
// 系统自动生成的设备ID
export const createDeviceId = data =>
  axios.post('/web/device/gen-device-id', data)
