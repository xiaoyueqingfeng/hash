export const tableOptions = vm => ({
  columns: [
    {
      title: '唯一标识',
      dataIndex: 'sn'
    },
    {
      title: '插件名称',
      dataIndex: 'name'
    },
    {
      title: '系统',
      scopedSlots: { customRender: 'system_type' }
    },
    {
      title: '插件类型',
      // dataIndex: 'plugin_type'
      scopedSlots: { customRender: 'plugin_type' }
    },
    {
      title: '支持版本',
      // dataIndex: 'plugin_type'
      scopedSlots: { customRender: 'version' }
    },
    {
      title: '包含权限组',
      scopedSlots: { customRender: 'permission_group_list_text' }
    },
    {
      title: '价格',
      align: 'right',
      dataIndex: 'price'
    },
    {
      title: '是否试用',
      // dataIndex: 'is_allow_try'
      scopedSlots: { customRender: 'is_allow_try' }
    },
    {
      title: '状态',
      // dataIndex: 'status'
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '排序',
      dataIndex: 'sort'
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
