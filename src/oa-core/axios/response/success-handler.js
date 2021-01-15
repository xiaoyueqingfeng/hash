import { notification } from 'ant-design-vue'

export default axiosResponse => {
  const serverResponse = axiosResponse.data
  if (serverResponse.code === 200) {
    if (serverResponse && serverResponse.data) {
      return serverResponse.data
    } else {
      process.env.NODE_ENV !== 'production' &&
        console.warn(
          '[res-success-handler interceptor] no serverResponse.data detected'
        )
      return axiosResponse
    }
  } else {
    notification.warning({
      message: '提示',
      description: serverResponse.msg
    })
    return Promise.reject(serverResponse)
  }
}
