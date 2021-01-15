export const columns = vm => [
  {
    title: '门店名称',
    dataIndex: 'shop_name'
  },
  {
    title: '原系统到期时间',
    dataIndex: 'expire_time'
  },
  {
    title: '有效期剩余天数',
    dataIndex: 'remain_days',
    scopedSlots: { customRender: 'remain_days' }
  },
  {
    title: '有效期变更天数',
    dataIndex: 'update_days',
    scopedSlots: { customRender: 'update_days' }
  }
]

export const rules = vm => ({
  system_expired_time: {
    rules: [{ required: true, message: '请选择系统到期时间' }]
  },
  remake: {
    rules: [
      { required: true, message: '请填写备注' },
      { min: 5, message: '请输入至少5个字符' }
    ]
  }
})
