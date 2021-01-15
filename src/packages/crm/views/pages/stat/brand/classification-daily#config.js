export default [
  {
    title: '日期',
    dataIndex: 'date',
    fixed: 'left',
    width: 100
  },
  {
    title: '客户名称',
    dataIndex: 'leads_name',
    scopedSlots: { customRender: 'leads_name' },
    fixed: 'left',
    width: 100
  },
  {
    title: 'leadsID',
    dataIndex: 'leads_id'
  },
  {
    title: '跟进客运',
    dataIndex: 'follow_user_name'
  },
  {
    title: '商服分级',
    dataIndex: 'leads_level'
  },
  {
    title: '升级降级',
    dataIndex: 'leads_level_change_desc'
  },
  {
    title: '员工日活人数',
    dataIndex: 'staff_login_times',
    align: 'right'
  },
  {
    title: '最近登录时间',
    dataIndex: 'last_login_time'
  },
  {
    title: '排课数',
    dataIndex: 'total_course_schedule',
    align: 'right'
  },
  {
    title: '预约数',
    dataIndex: 'total_course_reserve_member',
    align: 'right'
  },
  {
    title: '团课排课数',
    dataIndex: 'team_course_schedule',
    align: 'right'
  },
  {
    title: '私教排课数',
    dataIndex: 'personal_course_schedule',
    align: 'right'
  },
  {
    title: '会员端有效预约数',
    dataIndex: 'self_reserve',
    align: 'right'
  },
  {
    title: '代预约数',
    dataIndex: 'help_reserve',
    align: 'right'
  },
  {
    title: '场地预约数',
    dataIndex: 'court_reserve',
    align: 'right'
  },
  {
    title: '团课预约数',
    dataIndex: 'team_course_reserve',
    align: 'right'
  },
  {
    title: '私教预约数',
    dataIndex: 'personal_course_reserve',
    align: 'right'
  },
  {
    title: '入场数',
    dataIndex: 'entrance',
    align: 'right'
  },
  {
    title: '预约团课会员人数',
    dataIndex: 'team_course_reserve_member',
    align: 'right'
  },
  {
    title: '预约私教会员人数',
    dataIndex: 'personal_course_reserve_member',
    align: 'right'
  }
]
