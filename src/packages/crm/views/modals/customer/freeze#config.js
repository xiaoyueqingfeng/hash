export const decorator = vm => ({
  frozen_start_time: {
    rules: [{ required: true, message: '请选择冻结开始时间' }]
  },
  frozen_time: {
    rules: [
      { required: true, message: '请输入冻结天数，不能超过45天' },
      { max: 45, message: '不能超过45天' }
    ]
  },
  remark: {
    rules: [
      { required: true, message: '请输入备注' },
      {
        min: 5,
        message: '不能少于5个字！'
      }
    ]
  }
})

export const columns = vm => [
  {
    title: '门店名称',
    dataIndex: 'shop_name'
  },
  {
    title: '冻结天数',
    dataIndex: 'frozen_time',
    scopedSlots: { customRender: 'frozen_time' }
  },
  {
    title: '冻结开始时间',
    dataIndex: 'frozen_start_time'
  },
  {
    title: '有效期剩余天数',
    dataIndex: 'margin_days',
    scopedSlots: { customRender: 'margin_days' }
  }
]
