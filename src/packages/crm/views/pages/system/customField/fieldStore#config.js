export const tableColumns = [
  {
    title: '字段显示名称',
    dataIndex: 'name'
  },
  {
    title: '字段',
    dataIndex: 'fields_key'
  },
  {
    title: '字段key值',
    dataIndex: 'fields_unique_key'
  },
  {
    title: '类型',
    dataIndex: 'type_tip'
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status_tip'
  // },
  {
    title: '排序',
    dataIndex: 'list_order'
  },
  // {
  //   title: '操作人',
  //   dataIndex: 'creator_name'
  // },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    sorter: true
  },
  {
    title: '操作',
    width: 60,
    scopedSlots: { customRender: 'action' }
  }
]
