export const tableOptions = vm => ({
  columns: [
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true,
      width: '200px'
    },
    {
      title: '提现人',
      dataIndex: 'agent_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '可提现金额（元）',
      dataIndex: 'withdraw'
    },
    {
      title: '本次提现金额（元）',
      dataIndex: 'amount'
    },
    {
      title: '已提现总金额（元）',
      dataIndex: 'withdrawed'
    },
    {
      title: '账户名',
      dataIndex: 'payee_name'
    },
    {
      title: '银行账号',
      dataIndex: 'account_number'
    },
    {
      title: '状态',
      dataIndex: 'status_desc'
    },
    {
      title: '',
      width: 20,
      scopedSlots: { customRender: 'reject_reason' }
    },
    {
      title: '操作人',
      dataIndex: 'operator'
    },
    {
      title: '操作时间',
      dataIndex: 'operate_time',
      sorter: true
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
