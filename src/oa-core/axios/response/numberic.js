import { isPlainObject, isArray, isString, forEach } from 'lodash-es'

// 所有的数字化
function NumbericData(v, NUMBERIC_FIELDS, ctx, k) {
  if (isString(v) && /^\d+$/.test(v) && NUMBERIC_FIELDS.indexOf(k) > -1) {
    ctx[k] = +v
  }
  if (isPlainObject(v)) {
    forEach(v, (item, k) => NumbericData(item, NUMBERIC_FIELDS, v, k))
  }
  if (isArray(v)) {
    forEach(v, (item, k) => NumbericData(item, NUMBERIC_FIELDS, v, k))
  }
  return v
}

export default axiosResponse => {
  if (axiosResponse.config.numberic) {
    NumbericData(axiosResponse.data, axiosResponse.config.numberic || [])
  }
  return axiosResponse
}
