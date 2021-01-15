export const tableOptions = vm => ({
  columns: [
    {
      title: '时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '订单编号',
      dataIndex: 'order_sn',
      width: '140px'
    },
    {
      title: '分销商',
      dataIndex: 'distributor_name'
    },
    {
      title: '分销商等级',
      dataIndex: 'distributor_level'
    },
    {
      title: '品牌',
      dataIndex: 'brand_name'
    },
    {
      title: 'leadsID',
      dataIndex: 'leads_id'
    },
    {
      title: '分销成本(元)',
      dataIndex: 'total_distributor_price'
    },
    {
      title: '订单售卖金额(元)',
      dataIndex: 'order_amount'
    },
    {
      title: '分销商利润(元)',
      dataIndex: 'distributor_profit'
    },
    {
      title: '手续费(元)',
      dataIndex: 'distributor_commission'
    },
    {
      title: '实际分销商利润(元)',
      dataIndex: 'distributor_real_profit'
    },
    {
      title: '商家分成金额(元)',
      dataIndex: 'brand_profit'
    },
    {
      title: '手续费(元)',
      dataIndex: 'brand_commission'
    },
    {
      title: '实际分成金额(元)',
      dataIndex: 'brand_real_profit'
    },
    {
      title: '状态',
      dataIndex: 'status_name'
    }
  ]
})
