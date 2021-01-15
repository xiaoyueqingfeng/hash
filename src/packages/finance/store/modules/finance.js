import createStore from 'vuex-create-store'
import { getEnumMap } from '@/api/common'
const state = {
  withdrawStatus: []
}
const mutations = {
  SET_WITHDRAW_STATUS(state, payload) {
    state.withdrawStatus = payload
  }
}
const actions = {
  getEnumMap({ commit }) {
    return getEnumMap().then(res => {
      commit('SET_WITHDRAW_STATUS', res.withdraw_status)
    })
  }
}
const getters = {
  withdrawStatus: state => state.withdrawStatus
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
