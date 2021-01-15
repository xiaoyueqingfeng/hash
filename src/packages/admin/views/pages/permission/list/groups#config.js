export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '权限组名称',
    dataIndex: 'name'
  },
  {
    title: '权限点列表',
    scopedSlots: { customRender: 'perms' }
  },
  {
    title: '备注',
    dataIndex: 'remarks'
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
