export const rules = {
  category: {
    rules: [{ required: true, message: '请选择标签类目！' }]
  },
  name: {
    rules: [
      { required: true, message: '请选择标签名称！' },
      {
        max: 6,
        message: '不能超过6个字！'
      }
    ]
  },
  color_type: {
    rules: [{ required: true, message: '请选择标签颜色' }],
    initialValue: 99
  },
  remarks: {
    rules: [
      {
        max: 50,
        message: '不能超过50个字！'
      }
    ]
  }
}
