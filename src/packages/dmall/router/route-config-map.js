export default {
  'goods-list': {
    meta: {
      title: '商品',
      siderMenuRouteName: 'goods-list',
      queryOptions: {
        status: {
          type: Number
        },
        supplier_id: {
          type: Number
        },
        category_id: {
          type: Number
        },
        keywords: {
          type: String,
          default: ''
        },
        channel: {
          type: Number
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'goods-types-list': {
    meta: {
      title: '商品分类',
      siderMenuRouteName: 'goods-types-list',
      queryOptions: {
        status: {
          type: String
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'distributor-list': {
    meta: {
      title: '分销商管理',
      siderMenuRouteName: 'distributor-list',
      queryOptions: {
        status: {
          type: String
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'suppliers-list': {
    meta: {
      title: '供应商管理',
      siderMenuRouteName: 'suppliers-list',
      queryOptions: {
        status: {
          type: String
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'brand-list': {
    meta: {
      title: '品牌商管理',
      siderMenuRouteName: 'brand-list',
      queryOptions: {
        brand_type: {
          type: Number
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'order-list': {
    meta: {
      title: '分销商城商品订单',
      siderMenuRouteName: 'order-list',
      queryOptions: {
        status: {
          type: Number
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'order-list': {
    meta: {
      title: '分销商城商品订单',
      siderMenuRouteName: 'order-list',
      queryOptions: {
        status: {
          type: Number
        },
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'order-refund': {
    meta: {
      title: '分销商退款记录',
      siderMenuRouteName: 'order-refund',
      queryOptions: {
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'order-emall-list': {
    meta: {
      title: '自营商品订单',
      siderMenuRouteName: 'order-emall-list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        status: {
          type: Number
        },
        keywords: {
          type: String,
          default: ''
        },
        mobile: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'order-emall-refund': {
    meta: {
      title: '自营商品退款记录',
      siderMenuRouteName: 'order-emall-refund',
      queryOptions: {
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'static-distributor-profit': {
    meta: {
      title: '分销商利润统计',
      authKey: 'mall/distributor/profit',
      siderMenuRouteName: 'static-distributor-profit',
      queryOptions: {
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  },
  'static-business-profit': {
    meta: {
      title: '商户利润统计',
      authKey: 'mall/business/profit',
      siderMenuRouteName: 'static-business-profit',
      queryOptions: {
        keywords: {
          type: String,
          default: ''
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        }
      }
    }
  }
}
