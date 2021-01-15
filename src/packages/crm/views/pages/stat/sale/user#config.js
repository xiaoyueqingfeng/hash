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
    title: '所属团队',
    dataIndex: 'organ_name'
  },
  {
    title: '合计',
    align: 'right',
    dataIndex: 'sale_achievement',
    sorter: (a, b) => a.sale_achievement - b.sale_achievement
  },
  {
    title: '系统销售业绩',
    align: 'right',
    dataIndex: 'soft_sale_achievement',
    sorter: (a, b) => a.soft_sale_achievement - b.soft_sale_achievement
  },
  {
    title: '系统新签客户数',
    align: 'right',
    dataIndex: 'soft_sale_pay',
    sorter: (a, b) => a.soft_sale_pay - b.soft_sale_pay
  },
  {
    title: '插件销售业绩',
    align: 'right',
    dataIndex: 'plugin_sale_achievement',
    sorter: (a, b) => a.plugin_sale_achievement - b.plugin_sale_achievement
  },
  {
    title: '小程序销售业绩',
    align: 'right',
    dataIndex: 'mina_sale_achievement',
    sorter: (a, b) => a.mina_sale_achievement - b.mina_sale_achievement
  },
  {
    title: '硬件销售业绩',
    align: 'right',
    dataIndex: 'hard_sale_achievement',
    sorter: (a, b) => a.hard_sale_achievement - b.hard_sale_achievement
  },
  {
    title: '硬件新签客户数',
    align: 'right',
    dataIndex: 'hard_sale_pay',
    sorter: (a, b) => a.hard_sale_pay - b.hard_sale_pay
  },
  {
    title: '拜访量',
    align: 'right',
    dataIndex: 'visit_number',
    sorter: (a, b) => a.visit_number - b.visit_number
  }
]
