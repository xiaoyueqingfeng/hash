import { parse } from 'oa-core/utils/webpack-key-path'

function generateLayouts(
  contextLayout,
  { namespace = '' } = {},
  appendLayouts = {}
) {
  const layoutKeys = contextLayout.keys()
  const layoutMap = {}
  layoutKeys.forEach(keyPath => {
    const file = contextLayout(keyPath)
    const component = file.default || file
    const parsed = parse(keyPath)
    if (/(#)/.test(parsed.entry)) {
      return
    }
    const layoutName = namespace
      ? namespace + '/' + parsed.entry_dash
      : parsed.entry_dash
    layoutMap[layoutName] = component
  })
  return Object.assign(layoutMap, appendLayouts)
}

export default generateLayouts
