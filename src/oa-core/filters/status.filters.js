export const statusFilter = (key, options) => {
  if (!Array.isArray(options)) {
    return 'Invalid status Options'
  }
  let val
  options.map(item => {
    if (item.id.toString() === key.toString()) {
      val = item['name']
    }
  })
  return val
}
