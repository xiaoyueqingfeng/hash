export const tableOptions = vm => ({
  columns: [
    {
      title: '客户名称',
      dataIndex: 'leads_name'
    },
    {
      title: 'leadsID',
      dataIndex: 'leads_id'
    },
    {
      title: '系统',
      dataIndex: 'system_type_name'
    },
    {
      title: '版本',
      dataIndex: 'system_version_name'
    },
    {
      title: '门店数',
      dataIndex: 'shop_num'
    },
    {
      title: '小程序潜在会员',
      dataIndex: 'potential_member_num'
    },
    {
      title: '小程序会员',
      dataIndex: 'member_num'
    },
    {
      title: '小程序总营收',
      dataIndex: 'total_revenue',
      scopedSlots: { customRender: 'total_revenue' }
    },
    {
      title: '小程序订单数',
      dataIndex: 'total_order_num',
      scopedSlots: { customRender: 'total_order_num' }
    }
  ]
})
