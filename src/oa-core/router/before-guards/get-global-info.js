import container from 'oa-core/container'
import { getAuthToken } from 'oa-core/utils/cookie'
import { AUTH_WHITE_LIST } from 'oa-core/constants/config'

export default (to, from, next) => {
  const store = container.get('store')
  const getters = store.getters
  if (container.get('isAuthClose')) {
    return next()
  }
  if (AUTH_WHITE_LIST.includes(to.name)) {
    next()
  } else if (!getters['oa/user/user_info'].id && getAuthToken()) {
    store
      .dispatch('oa/user/getCurrentUserInfo')
      .then(() => {
        if (getters['oa/user/is_fresh']) {
          next({
            name: 'oa/user-update-password',
            query: { mobile: getters['oa/user/user_info'].mobile }
          })
        } else {
          Promise.all([store.dispatch('oa/user/getPlatformCurrent')]).then(
            () => {
              next()
            }
          )
        }
        // 全局获取城市数据
      })
      .catch(() => {
        next({
          name: 'oa/user-login'
        })
      })
  } else {
    next()
  }
}
