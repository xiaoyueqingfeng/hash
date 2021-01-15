import axios from '@/axios'
// 获取硬件列表
export const getHardwareList = query =>
  axios.get('/web/hardware/list', {
    params: query
  })
// 硬件绑定
export const hardwareBind = data => axios.post('/web/hardware/bind', data, {})
// 硬件编辑
export const hardwareEdit = data => axios.post('/web/hardware/edit', data, {})
// 硬件删除
export const hardwareDelete = data =>
  axios.post(`/web/hardware/unbind`, data, {})
// 硬件查看
export const hardwareDetail = query =>
  axios.get('/web/hardware/detail', {
    params: query
  })
// 硬件重启
export const hardwareReload = data =>
  axios.post('/web/hardware/reload', data, {})
// 获取品牌下的场馆
export const hardwareGetShops = query =>
  axios.get('/web/hardware/shops', {
    params: query
  })
// 获取场地区域
export const hardwareGetArea = query =>
  axios.get('/web/hardware/areas', {
    params: query
  })
// 获取储物柜区域
export const hardwareGetCabinetArea = query =>
  axios.get('/web/hardware/shop_cabinet_area', {
    params: query
  })
// 获取设备名称
export const hardwareGetDevice = query =>
  axios.get('/web/hardware/device', {
    params: query
  })
// 获取mapping
export const hardwareGetReader = query =>
  axios.get('/web/hardware/reader', {
    params: query
  })
//获取更新包列表
export const getSoftwareList = query =>
  axios.get('/web/hardware/list', {
    params: query
  })

//获取更新任务列表
export const getUpdateTaskList = query =>
  axios.get('/web/hardware/task_list', {
    params: query
  })

//获取设备类型列表
export const getCategory = query =>
  axios.get('/web/hardware/device_category', {
    params: query
  })

//获取版本号
export const getVersion = query =>
  axios.get('/web/hardware/app_version', {
    params: query
  })

//获取任务更新范围
export const getUpdateRange = query =>
  axios.get('/web/hardware/task_update_range', {
    params: query
  })

//获取日志类型
export const getLogType = query =>
  axios.get('/web/hardware/log_download_form', {
    params: query
  })

//远程开门
export const openDoor = query =>
  axios.get('/web/hardware/door_open', {
    params: query
  })

//导出日志
export const exportLog = query =>
  axios.get('/web/hardware/log_download', {
    params: query
  })

//获取产品名称
export const getAppList = query =>
  axios.get('/web/hardware/app_list', {
    params: query
  })

//获取场馆设备列表
export const getDeviceList = query =>
  axios.get('/web/hardware/device_list', {
    params: query
  })

//获取更新包类型
export const getApkType = query =>
  axios.get('/web/hardware/task_create_form', {
    params: query
  })

//下发debug任务
export const createTask = data =>
  axios.post('/web/hardware/task_create', data, {})

// 场馆设备-清空本地数据
export const deviceDataReset = data =>
  axios.post('/web/hardware/flush-device', data, {})

// 场馆设备-功能设置获取
export const configGet = query =>
  axios.get('/web/hardware/config-get', { params: query })

//场馆设备-功能设置保存
export const configSave = data =>
  axios.post('/web/hardware/config-save', data, {})
