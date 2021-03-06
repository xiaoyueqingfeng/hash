export const tableOptions = vm => ({
  columns: [
    {
      title: '供应商名称',
      fixed: 'left',
      width: '300px',
      dataIndex: 'supplier_name'
    },
    {
      title: '类型',
      dataIndex: 'supplier_type'
    },
    {
      title: '商品数',
      dataIndex: 'goods_num'
    },
    {
      title: '状态',
      dataIndex: 'supplier_status'
    },
    {
      title: '绑定手机号',
      dataIndex: 'mobile'
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
