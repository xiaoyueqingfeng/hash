import { parse } from 'oa-core/utils/webpack-key-path'

function generateComponents(contextComponent, { namespace = '' } = {}) {
  const layoutKeys = contextComponent.keys()
  const componentMap = {}
  layoutKeys.forEach(keyPath => {
    const file = contextComponent(keyPath)
    const component = file.default || file
    const parsed = parse(keyPath)
    if (/(#)/.test(parsed.entry)) {
      return
    }
    const componentName = namespace
      ? namespace + '-' + parsed.name
      : parsed.name
    componentMap[componentName] = component
  })
  return componentMap
}

export default generateComponents
