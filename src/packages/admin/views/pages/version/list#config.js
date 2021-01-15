export const tableOptions = vm => ({
  columns: [
    {
      title: '版本SN',
      fixed: 'left',
      dataIndex: 'version_sn'
    },
    {
      title: '版本名称',
      fixed: 'left',
      width: 140,
      dataIndex: 'version_name'
    },

    {
      title: '运营模式',
      scopedSlots: { customRender: 'work_model' }
    },
    {
      title: '是否允许售卖',
      // dataIndex: 'sold'
      scopedSlots: { customRender: 'sold' }
    },
    {
      title: '版本说明',
      scopedSlots: { customRender: 'description' }
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
