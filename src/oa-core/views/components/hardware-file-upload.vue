<template>
  <a-spin :spinning="loading" :tip="progress + '%'">
    <div class="file-upload">
      <a-upload
        :showUploadList="false"
        :customRequest="upload"
        :disabled="disabled"
      >
        <div>
          <span class="file-upload__icon"></span>
          <span class="file-upload__name">{{ fileKey | enclosureFilter }}</span>
        </div>
      </a-upload>
      <div class="tips" v-if="tips">{{ tips }}</div>
    </div>
  </a-spin>
</template>
<script>
import { ossService } from 'oa-core/utils/oss.service'
import { HARDWARE } from 'oa-core/constants/oss'
export default {
  name: 'FileUpload',
  data() {
    return {
      loading: false,
      progress: 0,
      fileKey: ''
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 硬件包SkuId
     *
     */
    hardwareSkuId: {
      type: Number,
      default: 0
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
     *支持文件后缀
     */
    fileType: {
      type: String,
      default:
        'jpg,jpeg,3gpp,ac3,asf,au,css,csv,doc,dot,dtd,dwg,dxf,gif,htm,html,jp2,jpe,jpeg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,pdf,PDF,png,pot,pps,ppt,rtf,svf,tif,tiff,txt,wdb,wps,xhtml,xlc,xlm,xls,xlsx,xlt,xlw,xml,zip'
    },
    value: {
      type: null
    }
  },
  watch: {
    value(n, o) {
      this.fileKey = n
    },
    loading(n) {
      this.$emit('loadingChange', n)
    }
  },
  methods: {
    upload(data) {
      const file = data.file
      this.loading = true
      ossService
        .put(file, {
          hardwareSkuId: this.hardwareSkuId,
          serviceType: HARDWARE,
          ignoreSize: true,
          onProgress: e => {
            this.progress = parseInt((e.loaded / e.total) * 100)
          }
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
