export const rules = vm => ({
  sn: {
    rules: [
      { required: true, message: '请输入菜单唯一标识' },
      { max: 120, message: '不能超过120个字！' }
    ]
  },
  name: {
    rules: [
      { required: true, message: '请输入菜单名称' },
      { max: 20, message: '不能超过20个字！' }
    ]
  },
  url: {
    rules: [
      {
        max: 50,
        message: '不能超过50个字！'
      }
    ]
  },
  icon: {},
  remarks: {
    rules: [
      {
        max: 30,
        message: '不能超过30个字！'
      }
    ]
  }
})
