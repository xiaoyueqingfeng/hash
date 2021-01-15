export const tableOptions = vm => ({
  columns: [
    {
      title: '品牌名称',
      dataIndex: 'name'
    },

    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
