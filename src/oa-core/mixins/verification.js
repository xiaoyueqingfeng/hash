export default {
  data() {
    return {
      nvc: null,
      nv_scene: 'nc_login',
      nv_token: '',
      nv_csessionid: '',
      nv_sig: ''
    }
  },
  methods: {
    verificationCallBack(data) {
      this.nv_token = data.token
      this.nv_csessionid = data.csessionid
      this.nv_sig = data.sig
    },
    resetNVC() {
      this.nvc.reload()
    },
    openNVC() {
      let nv_token = [
        'FFFF0N0N00000000807F',
        new Date().getTime(),
        Math.random()
      ].join(':')
      let NVC_Opt = {
        appkey: 'FFFF0N0N00000000807F',
        scene: this.nv_scene,
        renderTo: 'no-captcha',
        token: nv_token,
        callback: this.verificationCallBack
      }
      this.nvc = new noCaptcha(NVC_Opt)
      this.nvc.upLang('cn', {
        _startTEXT: '请按住滑块，拖动到最右边',
        _yesTEXT: '验证通过',
        _error300:
          '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
        _errorNetwork:
          '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
      })
    }
  }
}
