export const tableOptions = vm => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', width: 100, fixed: 'left' },
      {
        title: '姓名',
        fixed: 'left',
        width: 160,
        scopedSlots: { customRender: 'name' }
      },
      { title: '账号/手机', dataIndex: 'mobile', width: 120 },
      {
        title: '角色',
        dataIndex: 'role_info',
        scopedSlots: { customRender: 'role_info' }
      },
      { title: '职位', dataIndex: 'job_title', width: 150 },
      { title: '部门负责人', scopedSlots: { customRender: 'organ_admin' } },
      { title: '所属部门', dataIndex: 'service_name' },
      { title: '驻扎城市', dataIndex: 'city' },
      {
        title: '状态',
        width: 80,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        key: 'action',
        width: 80,
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }
    ]
  }
}
