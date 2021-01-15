export const tableOptions = vm => ({
  columns: [
    {
      title: '客户名称',
      fixed: true,
      width: 180,
      dataIndex: 'brand_name',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: 'leadsID',
      dataIndex: 'id'
    },
    {
      title: '客户等级',
      dataIndex: 'brand_level_tip'
    },
    {
      title: '最近拜访时间',
      dataIndex: 'last_visit_time',
      sorter: true
    },
    {
      title: '掉入公海时间',
      dataIndex: 'throw_public_sea_time',
      sorter: true
    },
    {
      title: '掉入公海原因',
      dataIndex: 'throw_public_sea_remark'
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
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '运营模式',
      dataIndex: 'work_model_tip'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
