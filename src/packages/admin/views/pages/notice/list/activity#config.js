export const tableOptions = vm => ({
  columns: [
    {
      title: '标题',
      width: 180,
      dataIndex: 'title',
      scopedSlots: { customRender: 'tableTitle' }
    },
    {
      title: '发送类型',
      dataIndex: 'send_type_text'
    },
    {
      title: '发送版本',
      dataIndex: 'send_version_text'
    },
    {
      title: '触达范围',
      dataIndex: 'send_aim_text'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
    },
    {
      title: '状态',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '排序',
      width: 80,
      scopedSlots: { customRender: 'edit_weight' }
    },
    {
      title: '弹窗有效期',
      dataIndex: 'valid_to'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
