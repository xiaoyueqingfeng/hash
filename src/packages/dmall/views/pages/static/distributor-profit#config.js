export const tableOptions = vm => ({
  columns: [
    {
      title: '分销商',
      dataIndex: 'distributor_name'
    },
    {
      title: '当前级别',
      dataIndex: 'distributor_level'
    },
    {
      title: '售卖商品数',
      dataIndex: 'number'
    },
    {
      title: '售卖总金额(元)',
      dataIndex: 'total_amount'
    },
    {
      title: '分销成本',
      dataIndex: 'total_cost_price'
    },
    {
      title: '获得利润金额(元)',
      dataIndex: 'total_distributor_profit'
    },
    {
      title: '冻结中金额(元)',
      dataIndex: 'freezing_amount'
    },
    {
      title: '已提现金额(元)',
      dataIndex: 'used_withdrawable_amount'
    },
    {
      title: '剩余提现金额(元)',
      dataIndex: 'withdrawable_amount'
    }
  ]
})
