export const cascaderOptions = {
  organ: [
    {
      name: '业绩',
      id: 'achievement',
      children: [
        { name: '总业绩', id: 'total_achievement' },
        { name: '硬件', id: 'hard_achievement' },
        { name: '软件', id: 'soft_achievement' }
      ]
    },
    { id: 'visit_number', name: '拜访' }
  ],
  sale: [
    {
      name: '业绩',
      id: 'achievement',
      children: [
        { name: '总业绩', id: 'total_achievement' },
        { name: '硬件', id: 'hard_achievement' },
        { name: '软件', id: 'soft_achievement' }
      ]
    },
    { name: '拜访', id: 'visit_number' }
  ],
  serve: [
    { name: '员工续签', id: 'repay_achievement' },
    { name: '服务次数', id: 'service_number' }
  ]
}
