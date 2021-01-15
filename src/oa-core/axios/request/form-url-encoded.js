import qs from 'qs'
export default config => {
  if (config.origin) {
    return config
  }
  if (!config.test && config.data) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;utf-8;'
    config.data = qs.stringify(config.data)
  }
  return config
}
