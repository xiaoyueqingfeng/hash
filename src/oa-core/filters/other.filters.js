export const mapFilter = (v, map) => map[v]
export const userMobileMaskFilter = v =>
  v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
