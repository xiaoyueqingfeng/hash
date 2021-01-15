export const tableOptions = vm => ({
  columns: [
    {
      title: '分销商名称',
      fixed: 'left',
      width: '300px',
      dataIndex: 'distributor_name',
      scopedSlots: { customRender: 'distributor_name' }
    },
    {
      title: '等级',
      dataIndex: 'level',
      scopedSlots: { customRender: 'level' }
    },
    {
      title: '所属品牌',
      dataIndex: 'brand_name'
    },
    {
      title: '品牌leads',
      dataIndex: 'leads_id'
    },
    {
      title: '来源',
      dataIndex: 'join_source'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '绑定手机号',
      dataIndex: 'mobile'
    },
    {
      title: '有效到期时间',
      dataIndex: 'valid_to'
    },
    {
      title: '首次成为分销商时间',
      dataIndex: 'first_become_time',
      sorter: true
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
