export const ruleOptions = vm => ({
  shop_id: {
    rules: [{ required: true, message: '请选择门店' }]
  },
  terminal_name: {
    rules: [{ required: true, message: '请输入自定义设备名称' }]
  },
  terminal_id: {
    rules: [{ required: true, message: '请选择设备' }]
  }
})
