import moment from 'moment'
export default {
  dashboard: {
    meta: {
      title: '首页',
      siderMenuRouteName: 'dashboard',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        type: {
          type: String,
          default: '-99'
        },
        contract_type: {
          type: String,
          default: '-99'
        }
      }
    }
  },
  'customer-leads': {
    meta: {
      siderMenuRouteName: 'customer-leads'
    }
  },
  'customer-leads-public-sea': {
    meta: {
      title: 'leads公海',
      authKey: 'web/leads/public_sea_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        work_model: {
          type: Number
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        keywords: {
          type: String
        },
        channel_level1_id: {
          type: String
        },
        channel_level2_id: {
          type: String
        },
        throw_reason_id: {
          type: Number
        },
        created_time_start: {
          type: String
        },
        created_time_end: {
          type: String
        }
      }
    }
  },
  'customer-leads-private-sea': {
    meta: {
      title: 'leads私海',
      authKey: 'web/leads/private_sea_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        work_model: {
          type: Number
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        organ_id: {
          type: String
        },
        user_id: {
          type: String
        },
        keywords: {
          type: String
        },
        channel_level1_id: {
          type: String
        },
        channel_level2_id: {
          type: String
        },
        created_time_start: {
          type: String
        },
        created_time_end: {
          type: String
        },
        protect_time_start: {
          type: String
        },
        protect_time_end: {
          type: String
        },
        tag: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'customer-leads-invalid': {
    meta: {
      title: '无效leads',
      authKey: 'web/leads/invalid_list',
      siderMenuRouteName: 'customer-leads-invalid',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        keywords: {
          type: String
        }
      }
    }
  },
  /**
   * 父路由
   */
  'customer-potential': {
    meta: {
      siderMenuRouteName: 'customer-potential'
    }
  },
  'customer-potential-private-sea': {
    meta: {
      title: '客户私海',
      authKey: 'web/potential/private_sea_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        keywords: {
          type: String
        },
        organ_id: {
          type: String
        },
        work_model: {
          type: Number
        },
        user_id: {
          type: String
        },
        brand_level: {
          type: Number
        },
        translate_time_start: {
          type: String
        },
        translate_time_end: {
          type: String
        },
        last_visit_time_start: {
          type: String
        },
        last_visit_time_end: {
          type: String
        },
        tag: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'customer-potential-public-sea': {
    meta: {
      title: '客户公海',
      authKey: 'web/potential/public_sea_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        keywords: {
          type: String
        },
        brand_level: {
          type: Number
        },
        work_model: {
          type: Number
        },
        throw_reason_id: {
          type: Number
        },
        translate_time_start: {
          type: String
        },
        translate_time_end: {
          type: String
        },
        last_visit_time_start: {
          type: String
        },
        last_visit_time_end: {
          type: String
        }
      }
    }
  },
  'customer-potential-invalid': {
    meta: {
      title: '无效客户',
      authKey: 'web/potential/invalid_list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        keywords: {
          type: String
        }
      }
    }
  },
  'customer-new-sign-index': {
    meta: {
      title: '新签',
      siderMenuRouteName: 'customer-potential',
      // 是否在跳出该路由时 自动关闭该页标签
      autoCloseTab: true
    }
  },
  'customer-renew-index': {
    meta: {
      title: '续签',
      // siderMenuRouteName: 'customer-pay',
      // 是否在跳出该路由时 自动关闭该页标签
      autoCloseTab: true
    }
  },
  'customer-increase-purchase-index': {
    meta: {
      title: '增购',
      autoCloseTab: true
    }
  },
  'customer-hardware-sell': {
    meta: {
      title: '硬件售卖',
      siderMenuRouteName: 'customer-pay'
    }
  },
  'customer-pay': {
    redirect: {
      name: 'customer-pay-list'
    },
    meta: {
      siderMenuRouteName: 'customer-pay'
    }
  },
  'customer-pay-list': {
    meta: {
      title: '签约客户',
      authKey: 'web/pay/list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        keywords: {
          type: String
        },
        order_by: {
          type: String
        },
        work_model: {
          type: Number
        },
        server_level: {
          type: Number
        },
        system_version_id: {
          type: String
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        server_id: {
          type: String
        },
        system_open_time_start: {
          type: String
        },
        system_open_time_end: {
          type: String
        },
        system_expired_time_start: {
          type: String
        },
        system_expired_time_end: {
          type: String
        },
        continue_login_day_min: {
          type: Number
        },
        continue_login_day_max: {
          type: Number
        },
        last_login_time_min: {
          type: Number
        },
        recently_service_record_start_time: {
          type: String
        },
        recently_service_record_end_time: {
          type: String
        },
        new_sign_status: {
          type: Number
        },
        sign_contract_status: {
          type: Number
        },
        hardware_assign_day: {
          type: Number
        },
        tel_sale_id: {
          type: String
        },
        tag: {
          type: String
        }
      }
    }
  },
  'customer-break': {
    redirect: {
      name: 'customer-break-list'
    },
    meta: {
      siderMenuRouteName: 'customer-break'
    }
  },
  'customer-break-list': {
    meta: {
      title: '断约客户',
      authKey: 'web/potential/public_break_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        throw_reason_id: {
          type: Number
        }
      }
    }
  },
  'customer-force': {
    redirect: {
      name: 'customer-force-list'
    },
    meta: {
      siderMenuRouteName: 'customer-force'
    }
  },
  'customer-force-list': {
    meta: {
      title: '强开客户',
      authKey: '	web/potential/public_force_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        throw_reason_id: {
          type: Number
        }
      }
    }
  },
  'stat-site-list': {
    redirect: {
      name: 'stat-site-list-default'
    },
    meta: {
      siderMenuRouteName: 'stat-site-list'
    }
  },
  'stat-site-list-default': {
    meta: {
      title: '全站数据',
      siderMenuRouteName: 'stat-site-list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  'stat-leads': {
    redirect: {
      name: 'stat-leads-default'
    },
    meta: {
      siderMenuRouteName: 'stat-leads'
    }
  },
  'stat-leads-report': {
    meta: {
      title: 'leads日报',
      siderMenuRouteName: 'stat-leads',
      authKey: 'web/stat/leads_chart',
      queryOptions: {
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  'stat-leads-default': {
    meta: {
      authKey: 'web/stat/leads_calculate_list',
      title: 'leads统计',
      siderMenuRouteName: 'stat-leads'
    },
    redirect: {
      name: 'stat-leads-default-list'
    }
  },
  'stat-leads-default-list': {
    meta: {
      title: 'leads统计-列表',
      queryOptions: {
        organ_id: {
          type: String
        },
        user_id: {
          type: String
        },
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  'stat-leads-default-chart': {
    meta: {
      title: 'leads统计 - 图表'
    }
  },
  'stat-sale': {
    meta: {
      siderMenuRouteName: 'stat-sale'
    }
  },
  'stat-sale-default': {
    meta: {
      title: '业绩统计',
      siderMenuRouteName: 'stat-sale',
      authKey: 'web/stat/sale_calculate_list'
    },
    redirect: {
      name: 'stat-sale-default-list'
    }
  },
  'stat-sale-default-list': {
    meta: {
      title: '业绩统计 - 列表',
      queryOptions: {
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  'stat-sale-default-chart': {
    meta: {
      title: '业绩统计 - 图表'
    }
  },
  'stat-sale-team': {
    meta: {
      title: '团队业绩报表',
      siderMenuRouteName: 'stat-sale',
      authKey: 'web/stat/sale_organ_bar',
      queryOptions: {
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        organ_id: {
          type: String
        },
        city_id: {
          type: String
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
  'stat-sale-user': {
    meta: {
      title: '员工销售报表',
      siderMenuRouteName: 'stat-sale',
      authKey: 'web/stat/sale_user_list',
      queryOptions: {
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        user_id: {
          type: String
        },
        organ_id: {
          type: String
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
  'stat-server': {
    meta: {
      siderMenuRouteName: 'stat-server'
    }
  },
  'stat-server-default': {
    meta: {
      title: '商服统计',
      siderMenuRouteName: 'stat-server',
      authKey: 'web/stat/server_calculate_list'
    },
    redirect: {
      name: 'stat-server-default-list'
    }
  },
  'stat-server-default-list': {
    meta: {
      title: '商服统计 - 列表',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },

        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  'stat-server-default-chart': {
    meta: {
      title: '商服统计 - 图表'
    }
  },
  'stat-server-report': {
    meta: {
      title: '商服报表',
      siderMenuRouteName: 'stat-server',
      authKey: 'web/stat/server_user_list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        date_start: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        date_end: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        user_id: {
          type: String
        },
        organ_id: {
          type: String
        }
      }
    }
  },
  'stat-sale-process': {
    redirect: {
      name: 'stat-sale-process-visit-organ'
    },
    meta: {
      siderMenuRouteName: 'stat-sale-process'
    }
  },
  'stat-sale-process-visit-organ': {
    meta: {
      title: '团队拜访统计',
      siderMenuRouteName: 'stat-sale-process',
      authKey: 'web/stat/visit_organ_date',
      queryOptions: {
        start_time: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        end_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        organ_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        dimensionality: {
          type: String,
          default: 'date'
        },
        time_order: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'stat-sale-process-visit-staff': {
    meta: {
      title: '员工拜访统计',
      siderMenuRouteName: 'stat-sale-process',
      authKey: 'web/stat/visit_user_date',
      queryOptions: {
        start_time: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        end_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        dimensionality: {
          type: String,
          default: 'date'
        },
        time_order: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'stat-sale-process-custom-organ': {
    meta: {
      title: '团队客户统计',
      siderMenuRouteName: 'stat-sale-process',
      authKey: 'web/stat/custom_organ_date',
      queryOptions: {
        start_time: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        end_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        organ_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        dimensionality: {
          type: String,
          default: 'date'
        },
        time_order: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'stat-sale-process-custom-staff': {
    meta: {
      title: '员工客户统计',
      siderMenuRouteName: 'stat-sale-process',
      authKey: 'web/stat/custom_user_date',
      queryOptions: {
        start_time: {
          type: String,
          default: moment()
            .startOf('month')
            .format('YYYY-MM-DD')
        },
        end_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        dimensionality: {
          type: String,
          default: 'date'
        },
        time_order: {
          type: String,
          default: undefined
        }
      }
    }
  },
  'stat-market': {
    redirect: {
      name: 'stat-market-customer'
    },
    meta: {
      siderMenuRouteName: 'stat-market'
    }
  },
  'stat-market-customer': {
    meta: {
      title: '客户分级',
      siderMenuRouteName: 'stat-market',
      authKey: 'web/serverlevel/leads_level_statistics',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        start_date: {
          type: String,
          default: moment()
            .subtract(31, 'days')
            .format('YYYY-MM-DD')
        },
        end_date: {
          type: String,
          default: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
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
  'stat-brand': {
    redirect: {
      name: 'stat-brand-operation-overview'
    },
    meta: {
      siderMenuRouteName: 'stat-brand'
    }
  },
  'stat-brand-operation-overview': {
    meta: {
      title: '品牌运营统计',
      siderMenuRouteName: 'stat-brand',
      authKey: 'web/serverlevel/brand_active_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        start_date: {
          type: String,
          default: moment()
            .subtract(31, 'days')
            .format('YYYY-MM-DD')
        },
        end_date: {
          type: String,
          default: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        work_model: {
          type: Number
        }
      }
    }
  },
  'stat-brand-operation-daily': {
    meta: {
      title: '品牌运营日报',
      siderMenuRouteName: 'stat-brand',
      authKey: 'web/serverlevel/brand_operate_manager',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        start_date: {
          type: String,
          default: moment()
            .subtract(31, 'days')
            .format('YYYY-MM-DD')
        },
        end_date: {
          type: String,
          default: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        work_model: {
          type: Number
        },
        is_renew_period: {
          type: Number
        },
        is_open: {
          type: Number
        },
        system_version: {
          type: Number
        },
        dimensionality: {
          type: String,
          default: 'brand'
        }
      }
    }
  },
  'stat-brand-classification-daily': {
    meta: {
      title: '品牌分级日报',
      siderMenuRouteName: 'stat-brand',
      authKey: 'web/serverlevel/brand_level_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        start_date: {
          type: String,
          default: moment()
            .subtract(31, 'days')
            .format('YYYY-MM-DD')
        },
        end_date: {
          type: String,
          default: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        },
        province_id: {
          type: Number
        },
        city_id: {
          type: Number
        },
        organ_id: {
          type: String,
          default: undefined
        },
        user_id: {
          type: String,
          default: undefined
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        work_model: {
          type: Number
        },
        is_renew_period: {
          type: Number
        },
        is_open: {
          type: Number
        },
        system_type: {
          type: Number
        },
        system_version: {
          type: Number
        },
        leads_level: {
          type: Number
        }
      }
    }
  },
  'follow-service': {
    meta: {
      title: '服务记录',
      siderMenuRouteName: 'follow-service',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        work_model: {
          type: Number
          // default: -99
        },
        service_type: {
          type: Number
          // default: -99
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 5
        },
        only_list: {
          type: Number,
          default: 1
        },
        start_time: {
          type: String,
          default: ''
        },
        end_time: {
          type: String,
          default: ''
        },
        service_model: {
          type: Number
        }
      }
    }
  },
  'follow-visit': {
    meta: {
      title: '拜访记录',
      siderMenuRouteName: 'follow-visit',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        work_model: {
          type: Number
          // default: -99
        },
        model: {
          type: Number
          // default: -99
        },
        schedule: {
          type: Number
          // default: -99
        },
        user_id: {
          type: Number
          // default: -99
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 5
        },
        only_list: {
          type: Number,
          default: 1
        },
        start_time: {
          type: String,
          default: ''
        },
        end_time: {
          type: String,
          default: ''
        },
        visit_model: {
          type: Number
        }
      }
    }
  },
  'follow-workplan': {
    meta: {
      title: '工作计划',
      siderMenuRouteName: 'follow-workplan',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 5
        },
        only_list: {
          type: Number,
          default: 1
        },
        start_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        end_time: {
          type: String,
          default: moment().format('YYYY-MM-DD')
        },
        status: {
          type: Number
          // default: -99
        }
      }
    }
  },
  'system-merge': {
    meta: {
      title: '客户合并记录',
      siderMenuRouteName: 'system-merge',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        },
        order_by: {
          type: String
        }
      }
    }
  },
  'system-channel': {
    meta: {
      title: '渠道设置',
      siderMenuRouteName: 'system-channel',
      queryOptions: {
        channel_level1_id: {
          type: String,
          default: '1'
        },
        status: {
          type: Number,
          default: -99
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        only_list: {
          type: Number,
          default: 1
        }
      }
    }
  },
  'system-tag': {
    meta: {
      title: '标签设置',
      siderMenuRouteName: 'system-tag',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        status: {
          type: Number
        },
        type: {
          type: Number
        }
      }
    }
  },
  'system-customField': {
    meta: {
      siderMenuRouteName: 'system-customField'
    }
  },
  'system-customField-listInit': {
    meta: {
      title: '页面初始化',
      siderMenuRouteName: 'system-customField',
      authKey: 'web/list/index',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        },
        status: {
          type: Number,
          default: ''
        }
      }
    }
  },
  'system-customField-fieldStore': {
    meta: {
      title: '字段库',
      siderMenuRouteName: 'system-customField',
      authKey: 'web/listfields/index',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        },
        status: {
          type: Number
        }
      }
    }
  },
  'system-download': {
    meta: {
      siderMenuRouteName: 'system-download'
    }
  },
  'system-download-export': {
    meta: {
      title: '导出结果',
      authKey: 'web/export/get_export_list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        start_time: {
          type: String,
          default: ''
        },
        end_time: {
          type: String,
          default: ''
        }
      }
    }
  },
  'system-download-import': {
    meta: {
      title: '导入结果',
      authKey: 'web/import/get_import_list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        start_time: {
          type: String,
          default: ''
        },
        end_time: {
          type: String,
          default: ''
        }
      }
    }
  },
  'open-product': {
    meta: {
      title: '产品管理',
      siderMenuRouteName: 'open-product',
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
  'open-supplier': {
    meta: {
      title: '供应商管理',
      siderMenuRouteName: 'open-supplier',
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
  'open-device': {
    meta: {
      title: '设备注册管理',
      siderMenuRouteName: 'open-device',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        }
      }
    }
  },
  'product-hardware': {
    meta: {
      siderMenuRouteName: 'product-hardware',
      title: '硬件列表',
      authKey: 'web/hardware/list',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        leads_id: {
          type: String,
          default: ''
        },
        shop_id: {
          type: String,
          default: ''
        },
        device_code: {
          type: String,
          default: ''
        }
      }
    }
  },
  'product-device-manage': {
    meta: {
      title: ' 场馆设备管理',
      authKey: 'web/device_manage',
      siderMenuRouteName: 'product-device-manage',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        leads_id: {
          type: String
          // default: ''
        },
        shop_id: {
          type: String
          // default: ''
        },
        device_id: {
          type: String
          // default: ''
        },
        category_id: {
          type: Number
        },
        app_id: {
          type: Number
        },
        app_version_id: {
          type: Number
        },
        online_status: {
          type: Number
        }
      }
    }
  },
  'product-task': {
    meta: {
      siderMenuRouteName: 'product-task',
      title: '更新任务管理',
      authKey: 'web/update_task',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        apk_name: {
          type: String
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        category_id: {
          type: Number
        },
        version_name: {
          type: String
        },
        issue_start_time: {
          type: String
        },
        issue_end_time: {
          type: String
        }
      }
    }
  },
  'product-software': {
    meta: {
      title: '软件列表',
      authKey: 'web/software/list',
      siderMenuRouteName: 'product-software',
      queryOptions: {
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String,
          default: ''
        },
        system_version_id: {
          type: String
        },
        system_open_time_start: {
          type: String
        },
        system_open_time_end: {
          type: String
        }
      }
    }
  },
  'product-auth-add': {
    meta: {
      title: '功能菜单配置',
      siderMenuRouteName: 'product-software',
      queryOptions: {
        version_id: { type: Number, default: 1 },
        level_id: { type: Number },
        leads_id: { type: Number },
        tag: {
          type: String,
          default: 'single'
        },
        is_multi: { type: Number, default: 1 }
      }
    }
  },
  'product-locker-entry': {
    meta: {
      title: '智能储物柜选择',
      siderMenuRouteName: 'product-hardware',
      queryOptions: {
        device_id: {
          type: String
        }
      },
      // 是否在跳出该路由时 自动关闭该页标签
      autoCloseTab: true
    }
  },
  'product-locker-bind': {
    meta: {
      title: '智能储物柜绑定',
      siderMenuRouteName: 'product-hardware',
      queryOptions: {
        device_id: {
          type: String
        }
      },
      // 是否在跳出该路由时 自动关闭该页标签
      autoCloseTab: true
    }
  },
  'product-mina': {
    meta: {
      title: '小程序管理',
      siderMenuRouteName: 'product-mina',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        leads_id: {
          type: String,
          default: ''
        },
        leads_name: {
          type: String,
          default: ''
        },
        send_status: {
          type: Number
        },
        bind_mch: {
          type: Number
        }
      }
    }
  },
  'sale-distribution': {
    meta: {
      siderMenuRouteName: 'sale-distribution'
    }
  },
  'sale-distribution-agent': {
    meta: {
      title: '合伙人列表',
      authKey: 'web/agent/list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        }
      }
    }
  },
  'sale-distribution-invite': {
    meta: {
      title: '推荐客户列表',
      authKey: 'web/invite/list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        p: {
          type: Number,
          default: 1
        },
        ps: {
          type: Number,
          default: 20
        },
        keywords: {
          type: String,
          default: ''
        },
        is_signing: {
          type: Number
        },
        is_open_system: {
          type: Number
        }
      }
    }
  },
  'migration-cabinet': {
    meta: {
      siderMenuRouteName: 'migration-cabinet',
      title: '储物柜迁移'
    }
  }
}
