import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default (to, from, next) => {
  nProgress.start()
  next()
}
