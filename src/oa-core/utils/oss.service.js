import { getPolicy } from 'oa-core/api/aliyunoss'
import axios from 'axios'
import { OA } from 'oa-core/constants/oss'

class OssService {
  constructor() {
    this.form = {
      key: '',
      policy: '',
      OSSAccessKeyId: '',
      success_action_status: 200,
      signature: '',
      dir: '',
      host: ''
    }
  }

  validateFileType(fileType, suffix) {
    if (fileType && fileType.indexOf(suffix.slice(1)) === -1) return false
    return true
  }
  validateFileSize(fileSize, sizeLimit, ignoreSize = false) {
    if (ignoreSize) return true
    if (fileSize > sizeLimit * 1024 * 1024) {
      return false
    }
    return true
  }
  getFileSuffix(fileName) {
    return fileName.slice(fileName.lastIndexOf('.'))
  }
  init(serviceType = OA, hardwareSkuId = '') {
    return getPolicy({
      serviceType,
      hardwareSkuId
    }).then(res => {
      this.form.dir = res.policy_info.dir
      this.form.policy = res.policy_info.policy
      this.form.signature = res.policy_info.signature
      this.form.OSSAccessKeyId = res.policy_info.accessid
      this.form.host = res.policy_info.host
    })
  }
  put(file, userConfig = {}) {
    const config = Object.assign(
      {
        fileType: null,
        /**
         * 大小限制 单位M
         */
        sizeLimit: 5,
        /**
         * 是否忽略大小限制验证
         */
        ignoreSize: false
      },
      userConfig
    )
    if (!(file instanceof File)) {
      throw new Error('[oss.service]#put must provide file object')
    }
    // if (!('isPrivate' in config)) {
    //   throw new Error('[oss.service]#put must provide [isPrivate] field')
    // }
    if (
      !this.validateFileSize(file.size, config.sizeLimit, config.ignoreSize)
    ) {
      const sizeError = new Error('大小不能超过' + config.sizeLimit + 'M')
      return Promise.reject(sizeError)
    }
    /**
     * jpg jpeg 等的后缀名
     */
    const suffix = this.getFileSuffix(file.name)
    if (!this.validateFileType(config.fileType, suffix)) {
      const typeError = new Error(`不支持的文件类型,可接受${config.fileType}`)
      return Promise.reject(typeError)
    }

    return this.init(config.serviceType, config.hardwareSkuId).then(() => {
      let fileName = ''
      // 去除特殊字符
      if (file.name) {
        fileName = file.name.replace(/[?\s%<>&#\\:]/g, '').replace(suffix, '')
      }

      this.form.key = `${this.form.dir}${fileName}___${Math.random()
        .toString(16)
        .slice(3)}___${suffix}`

      let formData = new FormData()
      formData.append('key', this.form.key)
      formData.append('policy', this.form.policy)
      formData.append('dir', this.form.dir)
      formData.append('OSSAccessKeyId', this.form.OSSAccessKeyId)
      formData.append('success_action_status', this.form.success_action_status)
      formData.append('signature', this.form.signature)
      formData.append('file', file)
      return axios({
        url: this.form.host,
        method: 'POST',
        data: formData,
        onUploadProgress: userConfig.onProgress || function() {}
      }).then(() => {
        return {
          dir: this.form.dir,
          key: this.form.key,
          host: this.form.host,
          url: userConfig.isPrivate
            ? URL.createObjectURL(file)
            : this.form.host + '/' + this.form.key
        }
      })
    })
  }
}
export const ossService = {
  put(...args) {
    return new OssService().put(...args)
  }
}
