import OaApp from 'oa-core'
import { beforeRoutes, afterRoutes } from './router/routes'
import vuexModules from './store/index'
import DmallLayout from './views/layout/default'
import './styles/app.less'

// eslint-disable-next-line no-new
new OaApp({
  beforeRoutes,
  afterRoutes,
  vuexModules,
  layouts: {
    default: DmallLayout
  },
  sentryDSN: 'https://9548a1a9cc764420b358750c804c0459@ats.styd.cn/22'
})
