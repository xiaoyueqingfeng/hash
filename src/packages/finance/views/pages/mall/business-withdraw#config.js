export const tableOptions = vm => ({
  columns: [
    {
      title: '结算时间',
      dataIndex: 'settlement_time',
      sorter: true
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
      title: '结算账户',
      dataIndex: 'bank_user_name'
    },
    {
      title: '分支银行',
      dataIndex: 'bank_subbranch_name'
    },
    {
      title: '结算银行账户',
      dataIndex: 'bank_card_number'
    },
    {
      title: '本期结算金额(元)',
      dataIndex: 'settlement_current'
    },
    {
      title: '待结算冻结中金额(元)',
      dataIndex: 'settlement_frozen'
    },
    {
      title: '已结算总金额(元)',
      dataIndex: 'settled'
    },
    {
      title: '状态',
      dataIndex: 'status'
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
