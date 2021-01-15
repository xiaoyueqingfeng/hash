import {
  CALLCENTER_INIT_LIST,
  CALLCENTER_DESTORY_LIST
} from '@/config/call-center'
import container from 'oa-core/container'
import CallCenterInit from '@/utils/callCenter'

// 分支流的route next() 必须放在else中 ，否则会永远命中
export default (to, from, next) => {
  let store = container.get('store')
  let can_call_udesk = store.getters['oa/user/can_call_udesk']
  try {
    if (can_call_udesk) {
      let udeskCallCenter = container.get('udeskCallCenter')
      if (CALLCENTER_INIT_LIST.indexOf(to.name)) {
        // 白名单 需初始化通话组件
        !udeskCallCenter && CallCenterInit()
        next()
      }
      if (CALLCENTER_DESTORY_LIST.indexOf(to.name) >= 0) {
        // 黑名单 需销毁通话组件
        udeskCallCenter && udeskCallCenter.destroyed()
        next()
      }
    }
    next()
  } catch (error) {
    console.log('error', error)
    next()
  }
}
