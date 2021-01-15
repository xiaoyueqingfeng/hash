import generateLayouts from 'oa-core/utils/generate/layouts'

const contextLayout = require.context('./', true, /\.vue$/)

const LayoutMap = generateLayouts(contextLayout)

export default LayoutMap
