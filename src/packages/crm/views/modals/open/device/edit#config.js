export const rules = vm => ({
  device_id: [
    {
      required: true,
      message: '请输入设备ID'
    },
    { min: 0, max: 32, message: '至多32个字符' }
  ],
  device_type: [
    {
      required: true,
      message: '请选择设备类型'
    }
  ],
  product_id: [
    {
      required: true,
      message: '请选择产品'
    }
  ]
})
