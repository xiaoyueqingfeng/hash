export const tableOptions = vm => ({
  columns: [
    {
      title: '品牌名称',
      dataIndex: 'brand_name'
    },
    {
      title: '场馆名称',
      dataIndex: 'shop_name'
    },
    {
      title: '设备号',
      dataIndex: 'terminal_no'
    },
    {
      title: '自定义备注名称',
      dataIndex: 'terminal_name'
    },
    {
      title: '添加时间',
      dataIndex: 'created_date'
    },
    {
      title: '使用状态',
      dataIndex: 'status_desc'
    },
    {
      title: '在线状态',
      dataIndex: 'online_status_desc'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
