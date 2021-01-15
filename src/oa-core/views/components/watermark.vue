<template>
  <div class="watermark" v-watermarked="watermark_text"></div>
</template>

<script>
import WaterMark from 'oa-core/utils/watermark-img-create'
import { mapGetters } from 'vuex'
export default {
  name: '',

  props: {},

  data() {
    return {}
  },

  computed: {
    ...mapGetters('oa/user', ['watermark_text'])
  },

  directives: {
    watermarked: {
      bind(el, binding, vnode) {
        const mark = new WaterMark({
          width: 250,
          height: 250,
          textAlign: 'center',
          textBaseline: 'middle',
          font: '14px Arial',
          fillStyle: '',
          rotate: 330,
          content: binding.value,
          observe: true,
          $el: el
        })
        const imageURI = mark.createUrl()
        el.style.backgroundImage = `url(${imageURI})`
        el.style.backgroundRepeat = 'space repeat'
        el.style.pointerEvents = 'none'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.watermark {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: 0.1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
