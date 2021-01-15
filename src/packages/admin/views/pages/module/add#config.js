export const rules = vm => ({
  module_sn: {
    rules: [
      {
        required: true,
        message: '请填写唯一标识'
      },
      { max: 10, message: '最长10个字符' }
    ]
  },
  module_name: {
    rules: [
      {
        required: true,
        message: '请填写模块名称'
      },
      { max: 30, message: '最长30个字符' }
    ]
  },
  support_version: {
    initialValue: [],
    rules: [
      {
        validator: (field, value, values) => {
          if (!value || !value.length) {
            return '请选择版本'
          }
          if (vm.versionCheckBoxVisible) {
            return '请确认版本选择'
          }
        }
      }
    ]
  },
  support_permission_group: {
    rules: [{ required: true, message: '请选择权限组' }]
  }
})
