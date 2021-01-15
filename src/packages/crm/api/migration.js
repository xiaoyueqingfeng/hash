import axios from '@/axios'

// 用户设置列表展示字段表单数据
export const setCabinetMigration = data =>
  axios.post('/web/migration/cabinet', data, {})
