<script>
export default {
  props: {
    // 支持st-icon的图标直接使用
    icon: {
      type: String,
      default: ''
    }
  },
  render(h) {
    return h(
      'a-button',
      {
        class: 'oa-button',
        props: this.$attrs,
        on: this.$listeners
      },
      [
        this.icon && h('oa-icon', { props: { type: this.icon } }),
        ...this.$slots.default
      ]
    )
  }
}
</script>

<style lang="less">
.oa-button {
  .oa-icon + span {
    .mg-l(8px);
  }
}
</style>
