export const tableOptions = vm => ({
  columns: [
    {
      title: '订单编号',
      width: '100px',
      dataIndex: 'order_sn'
    },
    {
      title: '商品名称',
      dataIndex: 'order_items',
      scopedSlots: { customRender: 'order_items' }
    },
    {
      title: '订单金额(元)',
      dataIndex: 'pay_amount'
    },
    {
      title: '购买后变更等级',
      dataIndex: 'level'
    },
    {
      title: '到期时间',
      dataIndex: 'valid_to'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
    }
  ]
})
