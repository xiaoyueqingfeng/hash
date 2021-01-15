export const tableOptions = vm => ({
  columns: [
    {
      title: '设备ID',
      dataIndex: 'device_id'
    },
    {
      title: '设备类型',
      dataIndex: 'device_type',
      scopedSlots: { customRender: 'type' }
    },
    {
      title: '产品名称',
      dataIndex: 'product_name'
    },
    {
      title: '所属产品',
      dataIndex: 'product_no'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
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
