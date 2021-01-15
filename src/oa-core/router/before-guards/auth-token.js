import { getAuthToken } from 'oa-core/utils/cookie'
import { AUTH_WHITE_LIST } from 'oa-core/constants/config'
import container from 'oa-core/container'

// 分支流的route next() 必须放在else中 ，否则会永远命中
export default (to, from, next) => {
  if (container.get('isAuthClose')) {
    return next()
  }
  if (~AUTH_WHITE_LIST.indexOf(to.name)) {
    next()
  } else if (!getAuthToken()) {
    next({
      name: 'oa/user-login',
      // 防止无限跳转login本页
      query: {
        t: Math.random()
          .toString(16)
          .slice(2)
      }
    })
  } else {
    next()
  }
}
