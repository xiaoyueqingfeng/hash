export const tableOptions = [
  {
    title: '客户名称',
    fixed: true,
    width: 180,
    dataIndex: 'brand_name',
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: 'leadsID',
    dataIndex: 'id'
  },
  {
    title: '客户等级',
    dataIndex: 'brand_level_tip'
  },
  {
    title: '最近拜访时间',
    dataIndex: 'last_visit_time',
    sorter: true
  },
  {
    dataIndex: 'become_order_protect_day',
    slots: { title: 'protectTitle' }
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
    title: '创建时间',
    dataIndex: 'created_time',
    sorter: true
  },
  {
    title: '运营模式',
    dataIndex: 'work_model_tip'
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
