import generatePages from 'oa-core/utils/generate/pages'

const contextPage = require.context('oa-core/views/pages', true, /\.vue$/)

const coreRoutes = generatePages(
  contextPage,
  { namespace: 'oa' },
  {
    'oa/user-login': {
      meta: { layout: 'login' }
    },
    'oa/user-update-password': {
      meta: { layout: 'login' }
    },
    'oa/user-update-password-confirm': {
      meta: { layout: 'login' }
    },
    'oa/system-auth': {
      meta: { title: '角色权限配置', siderMenuRouteName: 'oa/system-auth' }
    },
    // 可扩展route选项
    'oa/404': {
      meta: { layout: 'blank' }
    }
  }
)

export default coreRoutes
