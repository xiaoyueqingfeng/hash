export const tableOptions = vm => ({
  columns: [
    {
      title: '分类',
      dataIndex: 'name'
    },
    {
      title: '排序',
      dataIndex: 'sort_order'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
