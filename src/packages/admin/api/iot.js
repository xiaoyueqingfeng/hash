import axios from '@/axios'

// 获取更新包列表
export const getApkList = query =>
  axios.get('/api/iot/apk_list', {
    params: query
  })

// 获取更新包详情
export const getIotDetail = query =>
  axios.get('/api/iot/apk_detail', {
    params: query
  })

// 获取更新包日志
export const getApkLogs = query =>
  axios.get('/api/iot/apk_logs', {
    params: query
  })

// 新增更新包
export const addApk = data => axios.post('/api/iot/add_apk', data, {})
// 编辑更新包
export const editApk = data => axios.post('/api/iot/edit_apk', data, {})

// 更新包上线
export const publishApk = data => axios.post('/api/iot/publish_apk', data, {})

// 获取映射字段
export const getMapping = query =>
  axios.get('/api/iot/get_mappings', {
    params: query
  })

// 获取硬件SKU类别
export const getCategoryList = query =>
  axios.get('/api/iot/get_app_ver', {
    params: query
  })

// 获取硬件SKU列表
export const getSkuList = query =>
  axios.get('/api/iot/get_app_id', {
    params: query
  })

//发布
export const pushApk = data => axios.post('/api/iot/push_apk', data, {})

//停止发布
export const stopPushApk = data =>
  axios.post('/api/iot/stop_push_apk', data, {})
