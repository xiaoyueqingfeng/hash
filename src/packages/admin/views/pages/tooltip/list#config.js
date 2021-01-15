export const tableOptions = vm => ({
  columns: [
    {
      title: '唯一标识',
      dataIndex: 'sn'
    },
    {
      title: 'tooltips_ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '说明',
      width: '200px',
      dataIndex: 'description'
    },
    {
      title: '内容',
      width: '300px',
      dataIndex: 'content'
    },
    {
      title: '状态',
      // dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
