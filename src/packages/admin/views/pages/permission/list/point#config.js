export const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '资源名称',
    dataIndex: 'name'
  },
  {
    title: '资源标识',
    dataIndex: 'alias'
  },
  {
    title: '权限点名称',
    dataIndex: 'perm_name'
  },
  {
    title: '动作',
    dataIndex: 'action_name'
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
