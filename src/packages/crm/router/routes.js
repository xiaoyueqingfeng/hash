import generatePageRoutes from 'oa-core/utils/generate/pages'
import routeConfigMap from './route-config-map'
const contextAppPage = require.context('@/views/pages', true, /\.vue$/)
export const beforeRoutes = []

const appRoutes = generatePageRoutes(
  contextAppPage,
  { namespace: '' },
  routeConfigMap
)

export const afterRoutes = [...appRoutes]
