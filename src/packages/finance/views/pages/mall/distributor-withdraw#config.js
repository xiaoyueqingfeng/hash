export const tableOptions = vm => ({
  columns: [
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '提现人',
      dataIndex: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '可提现金额(元)',
      dataIndex: 'can_balance'
    },
    {
      title: '本次提现金额(元)',
      dataIndex: 'current_balance'
    },
    {
      title: '已提现总金额(元)',
      dataIndex: 'amount_balance'
    },
    {
      title: '账户名',
      dataIndex: 'bank_user_name'
    },
    {
      title: '银行账号',
      dataIndex: 'bank_card_number'
    },
    {
      title: '支行名称',
      dataIndex: 'bank_subbranch_name'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '',
      width: 20,
      scopedSlots: { customRender: 'status_reason' }
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    },
    {
      title: '操作时间',
      dataIndex: 'operator_time',
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
