export const tableOptions = vm => ({
  columns: [
    {
      title: 'LeadsId',
      dataIndex: 'leads_id'
    },
    {
      title: '品牌名称',
      dataIndex: 'brand_name'
    },
    {
      title: 'POS机数量',
      dataIndex: 'pos_count'
    },
    {
      title: '添加时间',
      dataIndex: 'created_date'
    },
    {
      title: '状态',
      dataIndex: 'status_desc'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
