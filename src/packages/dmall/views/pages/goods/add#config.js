import moment from 'moment'
export const ruleOptions = vm => {
  const info = vm.info || {}
  return {
    // 商品名称
    name: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请填写商品名称'
            }
          }
        }
      ],
      initialValue: info.name
    },
    // 商品类型
    category_id: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请选择商品类型'
            }
          }
        }
      ],
      initialValue: info.category_id
    },
    // 供应商
    supplier_id: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请选择供应商'
            }
          }
        }
      ],
      initialValue: info.supplier_id
    },
    channel: {
      initialValue: info.channel || [1]
    },
    order_count: {
      initialValue: info.order_count || 0
    },
    // 商品图片
    goods_images: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value.length) {
              return '请添加商品图片'
            }
          }
        }
      ],
      initialValue: info.goods_images
    },
    spec_type: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请选规格'
            }
          }
        }
      ],
      initialValue: info.spec_type || 1
    },
    'spec_name.0': {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请填写规格名称'
            }
          }
        }
      ]
    },
    'spec_name.1': {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请填写规格名称'
            }
          }
        }
      ]
    },
    'spec_name.2': {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请填写规格名称'
            }
          }
        }
      ]
    },
    is_free_shipping: {
      initialValue:
        info.is_free_shipping !== undefined ? info.is_free_shipping : 1
    },
    content: { initialValue: info.content },
    sort_order: {
      initialValue: info.sort_order || 0
    },
    status: {
      initialValue: info.status || 0
    }
  }
}
const allMall = [
  {
    dataIndex: 'delete_line_price',
    width: 228,
    slots: { title: 'delete_line_price' },
    scopedSlots: { customRender: 'delete_line_price' }
  },
  {
    dataIndex: 'retail_price',
    width: 228,
    slots: { title: 'retail_price' },
    scopedSlots: { customRender: 'retail_price' }
  },
  {
    dataIndex: 'market_price',
    width: 228,
    slots: { title: 'market_price' },
    scopedSlots: { customRender: 'market_price' }
  },
  {
    title: '销售底价(元)',
    dataIndex: 'cost_price',
    width: 228,
    slots: { title: 'cost_price' },
    scopedSlots: { customRender: 'cost_price' }
  },
  {
    dataIndex: 'v1_price',
    width: 228,
    slots: { title: 'v1_price' },
    scopedSlots: { customRender: 'v1_price' }
  },
  {
    dataIndex: 'v2_price',
    width: 228,
    slots: { title: 'v2_price' },
    scopedSlots: { customRender: 'v2_price' }
  },

  {
    dataIndex: 'v3_price',
    width: 228,
    slots: { title: 'v3_price' },
    scopedSlots: { customRender: 'v3_price' }
  },
  {
    dataIndex: 'prime_cost_price',
    width: 228,
    slots: { title: 'prime_cost_price' },
    scopedSlots: { customRender: 'prime_cost_price' }
  },
  {
    dataIndex: 'commission',
    width: 228,
    slots: { title: 'commission' },
    scopedSlots: { customRender: 'commission' }
  },
  {
    dataIndex: 'store_count',
    width: 228,
    slots: { title: 'store_count' },
    scopedSlots: { customRender: 'store_count' }
  },
  {
    dataIndex: 'weight',
    width: 228,
    slots: { title: 'weight' },
    scopedSlots: { customRender: 'weight' }
  }
]
const dmall = [
  {
    dataIndex: 'market_price',
    width: 228,
    slots: { title: 'market_price' },
    scopedSlots: { customRender: 'market_price' }
  },
  {
    title: '销售底价(元)',
    dataIndex: 'cost_price',
    width: 228,
    slots: { title: 'cost_price' },
    scopedSlots: { customRender: 'cost_price' }
  },
  {
    dataIndex: 'v1_price',
    width: 228,
    slots: { title: 'v1_price' },
    scopedSlots: { customRender: 'v1_price' }
  },
  {
    dataIndex: 'v2_price',
    width: 228,
    slots: { title: 'v2_price' },
    scopedSlots: { customRender: 'v2_price' }
  },

  {
    dataIndex: 'v3_price',
    width: 228,
    slots: { title: 'v3_price' },
    scopedSlots: { customRender: 'v3_price' }
  },
  {
    dataIndex: 'prime_cost_price',
    width: 228,
    slots: { title: 'prime_cost_price' },
    scopedSlots: { customRender: 'prime_cost_price' }
  },
  {
    dataIndex: 'commission',
    width: 228,
    slots: { title: 'commission' },
    scopedSlots: { customRender: 'commission' }
  },
  {
    dataIndex: 'store_count',
    width: 228,
    slots: { title: 'store_count' },
    scopedSlots: { customRender: 'store_count' }
  },
  {
    dataIndex: 'weight',
    width: 228,
    slots: { title: 'weight' },
    scopedSlots: { customRender: 'weight' }
  }
]

const emall = [
  {
    dataIndex: 'delete_line_price',
    width: 228,
    slots: { title: 'delete_line_price' },
    scopedSlots: { customRender: 'delete_line_price' }
  },
  {
    dataIndex: 'retail_price',
    width: 228,
    slots: { title: 'retail_price' },
    scopedSlots: { customRender: 'retail_price' }
  },
  {
    title: '销售底价(元)',
    dataIndex: 'cost_price',
    width: 228,
    slots: { title: 'cost_price' },
    scopedSlots: { customRender: 'cost_price' }
  },
  {
    dataIndex: 'prime_cost_price',
    width: 228,
    slots: { title: 'prime_cost_price' },
    scopedSlots: { customRender: 'prime_cost_price' }
  },
  {
    dataIndex: 'store_count',
    width: 228,
    slots: { title: 'store_count' },
    scopedSlots: { customRender: 'store_count' }
  },
  {
    dataIndex: 'weight',
    width: 228,
    slots: { title: 'weight' },
    scopedSlots: { customRender: 'weight' }
  }
]
export const skuColumns = vm => {
  if (vm.channel.length === 2) {
    return vm.sku.concat(allMall)
  } else if (vm.channel.length === 1 && vm.channel.includes(1)) {
    return vm.sku.concat(emall)
  } else if (vm.channel.length === 1 && vm.channel.includes(2)) {
    return vm.sku.concat(dmall)
  }
}
