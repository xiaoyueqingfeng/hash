import axios from '@/axios'

//已开通门店列表
export const shopBuyList = query =>
  axios.get('/web/shop/buy_list', { params: query })
// pro停店
export const shopStop = data => axios.post('/web/shop/stop', data)

// 购买门店列表
export const shopAllShop = query =>
  axios.get('/web/shop/all_shop', { params: query })
