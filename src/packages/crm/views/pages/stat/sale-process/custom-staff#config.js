export const staffColumns = [
  {
    title: '员工',
    dataIndex: 'user_name'
  },
  {
    title: '所属团队',
    dataIndex: 'organ_name'
  },
  {
    title: '开发客户数',
    dataIndex: 'new_leads_num',
    sorter: (a, b) => a.new_leads_num - b.new_leads_num,
    align: 'right'
  },
  {
    title: '强开客户数',
    dataIndex: 'force_total_num',
    sorter: (a, b) => a.force_total_num - b.force_total_num,
    align: 'right'
  },
  {
    title: '7天未拜访',
    dataIndex: 'force_no_write_visit_num',
    align: 'right'
  },
  {
    title: '15天未上门',
    dataIndex: 'force_no_home_visit_num',
    align: 'right'
  },
  {
    title: '45天未签约',
    dataIndex: 'force_no_contract_num',
    align: 'right'
  }
]

export const staffDateColumns = [
  {
    title: '日期',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: '员工',
    dataIndex: 'user_name'
  },
  {
    title: '所属团队',
    dataIndex: 'organ_name'
  },
  {
    dataIndex: 'new_leads_num',
    slots: { title: 'new_leads_num' },
    align: 'right'
  },
  {
    title: '私海客户数',
    dataIndex: 'private_sea_num',
    align: 'right'
  },
  {
    title: 'A类客户数',
    dataIndex: 'brand_level_a_num',
    align: 'right'
  },
  {
    title: 'B类客户数',
    dataIndex: 'brand_level_b_num',
    align: 'right'
  },
  {
    title: 'C类客户数',
    dataIndex: 'brand_level_c_num',
    align: 'right'
  },
  {
    title: 'D类客户数',
    dataIndex: 'brand_level_d_num',
    align: 'right'
  },
  {
    title: 'F类客户数',
    dataIndex: 'brand_level_f_num',
    align: 'right'
  },
  {
    title: '强开客户数',
    dataIndex: 'force_total_num',
    align: 'right'
  },
  {
    title: '7天未拜访',
    dataIndex: 'force_no_write_visit_num',
    align: 'right'
  },
  {
    title: '15天未上门',
    dataIndex: 'force_no_home_visit_num',
    align: 'right'
  },
  {
    title: '45天未签约',
    dataIndex: 'force_no_contract_num',
    align: 'right'
  }
]
