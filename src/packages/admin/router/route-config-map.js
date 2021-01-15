export default {
  'version-list': {
    meta: {
      title: '版本管理',
      siderMenuRouteName: 'version-list',
      queryOptions: {
        p: { type: Number, default: 1 },
        ps: { type: Number, default: 20 }
      }
    }
  },
  'app-list': {
    meta: {
      title: 'APP管理',
      siderMenuRouteName: 'app-list',
      authKey: 'api/app',
      queryOptions: {
        p: { type: Number, default: 1 },
        ps: { type: Number, default: 20 },
        system_type: {
          type: Number,
          default: 1
        },
        push_status: {
          type: Number,
          default: -99
        }
      }
    }
  },
  'version-menu': {
    meta: {
      siderMenuRouteName: 'version-list',
      title: '菜单权限配置',
      queryOptions: {
        menu_type: {
          type: Number,
          default: 1
        },
        is_multi: {
          type: Number,
          default: 1
        }
      }
    }
  },
  'role-default': {
    meta: {
      siderMenuRouteName: 'role-default'
    },
    redirect: {
      name: 'role-default-auth'
    }
  },
  'role-default-auth': {
    meta: {
      title: '角色权限',
      queryOptions: {
        version_id: { type: Number, default: 1 },
        role_id: { type: Number },
        is_multi: { type: Number, default: 1 }
      }
    }
  },
  // 'role-default-level': {
  //   meta: {
  //     title: '角色等级',
  //     queryOptions: {
  //       version_id: { type: Number, default: 1 },
  //       level_id: { type: Number }
  //     }
  //   }
  // },
  'tooltip-list': {
    meta: {
      title: 'Tooltips',
      siderMenuRouteName: 'tooltip-list',
      queryOptions: {
        keywords: {
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
        only_list: {
          type: Number,
          default: 1
        }
      }
    }
  },
  'notice-list': {
    meta: {
      title: '公告管理',
      siderMenuRouteName: 'notice-list'
    }
  },
  'notice-list-system': {
    meta: {
      title: '系统公告',
      authKey: 'api/notice/system_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String
        },
        send_version: {
          type: Number
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
        },
        only_list: {
          type: Number,
          default: 1
        }
      }
    }
  },
  'notice-list-activity': {
    meta: {
      title: '活动公告',
      authKey: 'api/notice/activity_list',
      queryOptions: {
        mode: {
          type: String,
          default: 'search'
        },
        keywords: {
          type: String
        },
        version_id: {
          type: Number
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
        },
        only_list: {
          type: Number,
          default: 1
        }
      }
    }
  },
  'notice-system-edit': {
    meta: {
      title: '系统公告编辑',
      siderMenuRouteName: 'notice-list',
      queryOptions: {
        id: {
          type: Number
        },
        isEdit: {
          type: Number
        }
      }
    }
  },
  'notice-activity-edit': {
    meta: {
      title: '活动公告编辑',
      siderMenuRouteName: 'notice-list',
      queryOptions: {
        id: {
          type: Number
        },
        isEdit: {
          type: Number
        }
      }
    }
  },
  'pos-index': {
    meta: {
      title: 'POS机管理',
      siderMenuRouteName: 'pos-index'
    }
  },
  'pos-index-manage': {
    meta: {
      title: '商家POS机管理',
      authKey: 'api/pos/terminal_list',
      queryOptions: {
        brand_name: {
          type: String
        },
        shop_name: {
          type: String
        },
        terminal_no: {
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
  'pos-index-add': {
    meta: {
      title: 'POS机添加',
      authKey: 'api/pos/add',
      queryOptions: {
        leads_id: {
          type: String
        },
        brand_id: {
          type: String
        },
        brand_name: {
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
        status: {
          type: Number,
          default: -99
        }
      }
    }
  },
  'plugin-list': {
    meta: {
      title: '插件管理',
      siderMenuRouteName: 'plugin-list',
      queryOptions: {
        type: {
          type: Number
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
  'plugin-edit': {
    meta: {
      title: '插件编辑',
      siderMenuRouteName: 'plugin-list'
    }
  },
  'businesscase-list': {
    meta: {
      title: '运营案例',
      siderMenuRouteName: 'businesscase-list',
      queryOptions: {
        status: {
          type: Number
        },
        version_id: {
          type: Number
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
  'hardware-update-package-manage': {
    meta: {
      title: '更新包管理',
      siderMenuRouteName: 'hardware-update-package-manage',
      queryOptions: {
        keywords: {
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
        mode: {
          type: String,
          default: 'search'
        },
        apk_type: {
          type: String
        },
        app_id: {
          type: Number
        },
        apk_status: {
          type: String
        }
      }
    }
  },
  'menu-list': {
    meta: {
      title: '菜单管理',
      siderMenuRouteName: 'menu-list',
      queryOptions: {
        keywords: {
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
  'permission-list': {
    meta: {
      title: '权限组管理',
      siderMenuRouteName: 'permission-list'
    },
    redirect: {
      name: 'permission-list-groups'
    }
  },
  'permission-list-groups': {
    meta: {
      title: '权限组设置',
      authKey: 'api/perm-groups',
      siderMenuRouteName: 'permission-list',
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
  'permission-list-point': {
    meta: {
      title: '权限点设置',
      authKey: 'api/perms',
      siderMenuRouteName: 'permission-list'
    }
  },
  'module-list': {
    meta: {
      title: '模块列表',
      siderMenuRouteName: 'module-list',
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
  'module-add': {
    meta: {
      title: '模块编辑',
      siderMenuRouteName: 'module-list'
    }
  }
}
