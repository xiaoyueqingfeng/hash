export const tableOptions = vm => ({
  columns: [
    {
      title: '订单编号',
      dataIndex: 'order_sn',
      fixed: 'left',
      width: '200px',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: '  购买商品',
      dataIndex: 'order_items',
      width: '240px',
      scopedSlots: { customRender: 'order_items' }
    },
    {
      title: '订单金额(元)',
      width: '100px',
      dataIndex: 'order_amount'
    },
    {
      title: '订单状态',
      dataIndex: 'status_desc',
      width: '140px',
      scopedSlots: { customRender: 'status_desc' }
    },
    {
      title: '',
      width: 20,
      scopedSlots: { customRender: 'refund_reason' }
    },
    {
      title: '消费用户手机号',
      width: '120px',
      dataIndex: 'mobile'
    },
    {
      title: '',
      scopedSlots: { customRender: 'purchaser_type' }
    },
    {
      title: '分销商',
      dataIndex: 'distributor_name'
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
