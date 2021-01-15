export const tableOptions = vm => ({
  columns: [
    {
      title: '付费类型',
      dataIndex: 'name',
      key: '1'
    },
    {
      title: '付费时间',
      dataIndex: 'created_time',
      key: '2'
    },
    {
      title: '付费金额(元)',
      dataIndex: 'total_price',
      key: '3'
    },
    {
      title: '使用时长',
      key: '4',
      dataIndex: 'qty_tip'
    },
    // {
    //   title: '购买方式',
    //   key: '5',
    //   dataIndex: 'kp_tip'
    // },
    // {
    //   title: '支付方式',
    //   key: '5',
    //   dataIndex: 'kp_tip'
    // },
    {
      title: '售卖人',
      key: '5',
      dataIndex: 'sale_name'
    }
    // {
    //   title: '操作',
    //   key: 'operation',
    //   scopedSlots: { customRender: ' <template >323223</template>' }
    // }
  ]
})
