export const tableOptions = vm => ({
  columns: [
    {
      title: '唯一标识',
      fixed: 'left',
      dataIndex: 'module_sn'
    },
    {
      title: '模块名称',
      fixed: 'left',
      width: 140,
      dataIndex: 'module_name'
    },

    {
      title: '支持版本',
      scopedSlots: { customRender: 'support_version_list' }
    },
    {
      title: '包含权限组',
      // dataIndex: 'sold'
      scopedSlots: { customRender: 'support_permission_group_list' }
    },
    {
      title: '状态',
      // dataIndex: 'module_status_tip'
      scopedSlots: { customRender: 'module_status_tip' }
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
