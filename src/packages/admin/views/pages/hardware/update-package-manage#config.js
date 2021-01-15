export const tableOptions = vm => ({
  columns: [
    {
      title: '更新包名称',
      fixed: 'left',
      width: 200,
      dataIndex: 'apk_name'
    },
    {
      title: '更新包类型',
      dataIndex: 'apk_type_tips'
    },
    {
      title: '版本号',
      dataIndex: 'version_name'
    },
    {
      title: '设备类型',
      dataIndex: 'category_name'
    },
    {
      title: '产品名称',
      dataIndex: 'app_name'
    },
    {
      title: 'version_code',
      dataIndex: 'app_ver'
    },
    {
      title: '更新包状态',
      dataIndex: 'apk_status_tips'
    },
    {
      title: '更新包说明',
      dataIndex: 'description'
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
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
