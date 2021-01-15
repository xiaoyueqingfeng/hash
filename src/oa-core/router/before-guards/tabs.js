import container from 'oa-core/container'
/**
 * 应用标签栏guard
 */
export default (to, from, next) => {
  const store = container.get('store')
  store.commit('oa/base/ADD_TAB', to)
  next()
}
