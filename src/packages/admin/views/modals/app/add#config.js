export const rules = vm => ({
  os_type: {
    rules: [{ required: true, message: '请选择操作类型' }]
  },
  version_name: {
    rules: [
      { required: true, message: '请输入版本名称' },
      { min: 1, max: 10, message: '最多10个字符' }
    ]
  },
  version_no: {
    rules: [
      { required: true, message: '请输入版本号' },
      { min: 1, max: 10, message: '最多10个字符' }
    ]
  },
  code: {
    rules: [{ min: 0, max: 10, message: '最多10个字符' }]
  },
  system_type: { rules: [{ required: true, message: '请选择版本类型' }] },
  url: {}
})
