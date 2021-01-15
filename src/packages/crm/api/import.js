import axios from '@/axios'

// 下载导入模板excel
export const getImportDemoExcel = query =>
  axios.get('/web/import/get_leads_demo_excel', {
    params: query
  })
// 下载导入失败excel
export const getImportFailExcel = query =>
  axios.get('/web/import/get_import_failed_excel', {
    params: query
  })
// 获取导入列表
export const getImportList = query =>
  axios.get('/web/import/get_import_list', {
    params: query
  })
