import generateComponents from 'oa-core/utils/generate/components'

const coreContextComponent = require.context('./', true, /\.vue$/)
const appContextComponent = require.context(
  '@/views/components/',
  true,
  /\.vue$/
)

const coreComponentMap = generateComponents(coreContextComponent, {
  namespace: 'oa'
})
const appComponentMap = generateComponents(appContextComponent, {
  namespace: process.env.PLATFORM
})

const componentMap = Object.assign(coreComponentMap, appComponentMap)
export default componentMap
