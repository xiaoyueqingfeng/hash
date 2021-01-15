export const tableOptions = vm => ({
  columns: [
    {
      title: '类型',
      dataIndex: 'system_type_desc'
    },
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: '版本号',
      dataIndex: 'version_no'
    },
    {
      title: '版本名称',
      dataIndex: 'version_name'
    },
    {
      title: '系统',
      dataIndex: 'os_type_desc'
    },
    {
      title: 'URL',
      dataIndex: 'url'
    },
    {
      title: '状态',
      dataIndex: 'push_status_desc'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
