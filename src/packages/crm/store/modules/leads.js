import createStore from 'vuex-create-store'
const state = {
  leads_id: '',
  leads_sn: '',
  detail_auth: {},
  is_add_contact: false
}
const mutations = {
  SET_LEADS_ID(state, leads_id) {
    state.leads_id = leads_id
  },
  SET_LEADS_SN(state, leads_sn) {
    state.leads_sn = leads_sn
  },
  SET_DETAIL_AUTH(state, detail_auth) {
    state.detail_auth = detail_auth
  },
  SET_CONTACT(state, is_add_contact) {
    state.is_add_contact = is_add_contact
  }
}
const getters = {
  leads_id: state => state.leads_id,
  detail_auth: state => state.detail_auth,
  is_add_contact: state => state.is_add_contact,
  leads_sn: state => state.leads_sn
}

export default createStore({
  namespaced: true,
  state,
  mutations,
  getters
})
