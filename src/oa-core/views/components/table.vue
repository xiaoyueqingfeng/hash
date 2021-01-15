<script>
import { merge, get } from 'lodash-es'
export default {
  props: {
    pager: {
      type: null
    },
    pagination: {
      type: null
    },
    columns: {
      type: null
    },
    authKey: String
  },
  data() {
    return {
      isFullscreen: false,
      pageSize: 20
    }
  },
  computed: {
    tablePagination: {
      get() {
        if (this.pagination === false || this.pager === false) {
          return false
        }
        let _p = merge(
          {
            pageSize: this.pageSize
          },
          this.pagination
        )
        if (this.pager) {
          if (this.pager.ps) {
            _p.pageSize = +this.pager.ps || 20
          }
          if (this.pager.p) {
            _p.current = +this.pager.p || 1
          }
          _p.total = +this.pager.t || 0
        }
        return _p
      }
    },
    tableColumns() {
      return this.columns.map(column => {
        if (!column.sorter && !column.scopedSlots) {
          column.ellipsis = true
        }
        if (
          column.scopedSlots &&
          column.scopedSlots.customRender === 'action'
        ) {
          if (!column.width || column.width < 70) column.width = 70
          delete column.title
          column.slots = {
            title: 'actionTitle'
          }
        }
        return column
      })
    }
  },
  render(h) {
    const props = merge(
      {
        pagination: this.tablePagination,
        columns: this.tableColumns,
        size: 'small',
        locale: {
          emptyText: (
            <div class="mg-y24">
              <oa-empty />
            </div>
          )
        }
      },
      this.$attrs
    )
    const renderChildren = []
    for (let k in this.$slots) {
      renderChildren.push(h('template', { slot: k }, this.$slots[k]))
    }

    const showFullScreen = get(this.$attrs, 'showFullScreen', true)
    return h(
      'div',
      {
        class: ['oa-table', this.isFullscreen ? 'table-fixed' : ''],
        ref: 'oaTable'
      },
      [
        h(
          'a-table',
          {
            props,
            on: this.$listeners,
            scopedSlots: this.$scopedSlots,
            ref: 'aTable'
          },
          [
            ...renderChildren,
            h('oa-table-custom-action-title', {
              slot: 'actionTitle',
              props: {
                showFullScreen,
                authKey: this.authKey
              },
              on: {
                fullScreen: e => {
                  this.isFullscreen = e
                },
                resetTable: () => {
                  this.$emit('resetTable')
                }
              }
            })
          ]
        )
      ]
    )
  }
}
</script>

<style lang="less">
.oa-table {
  position: relative;
  background-color: #fff;
  &.table-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 666;
    margin: 0 !important;
  }
  .oa-table-fix-button {
    position: absolute;
    top: -4px;
    right: 0;
    width: 1em;
    height: 1em;
    z-index: 1;
  }
  .ant-table {
    td {
      // white-space: nowrap;
    }
  }
  .ant-table-row {
    &:nth-child(even) {
      .bg(rgba(0, 0, 0, 0.01));
    }
  }
  .ant-table-small {
    border: none;
  }

  .ant-pagination {
    &-item,
    &-item-link,
    &-prev,
    &-next {
      border-radius: 6px;
    }
    &-item-active {
      .bg(@primary-color);
      a {
        .c(@white);
      }
    }
  }
}
#body {
  .oa-table {
    .ant-table-scroll {
      .ant-table-body {
        overflow-y: hidden;
      }
    }
    .ant-table-thead {
      th {
        padding: 4px 8px;
        .bg(#fafafa);
      }
    }
    .ant-table-body {
      margin: 0;
    }
    .ant-table-column-sorter {
      // display: inline-block;
      // right: initial;
      // margin-left: 4px;
    }
    .ant-table-row {
      > td {
        padding: 4px 8px;
      }
    }
  }
}
</style>
