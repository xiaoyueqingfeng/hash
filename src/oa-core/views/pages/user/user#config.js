import { MOBILE_REGEX } from 'oa-core/constants/regex'

export const decorators = {
  mobile: [
    'mobile',
    {
      rules: [
        { required: true, message: '请输入正确电话号码', pattern: MOBILE_REGEX }
      ]
    }
  ],
  password: [
    'password',
    {
      rules: [{ required: true, message: '请输入密码' }]
    }
  ],
  captcha: [
    'captcha',
    {
      rules: [{ required: true, message: '请输入验证码!' }]
    }
  ]
}
