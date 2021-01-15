export const labelCol = { span: 5 }
export const wrapperCol = { span: 18 }

export const decorators = vm => ({
  parent_id: [
    'parent_id',
    {
      rules: [
        {
          required: true,
          message: '父级部门必填'
        }
      ]
    }
  ],
  name: [
    'name',
    {
      rules: [
        {
          required: true,
          message: '部门名称必填'
        }
      ]
    }
  ],
  list_order: [
    'list_order',
    {
      rules: [
        {
          required: true,
          message: '部门排序必填'
        }
      ],
      initialValue: '999'
    }
  ],
  area_id: [
    'area_id',
    {
      rules: [
        {
          required: true,
          message: '所属区域必填'
        }
      ],
      initialValue: '1'
    }
  ],
  team_id: [
    'team_id',
    {
      rules: [
        {
          required: true,
          message: '团队属性必填'
        }
      ]
    }
  ]
})
