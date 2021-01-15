import { MOBILE_REGEX } from 'oa-core/constants/regex'
export const labelCol = { lg: 4 }
export const wrapperCol = { lg: 20 }

export const labels = {
  avatar: '头像',
  name: '员工姓名',
  mobile: '手机',
  udesk_login_name: 'Udesk账号',
  areaIds: '城市',
  role_id: '权限角色',
  job_title: '职位',
  organ_id: '所属部门',
  confirmPassword: '确认密码'
}

export const decorators = vm => ({
  avatar: ['avatar'],
  name: [
    'name',
    {
      rules: [{ required: true, message: '请输入姓名' }]
    }
  ],
  mobile: [
    'mobile',
    {
      rules: [
        { required: true, message: '请输入正确电话号码', pattern: MOBILE_REGEX }
      ]
    }
  ],
  udesk_login_name: [
    'udesk_login_name',
    {
      rules: []
    }
  ],
  areaIds: [
    'areaIds',
    {
      rules: [{ required: true, message: '请选择城市' }]
    }
  ],
  role_id: [
    'role_id',
    { rules: [{ required: true, message: '请选择权限角色' }] }
  ],
  job_title: [
    'job_title',
    { rules: [{ required: true, message: '请输入职位' }] }
  ],
  organ_id: ['organ_id', { rules: [{ required: true, message: '请选择部门' }] }]
})
