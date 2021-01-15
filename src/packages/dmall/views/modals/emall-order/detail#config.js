export const tableGoodsOptions = vm => ({
  columns: [
    {
      title: '商品名称',
      dataIndex: 'goods_name'
    },
    {
      title: '规格',
      dataIndex: 'goods_spec_desc'
    },
    {
      title: '单价',
      dataIndex: 'goods_price'
    },
    {
      title: '数量',
      dataIndex: 'goods_number'
    },
    {
      title: '售后状态',
      dataIndex: 'refund_status'
    }
  ]
})
export const tableRefundOptions = vm => ({
  columns: [
    {
      title: '退款单号',
      dataIndex: 'refund_sn',
      fixed: 'left'
    },
    {
      slots: { title: 'refundItems' },
      dataIndex: 'refund_items',
      width: 400,
      scopedSlots: { customRender: 'refund_items' }
    },
    {
      title: '是否发货',
      dataIndex: 'is_send_out',
      width: '110px',
      scopedSlots: { customRender: 'is_send_out' }
    },
    {
      title: '发起退款时间',
      dataIndex: 'refund_time',
      width: '200px',
      sorter: true
    },
    {
      title: '退款完成时间  ',
      dataIndex: 'end_time',
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
      width: 160,
      scopedSlots: { customRender: 'voucher' }
    },
    {
      title: '退款操作人',
      width: '210px',
      dataIndex: 'operator_name'
    }
  ]
})
