export const tableColumns = [
  {
    title: '列表名称',
    dataIndex: 'name'
  },
  {
    title: '已选字段',
    dataIndex: 'fields_count'
  },
  // {
  //   title: '变更时间',
  //   dataIndex: 'created_time'
  // },
  // {
  //   title: '操作人',
  //   dataIndex: 'creator_name'
  // },
  {
    title: '操作',
    width: 60,
    scopedSlots: { customRender: 'action' }
  }
]
