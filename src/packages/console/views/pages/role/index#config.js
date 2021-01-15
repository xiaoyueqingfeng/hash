export const tableOptions = vm => ({
  columns: [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '角色名称', dataIndex: 'name' },
    {
      title: '角色属性',
      scopedSlots: { customRender: 'roleType' }
    },
    {
      title: '可用平台',
      scopedSlots: { customRender: 'platform_info' }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
})
