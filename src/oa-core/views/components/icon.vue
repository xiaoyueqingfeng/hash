<template>
  <svg
    v-if="!isAntIcon"
    class="oa-icon"
    :style="iconStyle"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="linkHref"></use>
  </svg>
  <a-icon v-else v-on="$listeners" :type="antType" fill="color" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    linkHref() {
      return `#oa-${this.type}`
    },
    isAntIcon() {
      return this.type.indexOf('anticon:') > -1
    },
    antType() {
      return this.type.split(':')[1]
    },
    iconStyle() {
      const _style = {}
      if (this.size) {
        _style.fontSize = this.size
      }
      if (this.color) {
        _style.fill = this.color
      }
      return _style
    }
  }
}
</script>

<style lang="less">
.oa-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  .fz(1em);
  fill: currentColor;
  overflow: hidden;
}
.ant-menu-item,
.ant-menu-submenu-title {
  .oa-icon {
    .mg-r(10px);
  }
}
.ant-menu-inline-collapsed {
  .ant-menu-item,
  .ant-menu-submenu-title {
    .oa-icon {
      font-size: 16px;
      .mg(0);
      & + span {
        max-width: 0;
        display: inline-block;
        opacity: 0;
      }
    }
  }
}
</style>
