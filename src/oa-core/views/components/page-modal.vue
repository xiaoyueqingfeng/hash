<template>
  <a-drawer
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="value"
    wrapClassName="oa-page-modal"
  >
    <span class="oa-page-modal__close" @click="onClose" v-show="value">
      <a-icon type="close"></a-icon>
    </span>
    <div class="oa-page-modal__content">
      <slot></slot>
    </div>
    <oa-watermark v-if="hasShowWaterMarks"></oa-watermark>
  </a-drawer>
</template>

<script>
import container from 'oa-core/container'
import { mapGetters, mapMutations } from 'vuex'

export default {
  desc: '通用页面级模态窗组件',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('oa/base', ['hasShowWaterMarks'])
  },
  watch: {
    $route: {
      handler(newRoute) {
        let routeName = newRoute.name
        let watermarkRouteList = container.get('watermarkRouteList')
        let status = watermarkRouteList.includes(routeName)
        this.SET_WATERMARK_STATUS(status)
      },
      immediate: true
    }
  },
  methods: {
    onClose() {
      this.$emit('input', false)
    },
    ...mapMutations('oa/base', ['SET_WATERMARK_STATUS'])
  },
  created() {
    document.body.style = 'overflow:hidden;padding-right:6px'
  },
  beforeDestroy() {
    console.log('page-modal,destroy')
    document.body.style = ''
  }
}
</script>

<style lang="less">
.oa-page-modal {
  &__content {
    .pos-a;
    left: 0;
    top: 0;
    .w(100%);
    height: 100%;
    overflow: auto;
  }
  &__close {
    position: absolute;
    left: -32px;
    top: 0;
    width: 32px;
    height: 32px;
    background: @primary-color;
    text-align: center;
    line-height: 32px;
    border-radius: 4px 0px 0px 4px;
    .fz(12px);
    .c(white);
    cursor: pointer;
  }
  .ant-drawer-content-wrapper {
    top: 56px;
    bottom: 0;
    left: 224px;
    right: 0;
    width: auto !important;
    height: auto;
  }
  .ant-drawer-content {
    overflow: unset;
    background: rgba(240, 242, 245, 1);
  }
  .ant-drawer-body {
    padding: 0;
  }
}
</style>
