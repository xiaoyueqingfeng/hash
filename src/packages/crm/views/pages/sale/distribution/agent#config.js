export const tableOptions = vm => ({
  columns: [
    {
      title: '合伙人姓名',
      fixed: 'left',
      width: 100,
      dataIndex: 'name',
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: '所属品牌',
      dataIndex: 'brand_name'
    },
    {
      title: '来源',
      dataIndex: 'source'
    },
    {
      title: '城市',
      scopedSlots: { customRender: 'city_name' }
    },
    {
      title: '绑定手机号',
      dataIndex: 'mobile'
    },
    {
      title: '等级',
      dataIndex: 'level_name'
    },
    {
      title: '状态',
      dataIndex: 'status_desc'
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
