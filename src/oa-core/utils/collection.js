import { intersection, difference } from 'lodash-es'

/**
 * diff出两个数组的变化
 * @param {Array<string>} prev 前数组
 * @param {Array<string>} next 新数组
 * @return {object}
 */
export const diff = (prev = [], next = []) => {
  /**
   * 数组交集
   */
  const interArr = intersection(prev, next)
  const removed = difference(prev, interArr)
  const added = difference(next, interArr)
  return {
    removed,
    added
  }
}
