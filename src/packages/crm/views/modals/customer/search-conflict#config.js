export const columns = vm => [
  {
    title: 'ID',
    fixed: 'left',
    width: 100,
    dataIndex: 'id'
  },
  {
    title: '客户名称',
    dataIndex: 'brand_name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '客户状态',
    dataIndex: 'brand_type_tip'
  },
  {
    title: '是否有效',
    dataIndex: 'status_tip'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '城市',
    dataIndex: 'city_name'
  },
  {
    title: '跟进销售',
    dataIndex: 'sale_name'
  },
  {
    title: '跟进商服',
    dataIndex: 'custom_renew_server_name_tip'
  }
]
