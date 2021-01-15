export const tableOptions = vm => ({
  columns: [
    {
      title: 'leadsID',
      dataIndex: 'leads_id',
      fixed: 'left',
      width: 200
    },
    {
      title: '品牌名称',
      dataIndex: 'leads_name'
    },
    {
      title: '场馆名称',

      dataIndex: 'shop_name'
    },
    {
      title: '场馆ID',
      dataIndex: 'shop_id'
    },
    {
      title: '自定义名称',
      dataIndex: 'custom_name'
    },
    {
      title: '在线状态',
      dataIndex: 'online_status_tip'
    },
    {
      title: '使用状态',
      dataIndex: 'use_status_tip'
    },
    {
      title: '设备名称',
      dataIndex: 'app_name'
    },
    {
      title: '场地区域',
      dataIndex: 'shop_area'
    },
    {
      title: '储物柜区域',
      dataIndex: 'cabinet_area_name'
    },
    {
      title: '来源',
      dataIndex: 'source_type'
    },
    {
      title: '操作',
      key: 'action',
      width: 60,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
})
