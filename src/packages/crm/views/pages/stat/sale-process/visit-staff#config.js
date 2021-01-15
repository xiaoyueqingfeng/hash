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
    title: '上门拜访数',
    dataIndex: 'sale_home_visit_num',
    sorter: (a, b) => a.sale_home_visit_num - b.sale_home_visit_num,
    align: 'right'
  },
  {
    title: '有效上门数',
    dataIndex: 'valid_visit_num',
    sorter: (a, b) => a.valid_visit_num - b.valid_visit_num,
    align: 'right'
  },
  {
    title: '无效上门数',
    dataIndex: 'invalid_visit_num',
    sorter: (a, b) => a.invalid_visit_num - b.invalid_visit_num,
    align: 'right'
  },
  {
    dataIndex: 'studio_num',
    slots: { title: 'studio_num' },
    align: 'right'
  },
  {
    dataIndex: 'club_num',
    slots: { title: 'club_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_a_num',
    slots: { title: 'brand_level_a_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_b_num',
    slots: { title: 'brand_level_b_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_c_num',
    slots: { title: 'brand_level_c_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_d_num',
    slots: { title: 'brand_level_d_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_f_num',
    slots: { title: 'brand_level_f_num' },
    align: 'right'
  },
  {
    dataIndex: 'mobile_visit_num',
    slots: { title: 'mobile_visit_num' },
    align: 'right'
  },
  {
    dataIndex: 'wechat_visit_num',
    slots: { title: 'wechat_visit_num' },
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
    title: '上门拜访数',
    dataIndex: 'sale_home_visit_num',
    align: 'right'
  },
  {
    title: '有效上门数',
    dataIndex: 'valid_visit_num',
    align: 'right'
  },
  {
    title: '无效上门数',
    dataIndex: 'invalid_visit_num',
    align: 'right'
  },
  {
    dataIndex: 'studio_num',
    slots: { title: 'studio_num' },
    align: 'right'
  },
  {
    dataIndex: 'club_num',
    slots: { title: 'club_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_a_num',
    slots: { title: 'brand_level_a_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_b_num',
    slots: { title: 'brand_level_b_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_c_num',
    slots: { title: 'brand_level_c_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_d_num',
    slots: { title: 'brand_level_d_num' },
    align: 'right'
  },
  {
    dataIndex: 'brand_level_f_num',
    slots: { title: 'brand_level_f_num' },
    align: 'right'
  },
  {
    dataIndex: 'mobile_visit_num',
    slots: { title: 'mobile_visit_num' },
    align: 'right'
  },
  {
    dataIndex: 'wechat_visit_num',
    slots: { title: 'wechat_visit_num' },
    align: 'right'
  }
]
