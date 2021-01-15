export const columns = vm => [
  {
    title: '门店名称',
    dataIndex: 'shop_name'
  },
  {
    title: '系统到期时间',
    dataIndex: 'expire_time'
  },
  {
    title: '门店状态',
    dataIndex: 'status_desc',
    scopedSlots: { customRender: 'shop_status' }
  },
  {
    title: '有效期剩余天数',
    dataIndex: 'remain_days',
    scopedSlots: { customRender: 'remain_days' }
  }
]

export const rules = vm => ({
  refund_money: {
    rules: [{ required: true, message: '请输入退款金额' }]
  },
  remark: {
    rules: [
      { required: true, message: '请输入备注' },
      { min: 5, message: '最少5个字符' }
    ]
  }
})
