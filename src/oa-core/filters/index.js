const modalContext = require.context('./', false, /\.filters.js$/)
const modalKeys = modalContext.keys()

const filters = {}
modalKeys.forEach(keyPath => {
  const file = modalContext(keyPath)
  const cateFilters = file.default || file
  for (let filterName in cateFilters) {
    filters[filterName] = cateFilters[filterName]
  }
})

export default filters
