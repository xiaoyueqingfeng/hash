import { forEach, mergeWith } from 'lodash-es'
import { parse } from 'oa-core/utils/webpack-key-path'

/**
 * webpack require.context() 上下文
 * @param contextPage
 */
function generatePages(contextPage, { namespace = '' } = {}, routeModify = {}) {
  const pageKeys = contextPage.keys()
  const pageRoutes = []
  const pageMap = {}
  /**
   * 因为pageKeys本身就是有序列表，即从目录向文件遍历的顺序
   * 所以这里直接使用map方式检测父级
   */
  pageKeys.forEach(keyPath => {
    const file = contextPage(keyPath)
    const component = file.default || file
    const parsed = parse(keyPath)
    // 忽略带#符号 不论是在文件夹或文件名中
    if (/(#)/.test(parsed.entry)) {
      return
    }
    const dirName = namespace
      ? `${namespace}/` + parsed.dir_dash
      : parsed.dir_dash
    const hasParent = !!pageMap[dirName]
    const pageName = namespace
      ? `${namespace}/` + parsed.entry_dash
      : parsed.entry_dash

    const route = {
      // custom/info/detail -> custom-info-detail
      name: pageName,
      parent: hasParent ? dirName : null,
      meta: {
        layout: 'default'
      },
      path: hasParent ? parsed.name : '/' + parsed.entry,
      component
    }
    pageMap[pageName] = route
    if (hasParent) {
      const routeParent = pageMap[route.parent]
      routeParent.children = routeParent.children || []
      routeParent.children.push(route)
    }
    // 顶层路由节点
    if (!hasParent) {
      pageRoutes.push(route)
    }
  })

  function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }
  forEach(routeModify, (routeOpts, routeName) => {
    const oldOpts = pageMap[routeName]
    pageMap[routeName] = mergeWith(oldOpts, routeOpts, customizer)
  })
  return pageRoutes
}

export default generatePages
