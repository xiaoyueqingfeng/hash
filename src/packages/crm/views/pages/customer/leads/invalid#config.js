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
      title: '渠道',
      scopedSlots: { customRender: 'channel' }
    },
    {
      title: '城市',
      scopedSlots: { customRender: 'area' }
    },
    {
      title: '前任销售',
      dataIndex: 'pre_sale_name'
    },
    {
      title: '删除原因',
      width: 200,
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
      title: '运营模式',
      width: 80,
      dataIndex: 'work_model_tip'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
