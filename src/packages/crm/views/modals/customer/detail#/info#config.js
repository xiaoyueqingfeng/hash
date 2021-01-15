export const tableOptions = vm => ({
  columns: [
    {
      title: '门店名称',
      dataIndex: 'shop_name'
    },
    {
      title: '状态',
      scopedSlots: {
        customRender: 'shop_status'
      }
    },
    {
      title: '电话',
      scopedSlots: {
        customRender: 'shop_mobile'
      }
    },
    {
      title: '城市',
      dataIndex: 'city_name'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '邮箱',
      dataIndex: 'mail'
    }
  ]
})
