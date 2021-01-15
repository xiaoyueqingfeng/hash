import { authService } from 'oa-core/utils/auth.service'
import { notification } from 'ant-design-vue'

export const initAuthTab = (parentRouteName, tabNames = [], tabsModel) => {
  if (!parentRouteName) {
    throw new Error('[initTabMixin] 需要parentRouteName 父路由名称')
  }
  if (!tabsModel) {
    throw new Error('[initTabMixin] tabsModel 绑定的tabs模型')
  }

  return {
    beforeRouteUpdate(to, from, next) {
      if (!this[tabsModel].length) {
        next()
      }
      if (to.name === parentRouteName) {
        return next({
          name: this[tabsModel][0].route.name,
          query: {
            _t: Math.random()
              .toString(32)
              .slice(2)
          }
        })
      }
      return next()
    },
    beforeRouteEnter(to, from, next) {
      const authRouteTabs = []

      tabNames.forEach(routeName => {
        if (authService.routeCan(routeName)) {
          authRouteTabs.push({
            label: authService.resolveRouteMeta(routeName).title,
            route: {
              name: routeName
            }
          })
        }
      })
      if (!authRouteTabs.length) {
        notification.warning({
          message: '[initTabMixin]',
          description: '未找到匹配的tab'
        })
        return next()
      }

      if (to.name === parentRouteName) {
        return next({
          name: authRouteTabs[0].route.name
        })
      }
      return next(vm => {
        vm.authRouteTabs = authRouteTabs
      })
    }
  }
}
