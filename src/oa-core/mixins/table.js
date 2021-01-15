import { pick } from 'lodash-es'

export default {
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      oldOrder_by: ''
    }
  },
  computed: {
    // 多选是否至少勾选一项
    tbIsSelected() {
      return this.selectedRowKeys.length > 0
    },
    // 没有一项选中
    tbNoSelected() {
      return this.selectedRowKeys.length === 0
    },
    tbPrevPage() {
      return this.$searchQuery.p
    }
  },
  methods: {
    tbOnSelectionChange(keys, rows) {
      this.selectedRowKeys = keys
      this.selectedRows = rows
    },
    /**
     * @description 清除勾选项
     */
    tbOnSelectionReset() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    /**
     * @description 条件搜索
     */
    tbOnFilterSearch(FilterKeyWords = 'keywords') {
      this.tbOnSelectionReset()
      this.$router.push({
        query: {
          ...this.$searchQuery,
          ...{ [FilterKeyWords]: '' },
          p: 1
        }
      })
    },
    /**
     * 单个筛选项的即时搜索 @change="onSingleSearch('card_type',$event)"
     */
    tbOnSearch() {
      this.tbOnSelectionReset()
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1
        }
      })
    },
    /**
     * @description 关键词搜索，去除其他条件，并跳转至第一页
     */
    tbOnSearchKeywords(key, data) {
      this.tbOnSelectionReset()
      this.$router.push({
        query: {
          p: 1,
          ...{ [key]: data }
        }
      })
    },
    /**
     * @description 关键词搜索，去除其他条件，并跳转至第一页
     */
    tbOnKeywordsSearch(key, data, keepFields = []) {
      this.tbOnSelectionReset()
      this.$router.push({
        query: {
          p: 1,
          ps: this.$searchQuery.ps,
          ...{ [key]: data },
          ...pick(this.$searchQuery, keepFields)
        }
      })
    },
    /**
     * @description 勾选项清除，筛选条件清除，回到第一页
     */
    tbOnReset() {
      this.tbOnSelectionReset()
      this.$router.push({
        query: {
          p: 1,
          mode: 'filter'
        }
      })
    },
    // 表格更新
    tbOnTableChange(pagination, filter, sorter) {
      console.log('pagination', pagination)
      this.tbOnSelectionReset()
      // 排序字段 排序顺序
      let order_by
      if (sorter && sorter.field) {
        order_by = `${sorter.field}_${
          { descend: 'desc', ascend: 'asc' }[sorter.order]
        }`
      }
      if (!pagination) {
        throw new Error(
          `[tableMixin] pagination is not provide ${typeof pagination}`
        )
      }

      const nextPage =
        pagination.current !== this.prevPage ? pagination.current : 1
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: nextPage,
          order_by
        }
      })
    },
    // 表格更新
    tbOnTableNoClearSelectChange(pagination, filter, sorter) {
      // 排序字段 排序顺序
      let order_by
      if (sorter && sorter.field) {
        if (sorter.order) {
          order_by = `${sorter.field}_${
            { descend: 'desc', ascend: 'asc' }[sorter.order]
          }`
        }
        if (!this.oldOrder_by || this.oldOrder_by !== order_by) {
          this.tbOnSelectionReset()
        }
        this.oldOrder_by = order_by
      }
      if (!pagination) {
        throw new Error(
          `[tableMixin] pagination is not provide ${typeof pagination}`
        )
      }

      const nextPage =
        pagination.current !== this.prevPage ? pagination.current : 1
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: nextPage,
          ps: pagination.pageSize,
          order_by
        }
      })
    }
  }
}
