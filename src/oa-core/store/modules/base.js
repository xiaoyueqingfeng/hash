import createStore from 'vuex-create-store'
import { find, findIndex, last, cloneDeep } from 'lodash-es'
import { walkTree } from 'oa-core/utils/walk-tree'
import regionTreeJson from 'oa-core/api/region.json'
import container from 'oa-core/container'

const state = {
  // 全量省、市、地区数据tree
  regionTree: regionTreeJson.data.list,
  tabs: [],
  collapsed: false,
  hasShowWaterMarks: false
}

const mutations = {
  ADD_TAB(state, toRoute) {
    console.log('ADD_TAB', toRoute, state)
    // 没有title 不执行
    if (!toRoute.meta.title) {
      return
    }
    const tab = find(state.tabs, { name: toRoute.name })
    if (!tab) {
      state.tabs.push({
        name: toRoute.name,
        title: toRoute.meta.title,
        query: toRoute.query,
        params: toRoute.params,
        autoCloseTab: toRoute.meta.autoCloseTab
      })
    } else {
      tab.query = toRoute.query
      tab.params = toRoute.params
    }
    state.tabs = state.tabs.filter(tab => {
      // 去掉哪些需要自动关闭tab的标签
      if (tab.autoCloseTab && tab.name !== toRoute.name) {
        return false
      }
      return true
    })
  },
  CLOSE_TAB(state, routeName) {
    const router = container.get('router')
    const currentRoute = router.currentRoute
    const tab = find(state.tabs, { name: routeName })
    if (!tab) {
      console.warn(`[oa/base/CLOST_TAB] ${routeName} is not find`)
      return
    }
    const tabIdx = findIndex(state.tabs, { name: routeName })
    const isCurrent = currentRoute.name === tab.name

    if (state.tabs.length > 1) {
      state.tabs.splice(tabIdx, 1)
      // 关闭的标签为当前路由时 跳到最后一个标签页
      if (isCurrent) {
        const lastTab = last(state.tabs)
        router.push(lastTab)
      }
    }
  },
  CHANGE_TAB(state, toRouteName) {
    const router = container.get('router')
    const currentRoute = router.currentRoute
    const tab = find(state.tabs, { name: toRouteName })
    const isCurrent = currentRoute.name === tab.name

    if (!isCurrent) {
      router.push(tab)
    }
  },
  SET_COLLAPSED(state, collapsed) {
    state.collapsed = collapsed
  },
  CLOSE_ALL_TABS(state) {
    const router = container.get('router')
    state.tabs = []
    router.push('/')
  },
  CLOSE_ALL_OTHER_TABS(state) {
    const router = container.get('router')
    const currentRoute = router.currentRoute
    state.tabs = state.tabs.filter(tab => tab.name === currentRoute.name)
  },
  SET_WATERMARK_STATUS(state, status) {
    console.log(status)
    state.hasShowWaterMarks = status
  }
}
const actions = {}

const getters = {
  regionTree: state => state.regionTree,
  // 只到第二级的城市数据tree
  cityTree: state => {
    const _cityTree = cloneDeep(state.regionTree)
    walkTree(_cityTree, node => {
      if (node.level === 2) {
        delete node.children
      }
    })
    return _cityTree
  },
  tabs: state => state.tabs,
  collapsed: state => state.collapsed,
  hasShowWaterMarks: state => state.hasShowWaterMarks
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
