export const tableOptions = [
  {
    title: '客户名称',
    dataIndex: 'brand_name',
    fixed: true,
    width: 180,
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: 'leadsID',
    dataIndex: 'id'
  },
  {
    title: '电销拜访状态',
    dataIndex: 'tel_visit_tip'
  },
  {
    title: '最近电销拜访时间',
    dataIndex: 'last_tel_visit_time',
    sorter: true,
    width: 160
  },
  {
    title: '拜访进度',
    dataIndex: 'schedule_tip'
  },
  {
    title: '分配时间',
    dataIndex: 'protect_time'
  },
  {
    title: '运营模式',
    dataIndex: 'work_model_tip'
  },
  {
    title: '城市',
    dataIndex: 'province_city_name'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '跟进电销',
    dataIndex: 'tel_sale_name'
  },
  {
    title: '跟进销售',
    dataIndex: 'sale_name'
  },
  {
    title: '渠道',
    dataIndex: 'channel_l1_l2_name'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    sorter: true
  },
  {
    width: 70,
    fixed: 'right',
    customRenderIndex: 'action',
    slots: {
      title: 'actionTitle'
    },
    scopedSlots: { customRender: 'action' }
  }
]
