export const tableOptions = vm => ({
  columns: [
    {
      title: '商品名称',
      fixed: 'left',
      width: '300px',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' }
    },
    {
      title: '分类',
      dataIndex: 'category_name'
    },
    {
      title: '供应商',
      dataIndex: 'supplier_name'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      scopedSlots: { customRender: 'channel' }
    },
    {
      title: '排序',
      dataIndex: 'sort_order',
      sorter: true
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
