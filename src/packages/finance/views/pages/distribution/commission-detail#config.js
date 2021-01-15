export const tableOptions = vm => ({
  columns: [
    {
      title: '时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '获益人',
      dataIndex: 'agent_name'
    },
    {
      title: '推荐客户',
      dataIndex: 'leads_name'
    },
    {
      title: '本期分佣金额（元）',
      dataIndex: 'each_amount'
    },
    {
      title: '分摊期数',
      dataIndex: 'periods'
    },
    {
      title: '佣金总金额（元）',
      dataIndex: 'all_amount'
    },
    {
      title: '已分摊佣金额（元）',
      dataIndex: 'picked_amount'
    },
    {
      title: '入账后待分佣余额（元）',
      dataIndex: 'unpick_amount'
    },
    {
      title: '入账后待分摊佣金期数',
      dataIndex: 'unpick_periods'
    }
  ]
})
