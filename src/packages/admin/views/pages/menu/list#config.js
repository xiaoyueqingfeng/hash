export const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menu_name'
  },
  {
    title: '唯一标识',
    dataIndex: 'menu_sn'
  },
  {
    title: '菜单URL',
    dataIndex: 'menu_url'
  },
  {
    title: '菜单icon',
    dataIndex: 'menu_icon'
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
