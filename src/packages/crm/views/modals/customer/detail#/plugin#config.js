export const tableOptions = vm => ({
  columns: [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: '1'
    },
    {
      title: '开通状态',
      dataIndex: 'status_tip',
      key: '2'
    },
    {
      title: '有效期开始时间',
      dataIndex: 'valid_from',
      key: '3'
    },
    {
      title: '有效期结束时间',
      dataIndex: 'valid_to',
      key: '4'
    },
    {
      title: '总时长',
      dataIndex: 'total_days',
      key: '5'
    },
    {
      title: '剩余时长',
      dataIndex: 'remaining_days',
      key: '6'
    }
  ]
})
