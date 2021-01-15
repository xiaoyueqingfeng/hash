<template>
  <a-popover
    arrowPointAtCenter
    v-model="visible"
    overlayClassName="oa-more-dropdown"
    placement="bottomRight"
  >
    <a class="oa-more-dropdown__icon">
      <oa-icon type="more"></oa-icon>
    </a>
    <template slot="content">
      <ul class="oa-more-dropdown__menu" @click="onClickMenu">
        <slot></slot>
      </ul>
    </template>
  </a-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onClickMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.oa-more-dropdown {
  &__icon {
    .c(@text-light);
  }
  .ant-popover-inner-content {
    .w(120px);
    .pd(4px 0);
  }
  &__menu {
    .lh(22px);
    .fz(14px);

    a {
      display: block;
      white-space: nowrap;
      .c(#3e4d5c);
      .pd(8px 16px);
      &:hover {
        .bg(fade(@primary-color, 10));
        .c(@primary-color);
      }
    }
  }
}
</style>
