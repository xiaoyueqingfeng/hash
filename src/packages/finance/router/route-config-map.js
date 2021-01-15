export default {
  'distribution-commission': {
    meta: {
      title: '佣金列表',
      siderMenuRouteName: 'distribution-commission',
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
  'distribution-commission-detail': {
    meta: {
      title: '分佣明细',
      siderMenuRouteName: 'distribution-commission-detail',
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
  'distribution-agent': {
    meta: {
      title: '合伙人佣金统计',
      siderMenuRouteName: 'distribution-agent',
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
  'distribution-withdraw': {
    meta: {
      title: '提现记录表',
      siderMenuRouteName: 'distribution-withdraw',
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
  'mall-profit-commission': {
    meta: {
      title: '利润佣金明细',
      authKey: 'mall/profit/commission',
      siderMenuRouteName: 'mall-profit-commission',
      queryOptions: {
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
  'mall-business-withdraw': {
    meta: {
      title: '品牌商结算记录',
      authKey: 'mall/business/withdraw',
      siderMenuRouteName: 'mall-business-withdraw',
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
  'mall-distributor-withdraw': {
    meta: {
      title: '分销商提现记录',
      authKey: 'mall/distributor/withdraw',
      siderMenuRouteName: 'mall-distributor-withdraw',
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
  'platform-withdraw-list': {
    meta: {
      title: '提现管理',
      siderMenuRouteName: 'platform-withdraw-list',
      queryOptions: {
        search: {
          type: String,
          default: ''
        },
        status: {
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
  'platform-withdraw-flow': {
    meta: {
      title: '流水记录',
      siderMenuRouteName: 'platform-withdraw-flow',
      queryOptions: {
        leads_id: {
          type: Number
        },
        biz_type: {
          type: Number
        },
        start_date: {
          type: String,
          default: ''
        },
        end_date: {
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
  'platform-business-list': {
    meta: {
      title: '商家管理',
      siderMenuRouteName: 'platform-business-list',
      queryOptions: {
        search: {
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
  'platform-order-list': {
    meta: {
      title: '订单列表',
      siderMenuRouteName: 'platform-order-list',
      queryOptions: {
        brand_id: {
          type: Number
        },
        status: {
          type: Number
        },
        start_date: {
          type: String,
          default: ''
        },
        end_date: {
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
