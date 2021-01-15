export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      fixed: 'left',
      width: 100,
      dataIndex: 'id'
    },
    {
      title: '客户名称',
      dataIndex: 'name'
    },
    {
      title: '版本',
      dataIndex: 'system_version'
    },
    {
      title: '系统开通时间',
      dataIndex: 'system_open_time'
    },
    {
      title: '操作',
      key: 'action',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
