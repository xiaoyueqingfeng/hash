<template>
  <div id="index">
    <ul>
      <li v-for="(item, index) in imgArr" :key="index">
        <img :src="item" alt="图片描述" />
        <a @click="onLeft({ item, index })">左移</a>
        <a @click="onRight({ item, index })">右移</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'HelloWorld',
  data() {
    return {
      imgArr: [
        'http://www.caotama.com/wp-content/uploads/2017/08/4.jpg',
        'http://www.caotama.com/wp-content/uploads/2018/04/%E6%B1%97%E8%A1%80%E5%AE%9D%E9%A9%AC.png',
        'http://www.caotama.com/wp-content/uploads/2017/08/2.jpg'
      ]
    }
  },
  methods: {
    onLeft({ item, index }) {
      if (index != 0) {
        this.imgArr[index] = this.imgArr.splice(
          index - 1,
          1,
          this.imgArr[index]
        )[0]
      } else {
        this.imgArr.push(this.imgArr.shift())
      }
    },
    onRight({ item, index }) {
      if (index != this.imgArr.length - 1) {
        this.$set(
          this.imgArr,
          index,
          this.imgArr.splice(index + 1, 1, this.imgArr[index])[0]
        )
      } else {
        this.imgArr.unshift(this.imgArr.splice(index, 1)[0])
      }
    }
  },
  mounted() {
    const ViewerDom = document.getElementById('index')
    const viewer = new Viewer(ViewerDom, {
      // 相关配置项,详情见下面
    })
  }
}
</script>
