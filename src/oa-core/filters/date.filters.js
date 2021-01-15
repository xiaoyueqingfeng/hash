import moment from 'moment'
export const dateFilter = (v, format = 'YYYY-MM-DD') => {
  if (!v) {
    return '--'
  }
  if (v.indexOf('0000-') > -1) {
    return '--'
  }
  return moment(v).format(format)
}
