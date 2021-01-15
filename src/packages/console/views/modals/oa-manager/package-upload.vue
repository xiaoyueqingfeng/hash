<template>
  <oa-modal
    v-model="show"
    title="安装包上传"
    :confirmLoading="uploadPackage$loading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item label="安装包:" v-bind="formCol">
        <oa-filelist-upload
          :class="b('input')"
          :fileCountLimit="1"
          :isPrivate="false"
          fileType="apk"
          tips="支持扩展名：.apk (安装包小于30M)"
          :sizeLimit="30"
          :serviceType="APK"
          @change="handlePackageUpload"
        ></oa-filelist-upload>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { uploadPackage } from '@/api/appversion'
import { get } from 'lodash-es'
import { APK } from 'oa-core/constants/oss'

export default {
  name: 'oa-manager-package-upload',

  bem: {
    b: 'package-upload'
  },

  components: {},

  props: {
    versionInfo: {
      type: Object,
      default: null,
      required: true
    }
  },

  data() {
    const form = this.$stForm.create()

    return {
      form,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      show: false,
      file: {},
      APK
    }
  },

  computed: {
    versionId() {
      return get(this.versionInfo, 'id')
    }
  },

  async: {
    uploadPackage(queryOptions) {
      return uploadPackage(queryOptions).then(res => {
        this.$message.success('版本推送成功')
        this.show = false
        this.$emit('done')
      })
    }
  },

  methods: {
    handlePackageUpload(list) {
      console.log('list', list)
      this.file = list[0]
    },
    handleSubmit() {
      this.form.validate().then(values => {
        let queryOptions = {
          version_id: this.versionId,
          url: this.file.url,
          oss_key: this.file.key
        }
        this.uploadPackage(queryOptions)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.package-upload {
  &__input {
    width: 280px;
    margin: 0 auto;
  }
}
</style>
