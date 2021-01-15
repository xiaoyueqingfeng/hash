<template>
  <section class="sg-section">
    <h3>oa-file-upload</h3>
    <section class="sg-section">
      <h5 name="text">只可以上传png大小不能超过5M</h5>
      <oa-file-upload :sizeLimit="5" fileType="png" @upload="getFile" />
      <a
        :href="'http://styd-crm-dev.oss-cn-shanghai.aliyuncs.com/' + key"
        target="_blank"
      >
        预览
      </a>
    </section>
    <section class="sg-section">
      <h5 name="text">只可以上传txt大小不能超过1M</h5>
      <oa-file-upload :sizeLimit="1" fileType="txt" />
    </section>
    <section class="sg-section">
      <h5 name="text">只可以上传mp3大小不能超过10M</h5>
      <oa-file-upload :sizeLimit="10" fileType="mp3" />
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      key: ''
    }
  },
  created() {},
  methods: {
    getFile(para) {
      this.key = para
      console.log(para)
    }
  }
}
</script>
