import createStore from 'vuex-create-store'
import { getCurrentUserInfo, getCrmCurrent } from 'oa-core/api/user'
import { listToTree } from 'oa-core/utils/list-to-tree'
import { listToMap } from 'oa-core/utils/list-to-map'

const state = {
  // 用户最大菜单列表
  menu_list: [],
  // 用户角色列表
  role: {},
  // 用户基本信息
  user_info: {},

  // 可用平台列表
  platform_list: [],
  // auth_rea 各个子项目的auth_area
  auth_area: {}
}

const mutations = {
  GET_CURRENT_USER_INFO_SUCCESS(state, { req, res }) {
    state.menu_list = res.menu_list
    state.role = res.role_list
    state.user_info = res.user_info
    state.platform_list = res.role_list.platform_info || []
  },
  GET_PLATFORM_CURRENT_SUCCESS(state, { req, res }) {
    state.auth_area = res.auth_area
  }
}

const getters = {
  is_fresh: state => state.user_info.is_fresh,
  // 所有功能权限
  menu_list: state => state.menu_list,

  platform_list: state => {
    if (state.platform_list.length) {
      return state.platform_list
    } else {
      return [{ code: process.env.PLATFORM, name: process.env.PLATFORM }]
    }
  },

  webAuthList: state =>
    state.menu_list
      .filter(item => item.auth_key.indexOf('m/') === -1)
      .filter(item => !item.status),

  siderMenuList: state => state.menu_list.filter(item => !!item.status),
  siderMenuTree: (state, getters) => listToTree(getters.siderMenuList),
  siderMenuMap: (state, getters) => listToMap(getters.siderMenuList),

  user_info: state => state.user_info,
  user_id: state => (state.user_info && state.user_info.id) || '',
  role: state => state.role,
  auth_area: state => state.auth_area,
  watermark_text: state =>
    (state.user_info && state.user_info.watermark_text) || '',
  can_call_udesk: state =>
    (state.user_info && state.user_info.can_call_udesk) || 0,
  user_role_type: state =>
    (state.user_info &&
      state.user_info.role_info &&
      state.user_info.role_info.role_type) ||
    0
}

const actions = {
  getCurrentUserInfo() {
    return getCurrentUserInfo()
  },
  getPlatformCurrent() {
    if (process.env.PLATFORM === 'crm') {
      return getCrmCurrent()
    }
  }
}

export default createStore({
  namespaced: true,
  state,
  mutations,
  getters,
  actions
})
