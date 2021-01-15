<template>
  <div class="tox-toolbar__group editor__upload">
    <a-upload
      :fileList="[]"
      :customRequest="upload"
      :beforeUpload="beforeUpload"
    >
      <a-icon type="upload" />
    </a-upload>
  </div>
</template>

<script>
import { ossService } from 'oa-core/utils/oss.service'

export default {
  name: 'EditImage',
  data() {
    return {}
  },
  props: {
    editor: Object
  },
  methods: {
    upload(data) {
      ossService
        .put(data.file, {
          serviceType: this.serviceType
        })
        .then(res => {
          this.$emit('change', { image: res, editor: this.editor })
        })
    },
    beforeUpload(file) {
      const MAX_SIZE = 2
      const isLimit = file.size / 1024 / 1024 < MAX_SIZE
      if (!isLimit) {
        this.$message.error({
          content: `上传图片最大不能超过${MAX_SIZE}M`
        })
      }
      return isLimit
    }
  }
}
</script>
