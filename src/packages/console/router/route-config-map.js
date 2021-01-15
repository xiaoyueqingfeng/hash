export default {
  menu: {
    meta: {
      // 指定侧边栏显示哪一级菜单的路由名称
      siderMenuRouteName: 'menu',
      // 用于指定标签栏 标题
      title: '菜单管理',
      // 格式化query参数
      queryOptions: {
        platform_code: { type: String, default: 'console' }
      }
    }
  },
  'role-index': {
    meta: { title: '角色管理', siderMenuRouteName: 'role-index' }
  },
  'oa-manager': {
    meta: {
      title: '恒纪元APP管理',
      siderMenuRouteName: 'oa-manager',
      queryOptions: {
        p: { type: Number, default: 1 },
        ps: { type: Number, default: 20 },
        keywords: { type: String, default: '' },
        mode: { type: String, default: 'search' }
      }
    }
  },
  'organ-index': {
    meta: {
      title: '组织架构',
      siderMenuRouteName: 'organ-index',
      queryOptions: {
        p: { type: Number, default: 1 },
        ps: { type: Number, default: 20 },
        keywords: { type: String, default: '' },
        id: { type: String, default: '0' },
        status: { type: Number, default: 1 }
      }
    }
  },
  'organ-user-edit': {
    meta: { title: '编辑用户', siderMenuRouteName: 'organ-index' }
  },
  'organ-user-add': {
    meta: { title: '添加用户', siderMenuRouteName: 'organ-index' }
  }
}
