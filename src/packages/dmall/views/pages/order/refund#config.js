export const tableOptions = vm => ({
  columns: [
    {
      title: '退款单号',
      dataIndex: 'refund_sn'
    },
    {
      title: '退款商品',
      dataIndex: 'goods_name'
    },
    {
      title: '数量',
      dataIndex: 'number'
    },
    {
      title: '退款金额(元)',
      dataIndex: 'refund_money'
    },
    {
      title: '关联订单',
      dataIndex: 'order_sn',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: '退款状态',
      dataIndex: 'status_desc'
    },
    {
      title: '退款原因',
      dataIndex: 'reason_content'
    },
    {
      title: '发起退款时间',
      dataIndex: 'apply_time',
      sorter: true
    },
    {
      title: '退款完成时间',
      dataIndex: 'refund_time',
      sorter: true
    }
  ]
})
