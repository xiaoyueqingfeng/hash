export const tableOptions = vm => ({
  columns: [
    {
      title: '退款单号',
      dataIndex: 'refund_sn',
      fixed: 'left'
    },
    {
      title: '关联订单',
      dataIndex: 'order_sn',
      fixed: 'left',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: '订单金额',
      width: '140px',
      dataIndex: 'order_amount'
    },
    {
      title: '是否发货',
      dataIndex: 'is_send_out',
      width: '110px',
      scopedSlots: { customRender: 'is_send_out' }
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      slots: { title: 'refundItems' },
      dataIndex: 'refund_items',
      width: 400,
      scopedSlots: { customRender: 'refund_items' }
    },
    {
      title: '退款金额(元)',
      width: '130px',
      dataIndex: 'refund_money'
    },
    {
      title: '退款状态',
      width: '110px',
      dataIndex: 'status_desc'
    },
    {
      title: '发起退款时间',
      dataIndex: 'apply_time',
      width: '200px',
      sorter: true
    },
    {
      title: '退款原因',
      width: '210px',
      dataIndex: 'reason_desc'
    },
    {
      title: '退款说明',
      width: '210px',
      dataIndex: 'refund_mark'
    },
    {
      title: '退款凭证',
      dataIndex: 'voucher',
      width: '160px',
      scopedSlots: { customRender: 'voucher' }
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
