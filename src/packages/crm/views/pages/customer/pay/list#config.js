export const tableColumns = [
  {
    title: '客户名称',
    width: 180,
    fixed: true,
    dataIndex: 'brand_name',
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: 'leadsID',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '新签门店数',
    dataIndex: 'shop_num',
    width: 100
  },
  {
    title: '到期时间',
    sorter: true,
    dataIndex: 'system_expired_time',
    scopedSlots: { customRender: 'system_expired_time' },
    width: 160
  },
  {
    title: '商服分级',
    dataIndex: 'server_level_tip',
    width: 80
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 120
  },
  {
    title: '最近客运服务',
    dataIndex: 'last_operation_service_name',
    width: 120
  },
  {
    title: '最近客运服务时间',
    dataIndex: 'last_operation_service_time',
    width: 140
  },
  {
    title: '最近客续服务',
    dataIndex: 'last_renew_service_name',
    width: 120
  },
  {
    title: '最近客续服务时间',
    dataIndex: 'last_renew_service_time',
    width: 140
  },
  {
    title: '硬件最近拜访时间',
    dataIndex: 'last_hardware_visit_time',
    sorter: true,
    width: 170
  },
  {
    title: '最近登录时间',
    dataIndex: 'last_login_time',
    sorter: true,
    width: 130
  },
  {
    title: '连续登录天数',
    dataIndex: 'continue_login_day',
    width: 120
  },
  {
    title: '跟进销售',
    dataIndex: 'sale_name',
    width: 100
  },
  {
    title: '硬件销售',
    dataIndex: 'hardware_sale_name',
    width: 100
  },
  {
    title: '跟进客运',
    dataIndex: 'custom_operation_server_name',
    width: 100
  },
  {
    title: '跟进客续',
    dataIndex: 'custom_renew_server_name',
    width: 100
  },
  {
    title: '跟进电销',
    dataIndex: 'tel_sale_name',
    width: 100
  },
  {
    title: '系统',
    dataIndex: 'system_type_tip',
    width: 100
  },
  {
    title: '版本',
    dataIndex: 'system_version',
    width: 100
  },
  {
    title: 'vip分类',
    dataIndex: 'vip_type_tip',
    width: 70
  },
  {
    title: '系统开通时间',
    dataIndex: 'system_open_time',
    sorter: true,
    width: 150
  },
  {
    width: 70,
    fixed: 'right',
    customRenderIndex: 'action',
    slots: {
      title: 'actionTitle'
    },
    scopedSlots: { customRender: 'action' }
  }
]
