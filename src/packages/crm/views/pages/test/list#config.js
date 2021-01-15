export const tableOptions = [
  {
    title: '客户名称',
    fixed: 'left',
    width: 150,
    scopedSlots: { customRender: 'detail' },
    dataIndex: 'brand_name'
  },
  {
    title: 'leadsID',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '门店数',
    dataIndex: 'shop_num',
    width: 100
  },
  {
    title: '到期时间',
    sorter: true,
    customRenderIndex: 'system_expired_time',
    scopedSlots: { customRender: 'system_expired_time' },
    width: 180
  },
  {
    title: '商服分级',
    dataIndex: 'server_level_tip',
    width: 100
  },
  {
    title: '最近客运服务',
    dataIndex: 'last_operation_service_name',
    width: 180
  },
  {
    title: '最近客运服务时间',
    dataIndex: 'last_operation_service_time',
    width: 180
  },
  {
    title: '最近客续服务',
    dataIndex: 'last_renew_service_name',
    width: 180
  },
  {
    title: '最近客续服务时间',
    dataIndex: 'last_renew_service_time',
    width: 180
  },
  {
    title: '硬件最近拜访时间',
    dataIndex: 'last_hardware_visit_time',
    sorter: true,
    width: 180
  },
  {
    title: '最近登录时间',
    dataIndex: 'last_login_time',
    sorter: true,
    width: 180
  },
  {
    title: '连续登录天数',
    dataIndex: 'continue_login_day',
    width: 180
  },
  {
    title: '销售',
    dataIndex: 'sale_name',
    width: 180
  },
  {
    title: '硬件销售',
    dataIndex: 'hardware_sale_name',
    width: 180
  },
  {
    title: '跟进客运',
    dataIndex: 'custom_operation_server_name',
    width: 180
  },
  {
    title: '跟进客续',
    dataIndex: 'custom_renew_server_name',
    width: 180
  },
  {
    title: '跟进电销',
    dataIndex: 'tel_sale_name',
    width: 180
  },
  {
    title: '系统',
    dataIndex: 'system_type_tip',
    width: 180
  },
  {
    title: '版本',
    dataIndex: 'system_version',
    width: 180
  },
  {
    title: '系统开通时间',
    dataIndex: 'system_open_time',
    sorter: true,
    width: 180
  },
  {
    width: 60,
    fixed: 'right',
    customRenderIndex: 'action',
    slots: {
      title: 'actionTitle'
    },
    scopedSlots: { customRender: 'action' }
  }
]
export const contactTableOptions = [
  {
    title: '联系人',
    scopedSlots: {
      customRender: 'name'
    }
  },
  {
    title: '手机号',
    scopedSlots: {
      customRender: 'mobile'
    }
  }
]
