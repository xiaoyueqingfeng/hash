import { isNil } from 'lodash-es'
/**
 * 通过map表递归寻找该节点在map中的路径
 * @param { string | number } value 需要寻找的模型值
 * @param { Object } map 数据map表 该map表键名是由keyField组成的
 * @param {string} parentField 节点父级字段
 * @return {Array}
 *
 * @example
 *
 * const map = {1:{parent_id:'0',name:'a'},2:{parent_id:'1',name:'b'}}
 * findPathWithMap('2',map) => ['1','2']
 */
export const findPathWithMap = (
  value,
  map = {},
  { parentField = 'parent_id' } = {}
) => {
  if (!parentField) {
    throw new Error('[findPathWithMap] should pass -> parentField')
  }
  if (isNil(value)) {
    return []
  }
  const _path = [value]
  let targetNode = map[value]
  // 必须本节点有效
  // 必须本节点parentField有效
  // 必须父节点有效
  while (
    targetNode &&
    targetNode[parentField] &&
    map[targetNode[parentField]]
  ) {
    _path.unshift(targetNode[parentField])
    targetNode = map[targetNode[parentField]]
  }
  return _path
}
