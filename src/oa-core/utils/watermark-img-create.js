export default class WaterMark {
  constructor(options) {
    this.width = null
    this.height = null
    this.textAlign = null
    this.textBaseline = null
    this.font = null
    this.fillStyle = null
    this.rotate = null
    this.content = null
    this.observe = false
    this.$el = null
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const val = options[key]
        this[key] = val
      }
    }
    if (this.observe) {
      this.createObserver(this.$el)
    }
  }
  createUrl() {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    let ctx = canvas.getContext('2d')

    ctx.textAlign = this.textAlign
    ctx.textBaseline = this.textBaseline
    ctx.font = this.font
    ctx.fillStyle = this.fillStyle
    ctx.save()
    ctx.translate(parseFloat(this.width) / 2, parseFloat(this.height) / 2)
    ctx.rotate((Math.PI / 180) * this.rotate)
    ctx.fillText(this.content, 0, 0)
    ctx.restore()
    return canvas.toDataURL()
  }
  createObserver(el) {
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver
    const config = {
      attributes: true, //观察受监视元素的属性值更改
      attributeOldValue: true // 记录任何有改动的属性的上一个值
    }
    const callBack = this.observerCallBack()
    if (!MutationObserver) return false
    const om = new MutationObserver(callBack)
    om.observe(el, config)
  }
  observerCallBack() {
    return (mutationList, observer) => {
      /*mutationList包含一系列变动记录*/
      _.forEach(mutationList, mutationRecord => {
        const { type, attributeName } = mutationRecord
        const config = {
          attributes: true, //观察受监视元素的属性值更改
          attributeOldValue: true // 记录任何有改动的属性的上一个值
        }
        /*
        type 更改类型
        attributeName 返回被修改属性的属性名
        */
        if (type === 'attributes' && attributeName === 'style') {
          observer.disconnect() //先停止监听 否则会不断触发
          const { target, oldValue } = mutationRecord
          /*
          target 为受监视元素
          oldValue 被更改属性值的旧值
          */
          target.setAttribute('style', oldValue)
          observer.observe(target, config) // 修改完后恢复监听
        }
      })
    }
  }
}
