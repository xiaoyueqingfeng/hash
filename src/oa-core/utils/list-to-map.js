import { forEach } from 'lodash-es'

/**
 * 将数组列表转换为map表
 * @param { Array<Object> } list
 * @param { stirng } keyField 指定键名字段
 * @return { Object }
 * @example
 *
 * const arr = [{id:1,name:"a"},{id:2,name:'b'},{id:3,name:'c}]
 * listToMap(arr)=> {1:{id:1,name:'a'},2:{id:2,name:'b'},3:{id:3,name:"c"}}
 *
 */
export const listToMap = (list = [], { keyField = 'id' } = {}) => {
  const map = {}
  forEach(list, node => {
    const id = node[keyField]
    if (id in map) {
      throw new Error('[listToMap] duplicate id in list,can not to map')
    }
    map[id] = node
  })
  return map
}
