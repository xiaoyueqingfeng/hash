import axios from 'oa-core/axios'

axios.interceptors.request.use(config => {
  return config
})
export default axios
