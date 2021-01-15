import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import base from './modules/base'

Vue.use(Vuex)

const coreModules = {
  user,
  base
}

export default ({ vuexModules } = {}) => {
  const modules = {
    oa: {
      namespaced: true,
      modules: {
        ...coreModules
      }
    },
    // 自动注册vuex命名空间modules
    ...vuexModules
  }
  console.log('vuex modules', modules)
  return new Vuex.Store({
    modules
  })
}
