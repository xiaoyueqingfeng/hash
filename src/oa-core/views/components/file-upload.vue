<template>
  <div class="file-upload">
    <a-upload :showUploadList="false" :customRequest="upload">
      <div>
        <span class="file-upload__icon"></span>
        <span class="file-upload__name">{{ fileKey | enclosureFilter }}</span>
      </div>
    </a-upload>
    <div class="tips" v-if="tips">{{ tips }}</div>
  </div>
</template>
<script>
import { ossService } from 'oa-core/utils/oss.service'
import { OA, OA_PRIVATE } from 'oa-core/constants/oss'

export default {
  name: 'FileUpload',
  data() {
    return {
      loading: false,
      fileKey: ''
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
     *支持文件后缀
     */
    fileType: {
      type: String,
      default:
        'jpg,jpeg,3gpp,ac3,asf,au,css,csv,doc,dot,dtd,dwg,dxf,gif,htm,html,jp2,jpe,jpeg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,pdf,PDF,png,pot,pps,ppt,rtf,svf,tif,tiff,txt,wdb,wps,xhtml,xlc,xlm,xls,xlsx,xlt,xlw,xml,zip'
    }
  },
  watch: {
    file(n, o) {
      this.file = n
    }
  },
  methods: {
    upload(data) {
      const file = data.file
      this.loading = true
      let serviceType = OA
      if (this.isPrivate) serviceType = OA_PRIVATE
      ossService
        .put(file, {
          serviceType: serviceType,
          fileType: this.fileType,
          sizeLimit: this.sizeLimit
        })
        .then(res => {
          this.fileKey = res.key
          this.fileUrl = res.url
          this.$emit('upload', res.key)
          this.$emit('change', res.key)
        })
        .catch(e => {
          this.$message.error(e.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less">
.file-upload {
  cursor: pointer;
  &__icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 8px;
    background: url('~oa-core/assets/img/upload.png') no-repeat;
    background-size: cover;
  }
  &__name {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>
