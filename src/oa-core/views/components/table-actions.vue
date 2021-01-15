<script>
export default {
  render(h) {
    const usefulSlotNodes = this.$slots.default
      ? this.$slots.default.filter(item => item.tag)
      : 0

    const allActions = []

    if (usefulSlotNodes.length) {
      usefulSlotNodes.forEach((item, idx) => {
        allActions.push(item)
        if (idx < usefulSlotNodes.length - 1) {
          allActions.push(
            h('a-divider', {
              class: 'oa-table-actions__divider',
              props: { type: 'vertical' }
            })
          )
        }
      })
    }

    const result = allActions.length
      ? h(
          'a-popover',
          {
            props: {
              overlayClassName: 'oa-table-actions',
              placement: 'left'
            },
            scopedSlots: {
              content: props => allActions
            }
          },
          [
            h('a', { class: 'oa-table-actions__trigger' }, [
              h('oa-icon', {
                props: { type: 'more-vertical' }
              })
            ])
          ]
        )
      : ''

    return result
  }
}
</script>

<style lang="less">
.oa-table-actions {
  z-index: 1001;
  .ant-popover-content {
    .pos-r;
    left: 4px;
  }
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-inner-content {
    .pd-tb(10px);
  }
  &__trigger {
    padding: 10px;
    .c(rgba(0, 0, 0, 0.15));
    &:hover {
      .c(rgba(0, 0, 0, 0.45));
    }
  }
  &__divider {
    // opacity: 0;
  }
}
</style>
