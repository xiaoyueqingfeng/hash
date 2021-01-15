import OaApp from 'oa-core'
import { beforeRoutes, afterRoutes } from './router/routes'
import vuexModules from './store/index'
import AdminLayoutDefault from './views/layouts/default.vue'

// eslint-disable-next-line no-new
new OaApp({
  beforeRoutes,
  afterRoutes,
  vuexModules,
  // 声明需要使用的布局 类型有 default | login | loading| 404 | blank
  // 如不传使用默认的布局模版
  layouts: {
    default: AdminLayoutDefault
  },
  sentryDSN: 'https://cfa17ae0c57f4daa86f40e18aa4f726b@ats.styd.cn/23'
  // guards: [guardsMap.prepareVersionList]
  // 权限开关
  // isAuthClose: true
})
