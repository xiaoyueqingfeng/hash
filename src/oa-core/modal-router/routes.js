import generateModals from 'oa-core/utils/generate/modals'

const oaModalContext = require.context('oa-core/views/modals', true, /\.vue$/)
const appModalContext = require.context('@/views/modals', true, /\.vue$/)

const oaRoutes = generateModals(oaModalContext, { namespace: 'oa' })
const appRoutes = generateModals(appModalContext, { namespace: '' })

const allRoutes = [...oaRoutes, ...appRoutes]
export default allRoutes
