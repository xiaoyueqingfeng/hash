export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      fixed: 'left',
      width: 100,
      dataIndex: 'leads_id'
    },
    {
      title: '客户名称',
      dataIndex: 'brand_name'
    },
    {
      title: '小程序名称',
      dataIndex: 'nick_name'
    },
    {
      title: '当前系统版本',
      dataIndex: 'version'
    },
    {
      title: '小程序AppID',
      dataIndex: 'appid'
    },
    {
      title: '发布状态',
      dataIndex: 'send_status_name'
    },
    {
      title: '支付信息配置情况',
      dataIndex: 'is_mch_name'
    },
    {
      title: '提交审核时间',
      dataIndex: 'send_time'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 60,
      scopedSlots: { customRender: 'action' }
    }
  ]
})
