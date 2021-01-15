export default {
  data() {
    return {
      columnRealWidth: 0, // 表格实际官渡
      tableScrollX: true, // 表格x轴展示宽度
      tableRef: null // 表格的ref
    }
  },
  mounted() {
    // 获取当前表格的dom节点
    this.$nextTick(() => {
      if (!this.tableRef) this.tableRef = this.$refs.tableCon
      window.addEventListener('resize', this.handleTableResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleTableResize)
  },
  methods: {
    // 当页面变化时,重新计算表格宽度,来使用不同的展示形式
    handleTableResize() {
      console.log('tabeResize')
      let tableCon = this.tableRef.$el
      let tableWidth = tableCon.getBoundingClientRect().width
      if (this.columnRealWidth < tableWidth) {
        // 容器宽大于表格列宽合则去除列宽,去除固定列
        // this.tableScrollX = tableWidth
        this.tableScrollX = false
        this.columns = this.columns.map(column => {
          const { width, fixed, ...reset } = column
          if (
            column.customRenderIndex &&
            column.customRenderIndex === 'action'
          ) {
            reset.width = column.width
          }
          return { ...reset }
        })
      } else {
        // 容器宽小于表格列宽合则正常展示(有固定列,有列宽的使用列宽)
        this.tableScrollX = this.columnRealWidth
      }
    },
    // 计算当前表格的宽度,来使用不同的展示形式
    handleCountTableWrapperWidth() {
      this.columnRealWidth = 62
      this.columns.map(
        column => (this.columnRealWidth += column.width ? column.width : 0)
      )
    }
  }
}
