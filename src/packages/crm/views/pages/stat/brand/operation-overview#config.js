export default [
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
    dataIndex: 'follow_user_tip'
  },
  {
    title: '省份',
    dataIndex: 'province_name'
  },
  {
    title: '城市',
    dataIndex: 'city_name'
  },
  {
    title: '运营模式',
    dataIndex: 'work_model_tip'
  },
  {
    title: '期初商服分级',
    dataIndex: 'start_server_level_desc'
  },
  {
    title: '期末商服分级',
    dataIndex: 'end_server_level_desc'
  },
  {
    title: '升级降级',
    dataIndex: 'leads_level_change_desc'
  }
]
