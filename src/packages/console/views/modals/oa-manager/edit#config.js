export const ruleOptions = {
  code: {
    rules: [
      {
        required: true,
        message: '请输入CODE'
      }
    ]
  },
  url: {},
  version: {
    rules: [
      {
        required: true,
        message: '请输入版本号'
      }
    ]
  },
  device_id: {
    rules: [
      {
        required: true,
        message: '请输入设备名称'
      }
    ]
  },
  version_name: {
    rules: [
      {
        required: true,
        message: '请输入版本名称'
      }
    ]
  },
  remarks: {
    rules: [
      {
        max: 100,
        message: '不能超过100个字！'
      }
    ]
  }
}
