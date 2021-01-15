export const tableOptions = vm => ({
  columns: [
    {
      title: '案例标题',
      dataIndex: 'title'
    },
    {
      title: '类型',
      // dataIndex: 'type'
      scopedSlots: { customRender: 'type' }
    },
    {
      title: '推送版本',
      dataIndex: 'version_tip'
    },
    {
      title: '案例简介',
      width: '200px',
      dataIndex: 'description'
    },
    {
      title: '案例链接',
      scopedSlots: { customRender: 'link_url' }
    },
    {
      title: '排序',
      dataIndex: 'list_order'
    },
    {
      title: '状态',
      // dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '创建时间',
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
