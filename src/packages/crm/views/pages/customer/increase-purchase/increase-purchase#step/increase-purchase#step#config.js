import { message } from 'ant-design-vue'

export const stepOneRules = vm => ({
  shop_qty: { rules: [{ required: true, message: '请输入门店数' }] },
  'module.module_id': { rules: [{ required: true, message: '请选择模块' }] },
  'module.open_day': { rules: [{ required: true, message: '请输入开通时长' }] },
  'module.amount': { rules: [{ required: true, message: '请输入金额' }] },
  shop_day_qty: { rules: [{ required: true, message: '请输入开通时长' }] },
  shop_amount: { rules: [{ required: true, message: '请输入金额' }] },
  renew_version_id: { rules: [{ required: true, message: '请选择版本' }] },
  renew_version_amount: { rules: [{ required: true, message: '请输入金额' }] },
  plugins_id: { rules: [{ required: true, message: '请选择插件' }] },
  plugins_day: { rules: [{ required: true, message: '请输入开通时长' }] },
  plugins_amount: { rules: [{ required: true, message: '请输入价格' }] },
  sms_qty: { rules: [{ required: true, message: '请输入短信数量' }] },
  sms_amount: { rules: [{ required: true, message: '请输入价格' }] },
  'present.module_id': {},
  'present.open_day': {}
})

export const stepTwoRules = vm => ({
  open_time: { rules: [{ required: true, message: '请选择开通时间' }] },
  pay_time: { rules: [{ required: true, message: '请选择支付时间' }] },
  sale_id: { rules: [{ required: true, message: '请选择售卖人' }] }
})
