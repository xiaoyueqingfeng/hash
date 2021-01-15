import Vue from 'vue'
import OaVueRouter from 'oa-core/vendor/oa-vue-router'
// import VueRouter from 'vue-router'
import coreRoutes from './routes'
import multiguard from 'vue-router-multiguard'
// before
import hotRelease from './before-guards/hot-release'
import nProgressStart from './before-guards/nprogress-start'
import queryOptions from './before-guards/query-options'
import authToken from './before-guards/auth-token'
import getGlobalInfo from './before-guards/get-global-info'
import tabs from './before-guards/tabs'

// after
import nProgressEnd from './after-guards/nprogress-end'
Vue.use(OaVueRouter)
// Vue.use(VueRouter)

export default ({
  beforeRoutes = [],
  afterRoutes = [],
  guards = [],
  mode = 'history',
  base = '/'
} = {}) => {
  const routes = [
    {
      path: '/',
      redirect: {
        name: 'oa/index'
      }
    },
    ...beforeRoutes,
    ...coreRoutes,
    ...afterRoutes,
    {
      path: '*',
      redirect: {
        name: 'oa/404'
      }
    }
  ]
  // const routes = [...coreRoutes]
  console.log('routes is', routes)
  const router = new OaVueRouter({
    mode,
    base,
    routes,
    scrollBehavior() {
      return { y: 0 }
    }
  })
  const beforeGuards = [
    /**
     * 版本热更新
     */
    hotRelease,
    nProgressStart,
    /**
     * 路由查询参数格式化
     */
    queryOptions,
    /**
     * 校验有没有oa-token
     */
    authToken,
    /**
     * 获取当前登录角色的全局信息
     */
    getGlobalInfo,
    /**
     * 标签栏
     */
    tabs
  ]
  const afterGuards = [nProgressEnd]
  // oa guards
  router.beforeEach(multiguard(beforeGuards))
  // app guards
  router.beforeEach(multiguard(guards))

  // oa after guards
  router.afterEach(multiguard(afterGuards))
  router.onError(nProgressEnd)
  return router
}
