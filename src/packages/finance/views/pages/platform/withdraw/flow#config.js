export const tableOptions = vm => ({
  columns: [
    {
      title: '流水号',
      dataIndex: 'id'
    },
    {
      title: '关联订单',
      dataIndex: 'order_id'
    },
    {
      title: '品牌ID',
      dataIndex: 'brand_id'
    },
    {
      title: '品牌名',
      dataIndex: 'leads_name'
    },
    {
      title: '类型',
      dataIndex: 'biz_type_text'
    },
    {
      title: '金额',
      dataIndex: 'amount'
    },
    {
      title: '入账状态',
      dataIndex: 'is_enter_text'
    },
    {
      title: '平台手续费',
      dataIndex: 'commission'
    },
    {
      title: '处理时间时间',
      dataIndex: 'created_time'
    }
  ]
})
