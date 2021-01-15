import { parse } from 'oa-core/utils/webpack-key-path'

function generateModals(
  modalContext,
  { namespace = '' } = {},
  appendRoutes = []
) {
  const modalKeys = modalContext.keys()
  const routes = []
  modalKeys.forEach(keyPath => {
    const file = modalContext(keyPath)
    const component = file.default || file
    const parsed = parse(keyPath)
    if (/(#)/.test(parsed.entry)) {
      return
    }
    routes.push({
      name: namespace ? namespace + '/' + parsed.entry_dash : parsed.entry_dash,
      component
    })
  })
  return routes.concat(appendRoutes)
}

export default generateModals
