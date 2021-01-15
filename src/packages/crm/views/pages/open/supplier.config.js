export const tableOptions = vm => ({
  columns: [
    {
      title: '供应商编号',
      dataIndex: 'supplier_no'
    },
    {
      title: '供应商名称',
      dataIndex: 'supplier_name',
      scopedSlots: { customRender: 'supplier_name' }
    },
    {
      title: '账户ID',
      dataIndex: 'identifier'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '备注',
      dataIndex: 'remarks'
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
