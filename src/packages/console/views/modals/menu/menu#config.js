export const labelCol = { span: 5 }
export const wrapperCol = { span: 18 }

export const decorators = {
  parent_id: [
    'parent_id',
    { rules: [{ required: true, message: '父级菜单必填' }] }
  ],
  name: [
    'name',
    {
      rules: [{ required: true, message: '菜单名称必填' }]
    }
  ],
  auth_key: [
    'auth_key',
    { rules: [{ required: true, message: 'auth_key必填' }] }
  ],
  route_name: ['route_name'],
  icon: ['icon'],
  url: ['url'],
  type: ['type', { rules: [{ required: true, message: '打开方式必填' }] }],
  status: ['status', { rules: [{ required: true, message: '状态必填' }] }],
  list_order: [
    'list_order',
    { rules: [{ required: true, message: '排序必填' }] }
  ]
}
