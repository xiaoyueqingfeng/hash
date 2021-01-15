export const tableOptions = vm => ({
  columns: [
    {
      title: '订单编号',
      dataIndex: 'id'
    },
    {
      title: '商品类型',
      dataIndex: 'product_type_name'
    },
    {
      title: '商品名称',
      dataIndex: 'product_name'
    },
    {
      title: '订单状态',
      dataIndex: 'order_status_name'
    },
    {
      title: '支付状态',
      dataIndex: 'pay_status_name'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name'
    },
    {
      title: '手机号',
      dataIndex: 'member_mobile'
    },
    {
      title: '订单总价',
      dataIndex: 'total_price'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
    },
    {
      title: '支付时间',
      dataIndex: 'pay_last_time'
    }
  ]
})
