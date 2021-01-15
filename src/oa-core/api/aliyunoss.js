import axios from 'oa-core/axios'
import {
  SASS,
  SASS_PRIVATE,
  OA,
  OA_PRIVATE,
  HARDWARE,
  APK
} from 'oa-core/constants/oss'
/**
 * 获取阿里token
 * @param {object.type} 请求的相关服务 SASS SASS_PRIVATE OA OA_PRIVATE HARDWARE
 * @param {object.hardwareSkuId} 硬件包skuid
 */
export const getPolicy = ({
  serviceType = OA,
  hardwareSkuId = '',
  business = null
} = {}) => {
  console.log('serviceType', serviceType)
  /**
   * saas相关 oss服务 business 必填
   */
  switch (serviceType) {
    case SASS:
      return axios.get('/api/aliyunoss/saas_public_policy', {
        platform: 'console'
      })
    case SASS_PRIVATE:
      throw new Error('oss api [isPrivate isSaas] is not support yet')
    case OA:
      return axios.get('/api/aliyunoss/enclosure_policy', {
        platform: 'console'
      })
    case OA_PRIVATE:
      return axios.get('/api/aliyunoss/enclosure_private_policy', {
        platform: 'console'
      })
    case HARDWARE:
      return axios.get('/api/iot/upload_apk', {
        params: {
          app_id: hardwareSkuId
        }
      })
    case APK:
      return axios.get('/api/aliyunoss/apk_upload_policy', {
        platform: 'console'
      })
  }
}
