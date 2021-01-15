/**
 * 百分比过滤器
 */
export const percentFilter = (v, fixed = 2) => {
  return `${(v * 100).toFixed(fixed)}%`
}

/**
 * 金额 k 过滤器
 */
export const toKFilter = v => {
  v = Number(v)
  if (!v) {
    return 0
  }
  const T1 = Math.pow(10, 3)
  const T2 = Math.pow(10, 4)

  if (v >= T2) {
    return (v / T2).toFixed(1).replace('.0', '') + '万'
  }
  if (v >= T1 && v) {
    return (v / T1).toFixed(1).replace('.0', '') + 'k'
  }
  if (v >= 0) {
    return v
  }
}

/**
 * 货币
 */
export const moneyFilter = (v, fixed = 2) => {
  const result =
    '¥' +
    Number(v)
      .toFixed(fixed)
      .replace(/\B(?=(?:\d{3})+\b)/g, ',')
  return result
}

/**
 * 单位过滤器
 */
export const unitFilter = (v, unit = '个') => {
  v = Number(v)
  if (!v) {
    return 0
  }
  return v + unit
}
