export const rules = vm => ({
  supplier_name: [
    {
      required: true,
      message: '请输入供应商名称'
    },
    { min: 0, max: 30, message: '至多30个字符' }
  ],
  remarks: [
    {
      required: true,
      message: '请输入适当的备注说明'
    },
    { min: 0, max: 200, message: '至多200个字符' }
  ]
})
