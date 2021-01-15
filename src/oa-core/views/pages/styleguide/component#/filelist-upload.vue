<template>
  <div class="sg-section">
    <h4>oa-filelist-upload</h4>
    <oa-filelist-upload
      :fileCountLimit="1"
      fileType="xls,xlsx"
      tips="支持扩展名：xls或.xlsx文件且不超过50kb"
      @change="handlerLockerFilesChange"
    ></oa-filelist-upload>
    {{ content }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: []
    }
  },
  methods: {
    handlerLockerFilesChange(e) {
      this.content = e
    }
  }
}
</script>
