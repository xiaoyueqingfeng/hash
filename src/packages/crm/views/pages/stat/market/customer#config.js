export default [
  {
    title: '运营分级',
    dataIndex: 'level'
  },
  {
    title: '期初数量',
    dataIndex: 'start_number',
    align: 'right',
    scopedSlots: { customRender: 'start_number' }
  },
  {
    title: '期初占比',
    dataIndex: 'start_percent',
    align: 'right',
    scopedSlots: { customRender: 'start_percent' }
  },
  {
    title: '期末数量',
    dataIndex: 'end_number',
    align: 'right',
    scopedSlots: { customRender: 'end_number' }
  },
  {
    title: '期末占比',
    dataIndex: 'end_percent',
    align: 'right',
    scopedSlots: { customRender: 'end_percent' }
  },
  {
    title: '变化',
    dataIndex: 'change',
    align: 'right',
    scopedSlots: { customRender: 'change' }
  },
  {
    title: '变化比',
    dataIndex: 'change_percent',
    align: 'right',
    scopedSlots: { customRender: 'change_percent' }
  },
  {
    title: '升级',
    dataIndex: 'level_up',
    align: 'right',
    scopedSlots: { customRender: 'level_up' }
  },
  {
    title: '降级',
    dataIndex: 'level_down',
    align: 'right',
    scopedSlots: { customRender: 'level_down' }
  }
]
