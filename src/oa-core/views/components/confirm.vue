<template>
  <oa-modal v-bind="$attrs" v-model="model" v-on="$listeners">
    <div class="oa-confirm__header">
      <a-icon type="exclamation" class="oa-confirm__icon" />
      <oa-t3 class="oa-confirm__title">{{ title }}</oa-t3>
    </div>
    <div class="oa-confirm__body">
      <slot></slot>
    </div>
  </oa-modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      set(newVal) {
        this.$emit('input', newVal)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>

<style lang="less">
.oa-confirm {
  &__header {
    display: flex;
    .mg-t(24px);
  }
  &__icon {
    .s(22px, 22px);
    border-radius: 50%;
    .bg(@warning-color);
    .c(white);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    .mg-l(16px);
  }
  &__body {
    .mg-t(16px);
    .mg-l(38px);
  }
}
</style>
