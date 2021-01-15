import OaApp from 'oa-core'
import { beforeRoutes, afterRoutes } from './router/routes'
import vuexModules from './store/index'
import './styles/app.less'

// eslint-disable-next-line no-new
new OaApp({
  beforeRoutes,
  afterRoutes,
  vuexModules,
  sentryDSN: 'https://9548a1a9cc764420b358750c804c0459@ats.styd.cn/22'
})
