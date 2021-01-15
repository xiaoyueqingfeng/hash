export const tableOptions = vm => ({
  columns: [
    {
      title: '申请时间',
      dataIndex: 'created_time'
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
      title: '可提现金额(元)',
      dataIndex: 'current_amount'
    },
    {
      title: '本次提现金额(元)',
      dataIndex: 'amount'
    },
    {
      title: '账户名',
      dataIndex: 'account_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '银行账号',
      dataIndex: 'card_number'
    },
    {
      title: '状态',
      dataIndex: 'status_name',
      scopedSlots: { customRender: 'status_name' }
    },
    {
      title: '操作人',
      dataIndex: 'auditor_name'
    },
    {
      title: '处理时间',
      dataIndex: 'audit_time'
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
