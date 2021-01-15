export const columns = vm => [
  {
    title: '门店名称',
    dataIndex: 'shop_name'
  },
  {
    title: '已冻结天数',
    dataIndex: 'frozen_days',
    scopedSlots: { customRender: 'frozen_days' }
  },
  {
    title: '门店状态',
    dataIndex: 'shop_status',
    scopedSlots: { customRender: 'shop_status' }
  },
  {
    title: '系统到期时间',
    dataIndex: 'expire_time'
  }
]
