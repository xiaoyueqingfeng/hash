<template>
  <div class="oa-area-panel" :class="{ 'oa-area-panel--absolute': absolute }">
    <div class="oa-area-panel__header">
      <slot name="header"></slot>
    </div>
    <div class="oa-area-panel__body">
      <ul class="oa-area-panel__list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    absolute: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.oa-area-panel {
  display: inline-block;
  width: 200px;
  border-radius: 4px;
  border: 1px solid @border-color;
  .pos-r;
  &--absolute {
    .pos-a;
    top: -1px;
    left: 100%;
    margin-left: 24px;
  }
  &__header {
    padding: 6px 16px;
    .c(@title);
    border-bottom: 1px solid @divider;
    overflow: hidden;
    font-weight: 500;
    line-height: 24px;
  }
  &__body {
    height: 300px;
  }
  &__list {
    height: 300px;
    padding: 6px 0;
    overflow: auto;
    .ant-checkbox-wrapper {
      .w(100%);
      user-select: none;
    }
    li {
      line-height: 32px;
      padding-left: 16px;
      &:hover {
        .bg(#e6f7ff);
      }
    }
  }
}
</style>
