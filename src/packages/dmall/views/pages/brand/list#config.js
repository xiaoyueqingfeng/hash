export const tableOptions = vm => ({
  columns: [
    {
      title: '品牌',
      fixed: 'left',
      width: '300px',
      dataIndex: 'brand_name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      scopedSlots: { customRender: 'brandType' }
    },
    {
      title: 'leadsID',
      dataIndex: 'leads_id'
    },
    {
      title: '邀请码',
      dataIndex: 'invite_code'
    },
    {
      title: '分销商数',
      dataIndex: 'distributor_num'
    },
    {
      title: '绑定手机号',
      dataIndex: 'mobile'
    },
    {
      title: '注册时间',
      dataIndex: 'created_time'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
