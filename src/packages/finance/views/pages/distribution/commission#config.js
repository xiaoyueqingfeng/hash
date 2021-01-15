export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      dataIndex: 'leads_id',
      fixed: 'left',
      width: '100px'
    },
    {
      title: '客户姓名',
      dataIndex: 'leads_name'
    },
    {
      title: '合伙人姓名',
      dataIndex: 'agent_name'
    },
    {
      title: '购买系统金额（元）',
      dataIndex: 'system_amount'
    },
    {
      title: '系统有效时长（天）',
      dataIndex: 'system_open_days'
    },
    {
      title: '分佣总金额（元）',
      dataIndex: 'amount'
    },
    {
      title: '总计分摊期数',
      dataIndex: 'periods'
    },
    {
      title: '每期分佣金额（元）',
      dataIndex: 'each_amount'
    },
    {
      title: '已分摊佣期数',
      dataIndex: 'picked_periods'
    },
    {
      title: '已分摊佣金额（元）',
      dataIndex: 'picked_amount'
    },
    {
      title: '待分摊佣余额（元）',
      dataIndex: 'unpick_amount'
    },
    {
      title: '退款后待分佣余额（元）',
      dataIndex: 'refund_unpick_amount'
    },
    {
      title: '系统开通时间',
      dataIndex: 'system_open_time',
      sorter: true,
      width: '140px'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true,
      width: '100px'
    },
    {
      title: '分佣状态',
      dataIndex: 'status_desc'
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
