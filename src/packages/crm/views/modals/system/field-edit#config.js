export const rules = {
  name: {
    rules: [{ required: true, message: '请选择标签类目！' }]
  },
  fields_key: {
    rules: [{ required: true, message: '请选择标签名称！' }]
  },
  fields_unique_key: {
    rules: [{ required: true, message: '请选择标签颜色' }]
  },
  type: {
    rules: [{ required: true, message: '请选择标签颜色' }]
  },
  list_order: {},
  remark: {}
}
