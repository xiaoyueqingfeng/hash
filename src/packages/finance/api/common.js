import axios from '@/axios'

//财务系统枚举
export const getEnumMap = query =>
  axios.get('/web/common/enum_map', { params: query })
