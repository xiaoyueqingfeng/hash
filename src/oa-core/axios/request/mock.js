import { MOCK_BASE_URL } from 'oa-core/constants/config'

export default config => {
  if (process.env.NODE_ENV === 'production') return config
  if (
    config.mock &&
    config.mock.enable &&
    config.mock.status &&
    config.mock.status !== 200
  ) {
    const mockUrl = `${MOCK_BASE_URL}/api/${config.mock.status}`
    console.warn(
      `[req-mock interceptor] "${config.url}" -> ${mockUrl} on API Status: ${
        config.mock.status
      }`
    )
    config.url = mockUrl
    return config
  }
  if (config.mock) {
    const mockUrl = `${MOCK_BASE_URL}/${config.mock}${config.url}`
    console.warn(`[req-mock interceptor] "${config.url}" -> ${mockUrl}`)
    config.url = `${mockUrl}`
  }

  return config
}
