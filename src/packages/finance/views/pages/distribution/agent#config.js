export const tableOptions = vm => ({
  columns: [
    {
      title: '合伙人',
      dataIndex: 'agent_name',
      fixed: 'left',
      width: '140px',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: '来源',
      dataIndex: 'source_desc'
    },
    {
      title: '推荐客户数',
      dataIndex: 'recommend_count'
    },
    {
      title: '推荐客户付费数',
      dataIndex: 'recommend_buyed_count'
    },
    {
      title: '失效客户数',
      dataIndex: 'recommend_invalid_count'
    },
    {
      title: '推荐有效客户付费总金额（元）',
      dataIndex: 'buyed_amount'
    },
    {
      title: '总计获得佣金（元）',
      dataIndex: 'commission'
    },
    {
      title: '已提现佣金（元）',
      dataIndex: 'withdrawed_amount'
    },
    {
      title: '剩余可提现佣金（元）',
      dataIndex: 'withdraw_amount'
    },
    {
      title: '待分摊佣金余额（元）',
      dataIndex: 'unpicked_commission'
    }
  ]
})
