import axios from 'axios'
import reqAddHeader from './request/add-header'
import reqFormurlEncoded from './request/form-url-encoded'
import reqMock from './request/mock'

import resNumberic from './response/numberic'
import resSuccessHandler from './response/success-handler'
import resErrorHandler from './response/error-handler'

const axiosInstance = axios.create()
axiosInstance.defaults.timeout = 10000
axiosInstance.defaults.retry = 3
axiosInstance.defaults.retryDelay = 1000

// request
axiosInstance.interceptors.request.use(reqAddHeader)
axiosInstance.interceptors.request.use(reqFormurlEncoded)
axiosInstance.interceptors.request.use(reqMock)

// response
axiosInstance.interceptors.response.use(resNumberic)
axiosInstance.interceptors.response.use(resSuccessHandler, resErrorHandler)

export default axiosInstance
