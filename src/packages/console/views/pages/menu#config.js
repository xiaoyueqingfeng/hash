export const tableOptions = vm => {
  return {
    columns: [
      {
        title: '排序',
        width: 200,
        scopedSlots: { customRender: 'list_order' }
      },
      {
        title: '菜单名称',
        dataIndex: 'name',
        width: '12%'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        width: 50
      },
      {
        title: 'auth_key',
        dataIndex: 'auth_key'
      },
      {
        title: 'route_name',
        dataIndex: 'route_name'
      },
      // {
      //   title: '侧边栏跳转url',
      //   dataIndex: 'url'
      // },
      {
        title: '侧边栏状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '侧边栏图标',
        dataIndex: 'icon'
      },
      {
        title: '操作',
        key: 'operation',
        width: 70,
        scopedSlots: { customRender: 'action' }
      }
    ]
  }
}
