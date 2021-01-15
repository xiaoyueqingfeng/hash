import 'oa-core/polyfills/register'
import createRouter from './router'
import createStore from './store'
import App from './views/App.vue'
import SentryReporter from 'sentry-reporter-js'
import container from './container'
import Styleguide from 'oa-core/vendor/styleguide'
import './offline'

import AntdVue from 'ant-design-vue'
import Vue from 'vue'
import VueAsync from 'vue-async'
import Viewer from 'v-viewer'
import modalRouter from './modal-router/index'

import componentMap from 'oa-core/views/components/index'
import OaLayouts from 'oa-core/views/layouts/index'
import VueBemHelper from 'oa-core/vendor/vue-bem-helper'

import VueStForm from 'vue-st-form'

import filterMap from 'oa-core/filters/index'
import dirctiveMap from 'oa-core/directives/index'

import './styles/app.less'

import VueClipboard from 'vue-clipboard2'
class OaApp {
  constructor({
    // 前置路由
    beforeRoutes = [],
    // 后置路由
    afterRoutes = [],
    // vuex模块注入
    vuexModules = {},
    // guards 路由守卫
    guards = [],
    // layouts传入
    layouts = {},
    // 是否关闭授权认证
    isAuthClose = false,
    /**
     * 接入sentry的dsn public号
     */
    sentryDSN = '',
    watermarkRouteList = []
  }) {
    const allLayouts = Object.assign(OaLayouts, layouts)
    console.info(
      `[oa-core] platform -> [${process.env.PLATFORM}] registed-list ->`,
      {
        components: componentMap,
        layouts: allLayouts,
        filters: filterMap
      }
    )
    if (!Vue) {
      console.error('should pass [Vue]')
      return
    }
    if (!document.getElementById('app')) {
      console.error('[oa-core] need root element named #app')
      return
    }
    container.set('layouts', allLayouts)
    container.set('watermarkRouteList', watermarkRouteList)
    Vue.config.errorHandler = function(err, vm, info) {
      console && console.error(err, vm, info)
    }
    Vue.use(AntdVue)
      .use(VueAsync)
      .use(VueStForm)
      .use(VueBemHelper)
      // .use(vueAudioNative)
      .use(Styleguide, {
        namespaces: ['oa', 'crm']
      })
      .use(VueClipboard)
    for (let name in componentMap) {
      Vue.component(name, componentMap[name])
    }
    for (let name in filterMap) {
      Vue.filter(name, filterMap[name])
    }
    for (let name in dirctiveMap) {
      Vue.directive(name, dirctiveMap[name])
    }
    const store = createStore({ vuexModules })
    // vuex先行
    container.set('store', store)
    const router = createRouter({
      base: '/' + process.env.PLATFORM + '/',
      beforeRoutes,
      afterRoutes,
      guards
    })
    /**
     * router后初始化
     */
    container.set('isAuthClose', isAuthClose)
    container.set('router', router)
    container.set('modalRouter', modalRouter)

    Object.defineProperty(Vue.prototype, '$platform', {
      value: process.env.PLATFORM
    })
    Vue.use(Viewer)

    if (sentryDSN) {
      // 只在生产环境下开启
      SentryReporter.init({
        dsn: sentryDSN,
        environment: location.hostname,
        release: process.env.GIT_COMMIT,
        framework: {
          Vue
        }
      })
    }

    new Vue({
      store,
      router,
      modalRouter,
      render: h => h(App)
    }).$mount('#app')

    return {
      router,
      store
    }
  }
}

export default OaApp
