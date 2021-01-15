export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      dataIndex: 'leads_id',
      fixed: 'left',
      width: 100
    },
    {
      title: '品牌名称',
      dataIndex: 'leads_name'
    },
    {
      title: '场馆名称',
      dataIndex: 'shop_name'
    },
    {
      title: '场馆ID',
      dataIndex: 'shop_id'
    },
    {
      title: '自定义名称',
      dataIndex: 'custom_device_name'
    },
    {
      title: '产品名称',
      dataIndex: 'app_name'
    },
    {
      title: '设备类型',
      dataIndex: 'category_name'
    },
    {
      title: '设备ID',
      dataIndex: 'device_id'
    },
    {
      title: '在线状态',
      dataIndex: 'online_status_tip'
    },
    {
      title: '当前软件版本',
      dataIndex: 'version_name'
    },
    {
      title: '待更新版本',
      dataIndex: 'app_version_to_update'
    },
    {
      title: '来源',
      dataIndex: 'source_type'
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
