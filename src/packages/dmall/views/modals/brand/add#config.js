export const rules = vm => {
  return {
    brand_name: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请输入合伙人名称'
            }
          }
        }
      ]
    },
    mobile: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!/^1[3456789]\d{9}$/.test(value)) {
              return '请正确输入手机号'
            }
          }
        }
      ]
    },
    remark: {}
  }
}
