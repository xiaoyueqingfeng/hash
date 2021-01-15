import { getUserFieldsForm } from '@/api/list'
import { cloneDeep } from 'lodash-es'
export default {
  data() {
    return {
      authKey: '',
      columns: [] // 表格需要展示的字段列表
    }
  },
  computed: {
    columnsAction() {
      return (
        this.tableColumns &&
        this.tableColumns.filter(
          column => column.customRenderIndex === 'action'
        )[0]
      )
    }
  },
  created() {
    this.authKey = this.$route.meta.authKey || 'web/pay/list'
    this.getUserFieldsForm()
  },
  methods: {
    // 设置当前表格需展示的列项
    handleGetTableColumns(checkedColumns) {
      let columns = []
      let tableColumns = cloneDeep(this.tableColumns)
      checkedColumns.map(column => {
        let result = tableColumns.filter(c => {
          let dKey = c.dataIndex || c.customRenderIndex
          return dKey === column.fields_key
        })
        if (result.length) {
          result = result[0]
          if (!result.slots || !result.slots.title) result.title = column.name
          columns.push(result)
        }
      })
      if (this.columnsAction) columns.push(this.columnsAction)
      this.columns = columns
    },
    // 获取用户可展示的列项(全量需过滤)
    getUserFieldsForm() {
      return getUserFieldsForm({
        auth_key: this.authKey
      })
        .then(res => {
          let checkedColumns = res.list.filter(item => item.is_checkout)
          // .map(item => item.fields_key)
          // 设置当前表格需展示的列项
          this.handleGetTableColumns(checkedColumns)
          // 计算当前表格的宽度,来使用不同的展示形式
          this.handleCountTableWrapperWidth &&
            this.handleCountTableWrapperWidth()
          // 表格重置
          // this.handleTableResize()
        })
        .catch(err => {
          this.columns = this.tableColumns
        })
    }
  }
}
