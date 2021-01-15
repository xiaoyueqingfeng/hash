export const rules = vm => ({
  version_sn: {
    rules: [
      {
        required: true,
        message: '请填写版本SN'
      }
    ]
  },
  version_name: {
    rules: [
      {
        required: true,
        message: '请填写版本名称'
      },
      {
        max: 20,
        message: '最多20个字符！'
      }
    ]
  },
  work_model: {
    rules: [
      {
        required: true,
        message: '请选择运营模式'
      }
    ]
  },
  version_level: {
    rules: [
      {
        required: true,
        message: '请选择系统版本'
      }
    ]
  },
  is_support_single_shop: {
    rules: [
      {
        required: true,
        message: '请选择是否支持单门店'
      }
    ]
  },
  is_sale: {
    rules: [
      {
        required: true,
        message: '请选择是否可售卖'
      }
    ]
  },
  description: {
    rules: [
      {
        max: 30,
        message: '不能超过30个字！'
      }
    ]
  }
})
