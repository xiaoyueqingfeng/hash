export const tableOptions = vm => ({
  columns: [
    {
      title: '品牌',
      dataIndex: 'brand_name'
    },
    {
      title: 'leadsID',
      dataIndex: 'leads_id'
    },
    {
      title: '分销商数',
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
      title: '商家分成总金额(元)',
      dataIndex: 'total_brand_profit'
    },
    {
      title: '冻结中金额(元)',
      dataIndex: 'freezing_amount'
    },
    {
      title: '已结算金额(元)',
      dataIndex: 'used_withdrawable_amount'
    },
    {
      title: '剩余结算金额(元)',
      dataIndex: 'total_withdrawable_amount'
    }
  ]
})
