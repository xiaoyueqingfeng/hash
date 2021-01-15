import avatarDefault from 'oa-core/assets/img/avatar_default.png'
import { decode } from 'oa-core/utils/name-crypto'
/**
 * 图片资源过滤器 https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1358.45ab17f15zRXcA
 */
export const imgFilter = (key, opts) => {
  let url = ''
  let connector = key.toString().includes('?') ? '&' : '?'
  if (!key) {
    return key
  }
  // blob: url 直接返回 不需处理
  if (key.indexOf('blob:') > -1) {
    return key
  }
  /**
   * 不存在http:// // https:// 等添加公有oss host
   */
  if (key.indexOf('http://') === 0 || key.indexOf('https://') === 0) {
    url = key
  }

  const configs = {
    interlace: 1,
    m: 'fill',
    // 目标图比原图大时也要处理
    limit: 0
  }
  let processConfigStr = ''
  if (opts && opts.m) {
    configs.m = opts.m
  }
  if (opts && opts.w) {
    configs.w = opts.w
  }
  if (opts && opts.h) {
    configs.h = opts.h
  }
  if (!opts) {
    return url
  }
  for (let i in configs) {
    processConfigStr += `,${i}_${configs[i]}`
  }
  const result_url = `${url}${connector}x-oss-process=image/resize${processConfigStr}`
  return result_url
}

/**
 * 头像类过滤器
 */
export function avatarFilter(key, options) {
  if (!key) {
    return avatarDefault
  } else {
    return imgFilter(key, options)
  }
}

export function enclosureFilter(key) {
  if (!key) {
    return
  }
  if (key.toString().indexOf('aliyuncs') > -1) {
    try {
      let reg = /([\w%-]+___.\w+)/
      let content = reg.exec(key)[0]
      name = decodeURI(content)
      return name
    } catch (error) {
      return key
    }
  } else {
    // 七牛
    // prettier-ignore
    return key.replace(/___.*___/, '').split('/')[key.replace(/___.*___/, '').split('/').length - 1]
  }
}
