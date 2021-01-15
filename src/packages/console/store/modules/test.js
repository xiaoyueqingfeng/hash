import createStore from 'vuex-create-store'
const state = {
  a: 1
}
const mutations = {
  SET_A(state) {
    state.a = 2
  }
}

const actions = {
  getA({ commit }) {
    return Promise.resolve().then(() => {
      commit('SET_A')
    })
  }
}
const getters = {
  a: state => state.a
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
