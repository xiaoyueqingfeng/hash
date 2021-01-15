export const tableOptions = vm => ({
  columns: [
    {
      title: '产品名称',
      dataIndex: 'product_name'
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      scopedSlots: { customRender: 'type' }
    },
    {
      title: '供应商编号',
      dataIndex: 'supplier_no'
    },
    {
      title: '供应商型号',
      dataIndex: 'model',
      scopedSlots: { customRender: 'model' }
    },
    {
      title: 'app_id',
      dataIndex: 'app_id'
    },
    {
      title: 'app_secret',
      dataIndex: 'app_secret'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
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
