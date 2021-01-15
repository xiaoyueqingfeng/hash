import axios from '@/axios'

//获取品牌商列表
export const getEnumMap = query =>
  axios.get('/web/common/enum_map', { params: query })
