export const labels = {
  name: '角色名称',
  version_id: '版本',
  level_id: '角色等级'
}

export const placehoders = {
  name: `请输入${labels.name}`
}

export const decorators = {
  name: [
    'name',
    {
      rules: [
        {
          required: true,
          message: `${labels.name}必填`
        }
      ]
    }
  ],
  level_id: [
    'level_id',
    {
      rules: [
        {
          required: true,
          message: `${labels.level_id}必填`
        }
      ]
    }
  ]
}
