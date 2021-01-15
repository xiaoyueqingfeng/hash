export const tableOptions = vm => ({
  columns: [
    {
      title: '客户名称',
      fixed: true,
      width: 180,
      scopedSlots: { customRender: 'detail' },
      dataIndex: 'brand_name'
    },
    {
      title: 'leadsID',
      dataIndex: 'id'
    },
    {
      title: '运营模式',
      dataIndex: 'work_model_tip'
    },
    {
      title: '客户等级',
      dataIndex: 'brand_level_tip'
    },
    {
      title: '城市',
      scopedSlots: { customRender: 'area' }
    },
    {
      title: '最近拜访时间',
      dataIndex: 'last_visit_time',
      sorter: true
    },
    {
      title: '删除原因',
      dataIndex: 'delete_reason'
    },
    {
      title: '删除时间',
      dataIndex: 'delete_time',
      sorter: true
    },
    {
      title: '操作人',
      dataIndex: 'delete_operator_name'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      width: 60,
      title: '操作',
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
