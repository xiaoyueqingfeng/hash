export const tableOptions = vm => ({
  columns: [
    {
      title: '',
      scopedSlots: { customRender: 'checkbox' },
      width: 100
    },
    {
      title: '权限',
      dataIndex: 'name'
    }
  ]
})

export const shopOptions = vm => [
  {
    id: 0,
    name: '单门店'
  },
  {
    id: 1,
    name: '多门店'
  }
]
