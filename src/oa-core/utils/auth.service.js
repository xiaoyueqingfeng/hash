import container from 'oa-core/container'
import { find as _find } from 'lodash-es'

/**
 * 权限相关服务
 */
export const authService = {
  /**
   * 通过authKey和全量权限列表判定是否具有auth_key的相关权限
   * @param {string} authKey 后端的auth_key 判断是否有此权限
   */
  can(authKey) {
    const store = container.get('store')
    const webAuthList = store.getters['oa/user/webAuthList']
    const finded = _find(webAuthList, {
      auth_key: authKey
    })
    return !!finded
  },
  /**
   * 通过路由名返回匹配路由meta对象 精准匹配 忽略redirect规则
   * @param {string} routeName 路由名
   * @return {object} 路由meta对象
   */
  resolveRouteMeta(routeName) {
    const router = container.get('router')
    const resolved = router
      .resolve({ name: routeName })
      .route.matched.find(item => item.name === routeName)
    return resolved ? resolved.meta : {}
  },
  /**
   * 通过路由名返回是否具有该路由权限
   * @param {string} routeName 路由名
   */
  routeCan(routeName) {
    const routeMeta = this.resolveRouteMeta(routeName)
    if (!routeMeta.authKey) {
      console.error(`[authService] can not find meta.authKey on ${routeName}`)
      return false
    }
    return this.can(routeMeta.authKey)
  }
}
