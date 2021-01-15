<template>
  <div class="sg-section">
    <h3>oa-image-upload 图片上传</h3>
    <p>默认 最大上传大小5M</p>
    <div>
      <oa-image-upload v-model="list"></oa-image-upload>
      {{ list }}
    </div>
    <p>最大数量 [num-limit]</p>
    <div>
      <oa-image-upload v-model="list2" :num-limit="5"></oa-image-upload>
      {{ list2 }}
    </div>
    <p>最大数量 修改大小</p>
    <div>
      <oa-image-upload
        v-model="list"
        width="300px"
        height="200px"
      ></oa-image-upload>
    </div>
    <p>自定义文案</p>
    <div>
      <oa-image-upload
        v-model="list3"
        title="[title]"
        placeholder="[placeholder]"
      ></oa-image-upload>
    </div>
    <p class="mg-t16">自定义样式</p>
    <div>
      <oa-image-upload v-model="list3">这是一个自定义的内容</oa-image-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{ key: 'enclosure/20190510/ie2r8i2ic.jpg', url: '' }],
      list2: [
        { key: 'enclosure/20190510/ie2r8i2ic.jpg', url: '' },
        { key: 'enclosure/20190510/ie2r8i2ic.jpg', url: '' }
      ],
      list3: [
        {
          key: '',
          url:
            'http://styd-crm-dev.oss-cn-shanghai.aliyuncs.com/enclosure/20190430/gPMspipeLiYnBe6V.png'
        }
      ]
    }
  }
}
</script>
