export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      fixed: 'left',
      width: 100,
      dataIndex: 'leads_id'
    },
    {
      title: '客户姓名',
      dataIndex: 'leads_apply_username'
    },
    {
      title: '注册品牌',
      dataIndex: 'leads_name'
    },
    {
      title: '合伙人姓名',
      dataIndex: 'agent_name'
    },
    {
      title: '城市',
      scopedSlots: { customRender: 'city_name' }
    },
    {
      title: '注册手机号',
      dataIndex: 'leads_apply_mobile'
    },
    {
      title: '重复校验',
      scopedSlots: { customRender: 'repeat_validate' }
    },
    {
      title: '是否签约',
      dataIndex: 'is_signing_desc'
    },
    {
      title: '系统是否开通',
      dataIndex: 'is_open_system_desc'
    },
    {
      title: '有效期剩余',
      dataIndex: 'recommend_valid_days'
    },
    {
      title: '状态',
      width: '60px',
      scopedSlots: { customRender: 'invalid_reason' }
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
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
