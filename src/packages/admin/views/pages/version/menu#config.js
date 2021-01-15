export const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menu_name'
  },
  {
    title: '自定义名称',
    dataIndex: 'aliases'
  },
  {
    title: '侧边栏状态',
    scopedSlots: { customRender: 'is_hidden' }
  },
  {
    title: '排序',
    dataIndex: 'menu_weight'
  },
  {
    title: '是否升级提示',
    scopedSlots: { customRender: 'upgrade_hints' }
  },
  {
    title: '免费权限组',
    scopedSlots: { customRender: 'perm_group' }
  },
  {
    title: '收费（隐藏）权限组',
    scopedSlots: { customRender: 'gray_perm_group' }
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
