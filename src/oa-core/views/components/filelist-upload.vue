<template>
  <div class="multiple-file-upload">
    <a-upload :customRequest="upload" :fileList="fileList" @change="onChange">
      <a-button>
        <a-icon type="upload" />
        上传文件
      </a-button>
    </a-upload>
    <div class="tips margin-t8" v-if="tips">{{ tips }}</div>
  </div>
</template>
<script>
import { ossService } from 'oa-core/utils/oss.service'
import { OA, OA_PRIVATE } from 'oa-core/constants/oss'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'FileUpload',
  data() {
    return {
      fileList: []
    }
  },
  props: {
    /**
     * 是否上传到私有云
     *
     */
    isPrivate: {
      type: Boolean,
      default: true
    },
    /**
     * 提示
     *
     */
    tips: {
      type: String,
      default: ''
    },
    /**
    大小限制 单位M */
    sizeLimit: {
      type: Number,
      default: 5
    },
    /**
    文件个数限制 */
    fileCountLimit: {
      type: Number,
      default: 1
    },
    /**
     *支持文件后缀
     */
    fileType: {
      type: String,
      default:
        'jpg,jpeg,3gpp,ac3,asf,au,css,csv,doc,dot,dtd,dwg,dxf,gif,htm,html,jp2,jpe,jpeg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,pdf,PDF,png,pot,pps,ppt,rtf,svf,tif,tiff,txt,wdb,wps,xhtml,xlc,xlm,xls,xlsx,xlt,xlw,xml,zip'
    },
    serviceType: {
      type: String,
      default: OA
    }
  },
  watch: {
    fileList: {
      handler(newList) {
        console.log('newList', newList)
        let list = newList.filter(file => file.key)
        this.$emit('change', list)
      },
      deep: true
    }
  },
  methods: {
    onChange(info) {
      let fileList = [...info.fileList]
      let file = info.file
      // if (!ossService.validateFileSize(file.size, this.sizeLimit)) {
      //   return false
      // }
      // const suffix = ossService.getFileSuffix(file.name)
      // if (!ossService.validateFileType(this.fileType, suffix)) {
      //   return false
      // }
      // 根据count限制文件列表数据
      this.fileList = fileList.splice(
        fileList.length - this.fileCountLimit,
        fileList.length
      )
    },
    upload(data) {
      const file = data.file
      let serviceType = this.serviceType
      if (this.isPrivate) serviceType = OA_PRIVATE
      console.log('upload loading')
      ossService
        .put(file, {
          serviceType: serviceType,
          fileType: this.fileType,
          sizeLimit: this.sizeLimit
        })
        .then(res => {
          console.log('upload success')
          this.fileList.forEach(f => {
            if (f.uid === file.uid) {
              f.status = 'done'
              f.url = res.url
              f.key = res.key
            }
          })
        })
        .catch(e => {
          console.log('upload error')
          this.$message.error(e.message)
          this.fileList.forEach(f => {
            if (f.uid === file.uid) {
              f.status = 'error'
              f.url = ''
              f.key = ''
            }
          })
        })
    }
  }
}
</script>
<style lang="less">
.multiple-file-upload {
}
</style>
