export const labelCol = { span: 5 }
export const wrapperCol = { span: 18 }

export const decorators = vm => ({
  name: [
    'name',
    {
      rules: [
        {
          required: true,
          message: '角色名称必填'
        }
      ]
    }
  ],
  role_type: [
    'role_type',
    {
      rules: [
        {
          required: true,
          message: '角色属性必填'
        }
      ]
    }
  ],
  platform_code: [
    'platform_code',
    {
      rules: [
        {
          required: true,
          message: '可用平台必填'
        }
      ],
      initialValue: ['crm']
    }
  ]
})
