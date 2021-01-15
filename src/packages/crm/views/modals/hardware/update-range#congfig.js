export const tableOptions = vm => ({
  columns: [
    {
      title: '门店',
      dataIndex: 'shop_name'
    },
    {
      title: '产品名称',
      dataIndex: 'app_name'
    },
    {
      title: '设备',
      dataIndex: 'mac'
    },
    {
      title: '下发时版本',
      dataIndex: 'device_version_name'
    },
    {
      title: '下发版本',
      dataIndex: 'apk_version_name'
    }
  ]
})
