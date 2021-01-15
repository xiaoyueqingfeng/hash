import axios from '@/axios'

export const addAccompany = data => axios.post('/web/accompany/add', data, {})
