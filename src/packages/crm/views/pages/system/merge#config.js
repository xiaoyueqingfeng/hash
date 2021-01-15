export const tableColumns = [
  {
    title: '操作时间',
    dataIndex: 'operation_time'
  },
  {
    title: '被合并客户ID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '被合并客户名称',
    dataIndex: 'name'
  },
  {
    title: '客户状态',
    dataIndex: 'status'
  },
  {
    title: '前任跟进销售',
    dataIndex: 'sale_name'
  },
  {
    title: '前任跟进硬件销售',
    dataIndex: 'hardware_sale_name'
  },
  {
    title: '前任跟进客续',
    dataIndex: 'custom_renew_server_name'
  },
  {
    title: '前任跟进客运',
    dataIndex: 'custom_operation_server_name'
  },
  {
    title: '主账号客户ID',
    dataIndex: 'master_leads_id'
  },
  {
    title: '操作人',
    dataIndex: 'operation_user'
  }
]
