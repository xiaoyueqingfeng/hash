<template>
  <div :class="b()" v-show="show" @click="$emit('update:show', false)">
    <div class="close" @click="$emit('update:show', false)"></div>
    <div :class="b('content')" @click.stop>
      <div :class="b('swiper')">
        <swiper
          :options="swiperOptionMain"
          class="swiper__main"
          ref="swiperMain"
        >
          <!-- pc弹窗公告 -->
          <swiper-slide v-for="pc in pc_basemap" :key="pc.key" class="slide">
            <div
              class="system-pc"
              v-if="from === 'system'"
              :style="{ backgroundImage: `url(${pc.url})` }"
            >
              <!-- <div class="system-pc__bg">
                <img :src="pc.url" alt="" />
              </div> -->
              <div class="system-pc__title">{{ title }}</div>
              <div class="system-pc__content" v-html="popup_content"></div>
              <div class="system-pc__button">
                <oa-button type="primary">我知道了</oa-button>
              </div>
            </div>
            <div class="activity-pc" v-else>
              <img :src="pc.url" alt="" />
            </div>
          </swiper-slide>
          <!-- app弹窗公告  -->
          <swiper-slide v-for="app in app_basemap" :key="app.key" class="slide">
            <div
              class="system-app"
              v-if="from === 'system'"
              :style="{ backgroundImage: `url(${app.url})` }"
            >
              <!-- <div class="system-app__bg">
                <img :src="app.url" alt="" />
              </div> -->
              <div class="system-app__title">{{ title }}</div>
              <div class="system-app__content" v-html="popup_content"></div>
              <div class="system-app__button">
                <div><span>我知道了</span></div>
              </div>
            </div>
            <div class="activity-app" v-else>
              <img :src="app.url" alt="" />
            </div>
          </swiper-slide>
          <!-- app引导公告  -->
          <swiper-slide
            v-for="start in app_start_basemap"
            :key="start.key"
            class="slide"
          >
            <div class="activity-start">
              <img :src="start.url" alt="" />
            </div>
          </swiper-slide>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper
          :options="swiperOptionThumbs"
          class="swiper__thumbs"
          ref="swiperThumbs"
        >
          <swiper-slide
            v-for="system in pc_basemap"
            :key="system.key"
            class="swiper__thumbs__slide"
          >
            <img :src="system.url" alt="" />
          </swiper-slide>
          <swiper-slide
            v-for="activity in app_basemap"
            :key="activity.key"
            class="swiper__thumbs__slide"
          >
            <img :src="activity.url" alt="" />
          </swiper-slide>
          <swiper-slide
            v-for="guide in app_start_basemap"
            :key="guide.key"
            class="swiper__thumbs__slide"
          >
            <img :src="guide.url" alt="" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { get } from 'lodash-es'
export default {
  name: '',

  bem: {
    b: 'notice-preview'
  },

  components: {
    swiper,
    swiperSlide
  },

  props: {
    previewInfo: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean
    },
    from: {
      type: String
    }
  },

  data() {
    return {
      swiperOptionMain: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },

  computed: {
    pc_basemap() {
      return get(this.previewInfo, 'pc_basemap', [])
    },
    app_basemap() {
      return get(this.previewInfo, 'app_basemap', [])
    },
    app_start_basemap() {
      return get(this.previewInfo, 'app_start_basemap', [])
    },
    title() {
      return get(this.previewInfo, 'title', '')
    },
    popup_content() {
      return get(this.previewInfo, 'popup_content', '')
    }
  },

  async: {},

  mounted() {
    this.$nextTick(() => {
      const swiperMain = this.$refs.swiperMain.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperMain.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperMain
    })
  },

  methods: {}
}
</script>
<style lang="less">
.notice-preview {
  .swiper__main {
    .swiper-button-prev,
    .swiper-button-next {
      width: 48px;
      height: 48px;
      background-size: 48px 48px;
    }
    .swiper-button-prev {
      background-image: url('~@/assets/images/icon_arrow-left@2x.png');
    }
    .swiper-button-next {
      background-image: url('~@/assets/images/icon_arrow-right@2x.png');
    }
    .swiper-button-next.swiper-button-disabled {
      background-image: url('~@/assets/images/icon_arrow-right-active@2x.png');
    }
  }
  .swiper__thumbs {
    .swiper__thumbs__slide.swiper-slide-active {
      border-color: #1890ff;
    }
  }
}
</style>
<style lang="less" scoped>
.notice-preview {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  .close {
    position: absolute;
    top: 38px;
    right: 56px;
    width: 20px;
    height: 20px;
    background: url('~@/assets/images/icon_close@2x.png') no-repeat;
    background-size: 100% 100%;
  }
  &__content {
    width: 100%;
    height: 590px;
  }
}
.swiper__main {
  margin-bottom: 50px;
}
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
.system-pc {
  width: 640px;
  height: 360px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 120px;
  background-color: #fff;
  &__title {
    padding: 24px 24px 0;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(37, 42, 46, 1);
    line-height: 24px;
    margin-bottom: 10px;
  }
  &__content {
    padding: 0 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(62, 77, 92, 1);
    line-height: 22px;
    margin-bottom: 16px;
    height: 110px;
    overflow-y: auto;
  }
  &__button {
    display: flex;
    justify-content: center;
  }
}
.activity-pc {
  width: 640px;
  height: 360px;
  img {
    width: 100%;
    height: 100%;
  }
}
.system-app {
  width: 342px;
  height: 406px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  padding-top: 146px;
  background-color: #fff;
  &__title {
    padding: 24px 24px 0;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(37, 42, 46, 1);
    line-height: 24px;
    margin-bottom: 10px;
  }
  &__content {
    padding: 0 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(62, 77, 92, 1);
    line-height: 22px;
    margin-bottom: 24px;
    height: 110px;
    overflow-y: auto;
  }
  &__button {
    display: flex;
    justify-content: center;
    div {
      width: 240px;
      height: 44px;
      background: rgba(31, 110, 238, 1);
      border-radius: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        text-align: center;
      }
    }
  }
}
.activity-app {
  width: 342px;
  height: 406px;
  img {
    width: 100%;
    height: 100%;
  }
}
.activity-start {
  width: 310px;
  height: 446px;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper__thumbs {
  &__slide {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
    border: 2px solid rgba(255, 255, 255, 0.45);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
