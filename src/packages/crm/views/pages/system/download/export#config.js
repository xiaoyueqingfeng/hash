export const tableOptions = vm => ({
  columns: [
    {
      title: '导出时间',
      fixed: 'left',
      width: 200,
      dataIndex: 'created_time'
    },
    {
      title: '类型',
      dataIndex: 'type_name'
    },
    {
      title: '状态',
      key: 'status_name',
      scopedSlots: { customRender: 'status_name' }
    },
    {
      title: '导出数量',
      dataIndex: 'rows'
    },
    {
      title: '操作人',
      dataIndex: 'operator_user_name'
    },
    {
      title: '操作',
      key: 'action',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
