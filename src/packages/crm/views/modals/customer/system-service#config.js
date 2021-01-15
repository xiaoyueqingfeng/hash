export const columns = vm => [
  {
    title: 'ID',
    fixed: 'left',
    width: 100,
    dataIndex: 'id'
  },
  {
    title: '客户名称',
    dataIndex: 'name'
  },
  {
    title: '客户状态',
    dataIndex: 'type_tip'
  },
  {
    title: '城市',
    dataIndex: 'city_name'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '跟进销售',
    dataIndex: 'sale_name'
  },
  {
    title: '跟进硬件销售',
    dataIndex: 'hardware_sale_name'
  },
  {
    title: '跟进客运',
    dataIndex: 'custom_operation_server_name'
  },
  {
    title: '跟进客续',
    dataIndex: 'custom_renew_server_name'
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
