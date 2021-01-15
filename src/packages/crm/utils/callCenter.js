import { get_agent_token, call_log_add } from '@/api/udesk'
import { notification } from 'ant-design-vue'
import container from 'oa-core/container'
const CallCenter = class {
  constructor() {
    this.udeskCallcenterComponent = null // 通话组件实例
    this.hangeUpCb = null
    this.subDomain = '1382207.s2'
    this.registerOk = false
  }
  /**
   * @description 通话组件初始化
   */
  async init() {
    let token = await this.getToken()
    if (!token) {
      notification.warning({
        message: '通话组件获取TOKEN失败'
      })
      return false
    }
    return new Promise((resolve, reject) => {
      this.udeskCallcenterComponent = new UdeskCallcenterComponent({
        container: document.body, //组件的容器
        token: token, //通过登录接口获取的客服token
        subDomain: this.subDomain, //在udesk注册的二级域名，例如登录地址是demo.udesk.cn，这里填demo
        showManualScreenPop: false, //是否开启‘手动弹屏’功能
        movable: true,
        onHangup: this.onHangup.bind(this),
        onInitSuccess: this.onInitSuccess.bind(this),
        onInitFailure: this.onInitFailure.bind(this),
        onSoftPhoneRegistered: this.onSoftPhoneRegistered.bind(this),
        onSoftPhoneUnregistered: this.onSoftPhoneUnregistered.bind(this)
      })
      this.changeShowStatus(false)
      resolve()
    })
  }
  /**
   * @description 获取通话组件初始化所用的token
   */
  getToken() {
    return get_agent_token().then(res => {
      return res.agent_token
    })
  }
  changeShowStatus(status) {
    // let wrapper =
    //   this.udeskCallcenterComponent && this.udeskCallcenterComponent.wrapper
    // if (wrapper) wrapper.style.display = status ? 'block' : 'none'
  }
  /**
   * @description 通话上报
   */
  callLogAdd(call_id, err_id) {
    return call_log_add({ call_id, err_id })
      .then(res => {
        this.hangeUpCb && this.hangeUpCb(call_id)
        // 通话结束回调
      })
      .catch(err => {
        this.hangeUpCb && this.hangeUpCb()
      })
  }
  setHangupCb(cb) {
    this.hangeUpCb = cb
  }
  /**
   * @description 通话组件拨打电话
   */
  makeCall(callNumber) {
    this.changeShowStatus(true)
    this.udeskCallcenterComponent &&
      this.udeskCallcenterComponent.makeCall(callNumber)
  }
  /**
   * @description 通话组件初始化成功回调
   */
  onInitSuccess(e) {
    console.log('onInitSuccess', e)
  }
  /**
   * @description 通话组件初始化失败回调
   */
  onInitFailure(e) {
    console.log('onInitFailure', e)
    notification.warning({
      message: '通话组件初始化数据获取失败'
    })
  }
  onSoftPhoneRegistered() {
    console.log('onSoftPhoneRegistered')
    this.registerOk = true
  }
  onSoftPhoneUnregistered() {
    console.log('onSoftPhoneUnregistered')
    this.registerOk = false
  }
  /**
   * @description 挂断
   */
  onHangup(conversation) {
    console.log('onHangup 挂断')
    let err_id
    if (!window.udesk_call_Id) {
      window.udesk_call_Id = conversation.call_id
    } else if (window.udesk_call_Id === conversation.call_id) {
      err_id = `hangup_${conversation.call_id}`
    }
    this.callLogAdd(conversation.call_id, err_id)
    // 通话组件隐藏
    this.changeShowStatus(false)
  }
  onDropCall(result) {
    console.log('onDropCall', result)
  }
  destroyed() {
    console.log('destoryed')
    this.udeskCallcenterComponent && this.udeskCallcenterComponent.destroy()
  }
}
const hangUpCb = function() {
  let modalRouter = container.get('modalRouter')
  modalRouter.push({
    name: 'service-add'
  })
}
export default async function() {
  try {
    let udeskCallCenter = new CallCenter()
    container.set('udeskCallCenter', udeskCallCenter)
    await udeskCallCenter.init()
    udeskCallCenter.setHangupCb(hangUpCb)
  } catch (error) {
    notification.warning({
      message: '通话组件初始化失败'
    })
  }
}
