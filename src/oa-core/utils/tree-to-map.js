/**
 * 通过树对象转换为map对象
 * @param { Array<Object> } treeData
 * @param { string } keyField 键名字段
 * @param { string } childrenField 孩子字段
 * @return { Object }
 *
 */

export const treeToMap = (
  treeData = [],
  { keyField = 'id', childrenField = 'children' } = {}
) => {
  const map = {}
  const walk = tree => {
    tree.forEach(node => {
      const id = node[keyField]
      if (id in map) {
        throw new Error('[treeToMap] duplicate id in tree,can not to map')
      }
      map[id] = node

      if (node[childrenField] && node[childrenField].length) {
        walk(node[childrenField])
      }
    })
  }

  walk(treeData)
  return map
}
