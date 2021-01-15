export const columns = [
  {
    title: '标签名称',
    width: 150,
    fixed: 'left',
    dataIndex: 'name'
  },
  {
    title: '标签类目',
    dataIndex: 'category_tip'
  },
  {
    title: '状态',
    dataIndex: 'status_tip'
  },
  {
    title: '标签类型',
    dataIndex: 'type_tip'
  },
  {
    title: '创建人',
    dataIndex: 'created_user_name'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time'
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
