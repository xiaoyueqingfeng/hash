export const tableOptions = vm => ({
  columns: [
    {
      title: 'ID',
      fixed: 'left',
      width: 80,
      dataIndex: 'id'
    },
    {
      title: '设备类型',
      dataIndex: 'device_id_tip'
    },
    {
      title: '版本号',
      dataIndex: 'version'
    },
    {
      title: '版本名称',
      dataIndex: 'version_name'
    },
    {
      title: '版本状态',
      dataIndex: 'status_tip'
    },
    {
      title: '推送类型',
      dataIndex: 'push_tip'
    },
    {
      title: 'CODE',
      dataIndex: 'code'
    },
    {
      title: 'URL',
      dataIndex: 'url'
    },
    {
      title: '创建人',
      dataIndex: 'created_user'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
    },
    {
      title: '推送时间',
      sorter: true,
      dataIndex: 'push_time'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
