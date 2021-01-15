import OaApp from 'oa-core'
import { beforeRoutes, afterRoutes } from './router/routes'
import vuexModules from './store/index'
import CrmLayoutDefault from './views/layouts/default.vue'
import './styles/app.less'
import WATERMARK_ROUTE_LIST from './config/watermark-route-list'
import udeskCallCenter from './router/before-guards/udesk-callCenter-component'
// eslint-disable-next-line no-new
new OaApp({
  beforeRoutes,
  afterRoutes,
  vuexModules,
  // 声明需要使用的布局 类型有 default | login | loading| 404 | blank
  // 如不传使用默认的布局模版
  layouts: {
    default: CrmLayoutDefault
  },
  guards: [udeskCallCenter],
  sentryDSN: 'https://0546181724444bc1b55fb28cc5492679@ats.styd.cn/20',
  watermarkRouteList: WATERMARK_ROUTE_LIST
})
