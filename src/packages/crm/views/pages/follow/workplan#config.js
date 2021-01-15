export const tableOptions = vm => ({
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
      width: 50
    },
    {
      title: '计划',
      dataIndex: 'total'
    },
    {
      title: '完成',
      dataIndex: 'status_finish_count'
    },
    {
      title: '延期',
      dataIndex: 'status_delay_count'
    },
    {
      title: '取消',
      dataIndex: 'status_cancel_count'
    },
    {
      title: '完成比例',
      dataIndex: 'finish_percent'
    }
  ]
})
