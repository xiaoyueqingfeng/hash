<template>
  <oa-modal v-model="show" title="生成分享链接" @ok="submit">
    <div class="copy">
      <a-input v-model="linkUrl"></a-input>
      <a-button
        class="copy-btn"
        type="primary"
        v-clipboard:copy="linkUrl"
        v-clipboard:success="copyHandler"
        v-clipboard:error="errorHandler"
      >
        复制
      </a-button>
    </div>
    <div class="image">
      <a-spin :spinning="agentShareLink$loading" tip="图片加载中">
        <img :src="imageUrl" />
      </a-spin>
    </div>
  </oa-modal>
</template>
<script>
import Clipboard from 'clipboard'
import { agentShareLink } from '@/api/agent'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      show: true,
      linkUrl: '',
      imageUrl: ''
    }
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  async: {
    agentShareLink() {
      return agentShareLink({ id: this.id }).then(res => {
        this.linkUrl = get(res, 'url', '')
        this.imageUrl = 'data:image/jpg;base64,' + get(res, 'img', '')
      })
    }
  },
  created() {
    this.agentShareLink()
  },
  methods: {
    copyHandler() {
      this.$message.success('复制成功')
    },
    errorHandler() {
      this.$message.error('复制失败')
    },
    submit() {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.copy {
  position: relative;
  .copy-btn {
    position: absolute;
    right: 0;
  }
}
.image {
  text-align: center;
  .mg-t(16px);
}
</style>
