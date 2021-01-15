import OaApp from 'oa-core'
import { beforeRoutes, afterRoutes } from './router/routes'
import vuexModules from './store/index'
import FinanceLayout from './layout/default'
import './styles/app.less'
new OaApp({
  beforeRoutes,
  afterRoutes,
  vuexModules,
  layouts: {
    default: FinanceLayout
  },
  sentryDSN: 'https://31221964fab141249cf73461f26891b8@ats.styd.cn/30'
})
