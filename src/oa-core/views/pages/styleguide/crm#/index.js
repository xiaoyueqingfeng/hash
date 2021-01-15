import generateComponents from 'oa-core/utils/generate/components'

const demoContext = require.context('./', true, /\.vue$/)

const demoComponents = generateComponents(demoContext, { namespace: 'demo' })

export default demoComponents
