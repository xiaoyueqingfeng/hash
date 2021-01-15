import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR
} from 'oa-core/constants/http-status'
import { notification } from 'ant-design-vue'
import container from 'oa-core/container'
import { removeAuthToken } from 'oa-core/utils/cookie'

// 业务逻辑错误
class LogicError extends Error {
  constructor(opts) {
    super(opts.message)
    this.name = 'LogicError'
    this.code = opts.code
    this.data = opts.data
    // http-status
    this.status = opts.status
    // not report to sentry
    this.noReport = true
  }
}

export default axiosError => {
  // 同时只显示一个类型的通知
  notification.close('HttpError')
  const response = axiosError.response

  // 有响应的判断
  if (response) {
    // http状态码
    const status = response.status
    // 服务器响应数据
    const serverResponse = response.data
    switch (status) {
      case BAD_REQUEST:
        notification.warning({
          // message: '请求参数错误',
          // description: serverResponse.msg
          message: serverResponse.msg,
          key: 'HttpError'
        })
        return Promise.reject(
          new LogicError({
            status,
            code: serverResponse.code,
            message: serverResponse.msg,
            data: serverResponse.data
          })
        )

      case UNAUTHORIZED:
        removeAuthToken()
        notification.warning({
          message: '未授权',
          key: 'HttpError',
          description: serverResponse.msg
        })
        const router = container.get('router')
        router.push({
          name: 'oa/user-login',
          query: {
            _f: Math.random()
              .toString(16)
              .slice(2)
          }
        })
        return Promise.reject(axiosError)

      case FORBIDDEN:
        notification.warning({
          message: '无权限',
          key: 'HttpError',
          description: serverResponse.msg
        })
        return Promise.reject(axiosError)

      case INTERNAL_SERVER_ERROR:
        notification.warning({
          message: '服务器内部错误',
          key: 'HttpError',
          description: serverResponse.msg
        })
        return Promise.reject(axiosError)

      default:
        notification.error({
          message: '服务器其它错误',
          key: 'HttpError',
          description: status
        })
        return Promise.reject(axiosError)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    notification.error({
      message: '网络连接错误',
      key: 'HttpError',
      description: 'Network Error'
    })
  }
  return Promise.reject(axiosError)
}
