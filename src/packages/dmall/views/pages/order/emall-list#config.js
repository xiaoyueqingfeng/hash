export const tableOptions = vm => ({
  columns: [
    {
      title: '订单编号',
      dataIndex: 'order_sn',
      fixed: 'left',
      scopedSlots: { customRender: 'detail' }
    },
    {
      slots: { title: 'goodsItems' },
      width: 400,
      scopedSlots: { customRender: 'order_items' }
    },

    {
      title: '物流信息',
      dataIndex: 'express_info',
      width: 120
    },
    {
      title: '供应商',
      dataIndex: 'supplier_name',
      width: 120
    },
    {
      title: '订单状态',
      dataIndex: 'status_desc',
      width: 160,
      scopedSlots: { customRender: 'status_desc' }
    },
    {
      title: '售后',
      width: 160,
      dataIndex: 'refund_status'
    },
    {
      title: '消费者手机号',
      width: '120px',
      dataIndex: 'mobile'
    },
    {
      title: '',
      scopedSlots: { customRender: 'purchaser_type' }
    },
    {
      title: '订单金额(元)',
      width: '240px',
      dataIndex: 'order_price',
      scopedSlots: { customRender: 'order_price' }
    },
    {
      title: '退款金额(元)',
      width: '240px',
      dataIndex: 'refund_amount',
      scopedSlots: { customRender: 'refund_amount' }
    },
    {
      title: '付款完成时间',
      dataIndex: 'pay_time',
      width: '240px',
      sorter: true
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      width: '240px',
      sorter: true
    },
    {
      title: '操作',
      key: 'operation',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
