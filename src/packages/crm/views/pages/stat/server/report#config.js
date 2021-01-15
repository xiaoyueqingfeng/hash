export const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: '120px',
    fixed: 'left',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '员工',
    fixed: 'left',
    width: '120px',
    dataIndex: 'user_name'
  },
  {
    title: '所属部门',
    dataIndex: 'organ_name'
  },
  {
    title: '电话录入量',
    align: 'right',
    dataIndex: 'phone_record_number',
    sorter: (a, b) => a.phone_record_number - b.phone_record_number
  },
  {
    title: 'C0客户',
    align: 'right',
    dataIndex: 'server_level0_number',
    sorter: (a, b) => a.server_level0_number - b.server_level0_number
  },
  {
    title: 'C1客户',
    align: 'right',
    dataIndex: 'server_level1_number',
    sorter: (a, b) => a.server_level1_number - b.server_level1_number
  },
  {
    title: 'C2客户',
    align: 'right',
    dataIndex: 'server_level2_number',
    sorter: (a, b) => a.server_level2_number - b.server_level2_number
  },
  {
    title: 'C3客户',
    align: 'right',
    dataIndex: 'server_level3_number',
    sorter: (a, b) => a.server_level3_number - b.server_level3_number
  },
  {
    title: 'C4客户',
    align: 'right',
    dataIndex: 'server_level4_number',
    sorter: (a, b) => a.server_level4_number - b.server_level4_number
  },
  {
    title: '续费业绩',
    align: 'right',
    dataIndex: 'repay_server_achievement',
    sorter: (a, b) => a.repay_server_achievement - b.repay_server_achievement
  },
  {
    title: '续费客户数',
    align: 'right',
    dataIndex: 'repay_server_number',
    sorter: (a, b) => a.repay_server_number - b.repay_server_number
  },

  {
    title: '服务数',
    align: 'right',
    dataIndex: 'service_number',
    sorter: (a, b) => a.service_number - b.service_number
  }
]
