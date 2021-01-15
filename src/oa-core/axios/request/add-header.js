import { getAuthToken } from 'oa-core/utils/cookie'
import container from 'oa-core/container'
import { get } from 'lodash-es'

export default config => {
  /**
   * 使用原始传输配置
   */
  if (config.origin) {
    return config
  }
  const token = getAuthToken()
  const store = container.get('store')

  let uid = '-'
  if (store) {
    const user_info = store.getters['oa/user/user_info']
    uid = get(user_info, 'id', '-')
  }
  const rid =
    Date.now().toString(16) +
    Math.random()
      .toString(16)
      .slice(3)

  // uuid 生成 时间戳和随机数合并
  config.headers['X-Request-Id'] = `${uid};${rid}`

  config.headers['Authorization'] = token ? `Bearer ${token}` : ''
  config.headers['device-type'] = 1
  // 该请求的项目平台码
  config.headers['X-Platform-Code'] = process.env.PLATFORM
  // 所有get请求添加随机数

  config.params = config.params || {}
  console.log('config.yapi', config.yapi)
  if (config.yapi) {
    config.baseURL = 'https://doc.styd.cn/mock/'
    config.url = `${config.yapi}${config.url}`
  } else {
    if (!config.__headerAdded) {
      const platform = config.platform || process.env.PLATFORM
      if (platform && !config.mock) {
        config.url = '/_api/' + platform + config.url
      }
      config.__headerAdded = true
    }
  }
  return config
}
