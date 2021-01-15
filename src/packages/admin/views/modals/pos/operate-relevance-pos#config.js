export const tableOptions = vm => ({
  columns: [
    {
      title: '终端号',
      dataIndex: 'terminal_no',
      width: 200
    },
    {
      title: '门店名称',
      dataIndex: 'shop_name',
      width: 150
    },
    {
      title: '门店号',
      dataIndex: 'store_id',
      width: 200
    },
    {
      title: '款台号',
      dataIndex: 'cash_id',
      width: 200
    },
    {
      title: 'appid',
      scopedSlots: { customRender: 'appid' },
      width: 100
    },
    {
      title: 'license',
      scopedSlots: { customRender: 'license' },
      width: 100
    },
    {
      title: '添加时间',
      dataIndex: 'created_time'
    },
    {
      title: '可用状态',
      dataIndex: 'status_desc'
    }
  ]
})
