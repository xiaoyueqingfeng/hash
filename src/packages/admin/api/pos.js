import axios from '@/axios'

// 获取pos机管理列表
export const getPosManageList = query =>
  axios.get('/api/pos/list', {
    params: query
  })

// 获取pos机添加列表
export const getPosaddList = query =>
  axios.get('/api/pos/terminal_list', {
    params: query
  })

// 获取Pos机详情
export const getPosDetail = query =>
  axios.get('/api/pos/terminal_detail', {
    params: query
  })

// 删除Pos机
export const deletePos = data => axios.post('/api/pos/terminal_delete', data)

// 添加Pos机
export const addPos = data => axios.post('/api/pos/terminal_add', data)

// admin-停用/启用设备
export const PosSwitch = data => axios.post('/api/pos/terminal_switch', data)

// 编辑Pos机名称
export const editPosName = data => axios.post('/api/pos/terminal_edit', data)

// Pos机门店列表
export const posShopList = query =>
  axios.get('/api/pos/terminal_shop_list', {
    params: query
  })

// Pos机设备列表
export const posDeviceList = query =>
  axios.get('/api/pos/brand_terminal_list', {
    params: query
  })
// Pos机心跳检测
export const posTerminalTouch = query =>
  axios.get('/api/pos/terminal_touch', {
    params: query
  })
// admin-关联POS机的详情
export const posTerminalDetail = query =>
  axios.get('/api/pos/brand_terminal_detail', {
    params: query
  })
// admin-关联POS机的编辑
export const posTerminalEdit = data =>
  axios.post('/api/pos/brand_terminal_edit', data)

// admin-关键字搜索品牌
export const posGetBrandList = query =>
  axios.get('/api/pos/search_brand', {
    params: query
  })
// admin-关键字搜索品牌
export const posGetShopList = query =>
  axios.get('/api/pos/search_shop', {
    params: query
  })
export const posGetMchid = query =>
  axios.get('/api/pos/get_mchid', {
    params: query
  })
