export const tableOptions = vm => ({
  columns: [
    {
      title: '客户名称',
      dataIndex: 'brand_name',
      fixed: true,
      width: 180,
      scopedSlots: { customRender: 'detail' }
    },
    {
      title: 'leadsID',
      dataIndex: 'id'
    },
    {
      title: '运营模式',
      dataIndex: 'work_model_tip'
    },
    {
      title: '城市',
      scopedSlots: { customRender: 'area' }
    },
    {
      title: '前任销售',
      dataIndex: 'pre_sale_name'
    },
    {
      title: '掉入公海原因',
      dataIndex: 'throw_public_sea_remark'
    },
    {
      title: '掉入公海时间',
      dataIndex: 'throw_public_sea_time',
      sorter: true
    },
    {
      title: '渠道',
      scopedSlots: { customRender: 'channel' }
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      sorter: true
    },
    {
      title: '操作',
      fixed: 'right',
      width: 60,
      scopedSlots: { customRender: 'action' }
    }
  ]
})
