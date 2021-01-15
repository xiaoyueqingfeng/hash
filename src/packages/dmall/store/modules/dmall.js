import createStore from 'vuex-create-store'
import { getEnumMap } from '@/api/enum'
import { getCategoryOptions } from '@/api/goods'
import { getSelectList } from '@/api/suppliers'
import { getBankList } from '@/api/common'
import { flatten } from 'lodash'
const state = {
  goodsStatus: [],
  categoryStatus: [],
  orderStatus: [],
  emallOrderStatus: [],
  supplierOptions: [],
  distributorLevel: [],
  reasonOptions: [],
  oaReasonOptions: [],
  bankOptions: [],
  brandTypeOptions: [],
  channelOptions: []
}
const mutations = {
  SET_GOODS_STATUS(state, payload) {
    state.goodsStatus = payload
  },
  SET_CATEGORY_STATUS(state, payload) {
    state.categoryStatus = payload
  },
  SET_ORDER_STATUS(state, payload) {
    state.orderStatus = payload
  },
  SET_REASON_OPTIONS(state, payload) {
    state.reasonOptions = payload
  },
  SET_OA_REASON_OPTIONS(state, payload) {
    state.oaReasonOptions = payload
  },
  SET_BANK_OPTIONS(state, payload) {
    state.bankOptions = flatten(Object.values(payload))
  },
  SET_SUPPLIER_STATUS(state, payload) {
    state.supplierOptions = payload.map(item => {
      return {
        name: item.supplier_name,
        id: item.id
      }
    })
  },
  SET_DISTRIBUTOR_TYPE(state, payload) {
    state.distributorLevel = payload
  },
  SET_SUPPLIER_TYPE(state, payload) {
    state.supplierType = payload
  },
  SET_CHANNEL_OPTIONS(state, payload) {
    state.channelOptions = payload
  },
  SET_EMALL_ORDER_STATUS(state, payload) {
    state.emallOrderStatus = payload
  },
  SET_BRAND_TYPE_OPTIONS(state, payload) {
    state.brandTypeOptions = payload
  }
}
const actions = {
  getEnumMap({ commit }) {
    return getEnumMap().then(res => {
      commit('SET_GOODS_STATUS', res.goods_status)
      commit('SET_ORDER_STATUS', res.order_status)
      commit('SET_DISTRIBUTOR_TYPE', res.distributor_level)
      commit('SET_SUPPLIER_TYPE', res.supplier_type)
      commit('SET_OA_REASON_OPTIONS', res.oa_refund_reason)
      commit('SET_CHANNEL_OPTIONS', res.goods_channel)
      commit('SET_REASON_OPTIONS', res.reasons)
      commit('SET_BRAND_TYPE_OPTIONS', res.brand_type)
      commit('SET_EMALL_ORDER_STATUS', res.emall_order_status)
    })
  },
  getCategoryStatus({ commit }) {
    return getCategoryOptions().then(res => {
      commit('SET_CATEGORY_STATUS', res.list)
    })
  },
  getSupplierOptions({ commit }) {
    return getSelectList().then(res => {
      commit('SET_SUPPLIER_STATUS', res.list)
    })
  },
  getBankOptions({ commit }) {
    return getBankList().then(res => {
      commit('SET_BANK_OPTIONS', res)
    })
  }
}
const getters = {
  goodsStatus: state => state.goodsStatus,
  categoryStatus: state => state.categoryStatus,
  orderStatus: state => state.orderStatus,
  emallOrderStatus: state => state.emallOrderStatus,
  supplierOptions: state => state.supplierOptions,
  distributorLevel: state => state.distributorLevel,
  reasonOptions: state => state.reasonOptions,
  channelOptions: state => state.channelOptions,
  oaReasonOptions: state => state.oaReasonOptions,
  showReasonList: state => {
    return [...state.oaReasonOptions, ...state.reasonOptions]
  },
  bankOptions: state => state.bankOptions,
  supplierType: state => state.supplierType,
  brandTypeOptions: state => state.brandTypeOptions
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
