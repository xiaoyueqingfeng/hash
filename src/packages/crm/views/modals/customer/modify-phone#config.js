import { MOBILE_REGEX } from 'oa-core/constants/regex'

export const rules = vm => ({
  phone: {
    rules: [
      {
        require: true,
        message: '请填写正确格式的手机号',
        pattern: MOBILE_REGEX
      }
    ]
  }
})
