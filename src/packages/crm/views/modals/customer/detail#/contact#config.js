export const tableOptions = vm => ({
  columns: [
    {
      title: '联系人名称',
      dataIndex: 'name'
    },
    {
      title: '手机号',
      scopedSlots: { customRender: 'mobile' }
    },
    {
      title: '座机号',
      dataIndex: 'landline'
    },
    {
      title: '微信号',
      dataIndex: 'wechat'
    },
    {
      title: 'KP',
      dataIndex: 'kp_tip'
    },
    {
      title: '职务',
      dataIndex: 'job'
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
