import { MOBILE_REGEX } from 'oa-core/constants/regex'

export const rules = vm => ({
  name: {
    rules: [{ required: true, message: '请填写邀请人姓名' }]
  },
  mobile: {
    rules: [
      { required: true, message: '请填写正确手机号', pattern: MOBILE_REGEX }
    ]
  },
  level_id: { rules: [{ required: true, message: '请选择等级' }] },
  brand_name: {},
  province_id: {},
  city_id: {},
  district_id: {},
  remark: {}
})
