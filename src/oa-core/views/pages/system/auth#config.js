export const tableOptions = vm => ({
  columns: [
    {
      title: '排序',
      scopedSlots: { customRender: 'checkbox' }
    },

    {
      title: '功能权限',
      dataIndex: 'name'
    },
    {
      title: 'auth_key',
      scopedSlots: { customRender: 'auth_key' }
    },
    {
      title: '设置数据权限',
      width: 360,
      scopedSlots: { customRender: 'operation' }
    }
  ]
})
