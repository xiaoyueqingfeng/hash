export default (to, from, next) => {
  if (to.query._f) {
    delete to.query['_f']
  }
  const queryOptions = to.meta.queryOptions
  const formatedQuery = Object.assign({}, to.query)
  if (queryOptions) {
    for (let queryName in queryOptions) {
      const query = queryOptions[queryName]
      const queryType = query.type
      const queryDefaultValue = query.default
      if (queryName in to.query && to.query[queryName] !== undefined) {
        formatedQuery[queryName] = queryType(to.query[queryName])
      } else {
        formatedQuery[queryName] = queryDefaultValue
      }
      if ('_t' in formatedQuery) {
        delete formatedQuery._t
      }
    }
  }
  to.meta.query = formatedQuery
  next()
}
