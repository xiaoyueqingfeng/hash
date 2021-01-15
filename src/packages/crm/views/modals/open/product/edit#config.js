export const rules = vm => ({
  product_name: [
    {
      required: true,
      message: '产品名称不能为空'
    },
    { min: 0, max: 30, message: '至多30个字符' }
  ],
  type: [
    {
      required: true,
      message: '请选择设备类型'
    }
  ],
  supplier_id: [
    {
      required: true,
      message: '请选择供应商'
    }
  ],
  model: [
    {
      required: true,
      message: '请选择供应商型号'
    }
  ]
})
