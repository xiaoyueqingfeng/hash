import axios from 'oa-core/axios'

export const sendCaptcha = data =>
  axios.post('/sms-captcha/send', data, {
    platform: 'console'
  })
export const checkCaptcha = data =>
  axios.post('/sms-captcha/check', data, {
    platform: 'console'
  })
