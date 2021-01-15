export const rules = vm => ({
  apk_name: [
    {
      required: true,
      message: '请输入更新包名称'
    },
    {
      min: 2,
      max: 20,
      message: '支持输入2~20个字'
    }
  ],
  apk_type: [
    {
      required: true,
      message: '请选择更新包类型'
    }
  ],
  version_name: [
    {
      required: true,
      message: '请输入应用版本编号'
    }
  ],
  app_id: [
    {
      required: true,
      message: '请选择产品名称'
    }
  ],
  app_ver: [
    {
      required: true,
      message: '请输入版本编号'
    }
  ],
  category_id: [
    {
      required: true,
      message: '请选择设备类型'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入更新包描述'
    },
    {
      min: 1,
      max: 50,
      message: '支持输入1~50个字'
    }
  ]
})

export const columns = vm => [
  { title: '操作类型', dataIndex: 'operate_type' },
  {
    title: '操作内容',
    scopedSlots: { customRender: 'popover' }
  },
  {
    title: '操作时间',
    dataIndex: 'operator_time'
  },
  {
    title: '操作人',
    dataIndex: 'operator_name'
  }
]
