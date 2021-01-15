import createStore from 'vuex-create-store'
import { getOtherVersionList } from '@/api/version'

const state = {
  versionList: []
}

const mutations = {
  GET_VERSION_LIST_SUCCESS(state, { res }) {
    state.versionList = res
    console.log(res)
  }
}

const actions = {
  getVersionList() {
    return getOtherVersionList({
      // 获取所有版本信息，版本列表不会有太多，传较大的1000相当于全量返回
      p: 1,
      ps: 1000
    })
  }
}

const getters = {
  versionList: state => state.versionList
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
