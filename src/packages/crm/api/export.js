import axios from '@/axios'

// 获取导出列表
export const getExportList = query =>
  axios.get('/web/export/get_export_list', {
    params: query
  })
// 下载导出的excel
export const getExportExcel = query =>
  axios.get('/web/export/get_export_excel', {
    params: query
  })
