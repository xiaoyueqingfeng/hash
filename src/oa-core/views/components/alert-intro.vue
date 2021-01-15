<template>
  <div class="oa-alert-intro">
    <slot></slot>
    <span v-if="$slots.actions" class="oa-alert-intro__actions">
      <slot name="actions"></slot>
    </span>
  </div>
</template>

<style lang="less">
.oa-alert-intro {
  .bg(#e6f7ff);
  border: 1px solid #bae7ff;
  border-radius: 4px;
  .pd(8px 24px);
  &__actions {
    display: inline-block;
    .mg-l(24px);
    a {
      .mg-r(24px);
    }
  }
}
</style>
