export const tableOptions = vm => ({
  columns: [
    {
      title: '产品名称',
      fixed: 'left',
      width: 200,
      dataIndex: 'app_name'
    },
    {
      title: '设备类型',
      dataIndex: 'category_name'
    },
    {
      title: '更新包名称',
      dataIndex: 'apk_name'
    },
    {
      title: '版本号',
      dataIndex: 'version_name'
    },
    {
      title: '下发时间',
      dataIndex: 'issue_time',
      scopedSlots: { customRender: 'issue_time_tip' },
      sorter: true
    },
    {
      title: '状态',
      dataIndex: 'task_status_tip'
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    }
  ]
})
