<template>
  <div>
    <h2 class="mg-t24">class 全局样式</h2>
    <section class="sg-section">
      <h3>vars 色值 oa-core/styles/_vars.less</h3>
      <div class="sg-box sg-box--primary" v-bg>@primary-color 主要</div>
      <div class="sg-box sg-box--warning" v-bg>@warning-color</div>
      <div class="sg-box sg-box--success" v-bg>@success-color</div>
      <div class="sg-box sg-box--error" v-bg>@error-color</div>
      <div class="sg-box sg-box--border" v-bg>@border-color 边框</div>
      <div class="sg-box sg-box--title" v-bg>@title 标题</div>
      <div class="sg-box sg-box--text" v-bg>@text 文字</div>
      <div class="sg-box sg-box--text-light" v-bg>@text-light 淡色文字</div>
      <div class="sg-box sg-box--divider color-title" v-bg>@divider 分割线</div>
    </section>

    <section class="sg-section">
      <h3>helpers 辅助类 oa-core/styles/helpers.less</h3>
      <div>
        <div class="ta-l">.ta-l 文字左对齐</div>
        <div class="ta-r">.ta-r 文字右对齐</div>
        <div class="fl-r">.fl-r 右浮动</div>
        <div>
          <span class="color-title">.color-title</span>
          <span class="mg-l16 color-text">.color-text</span>
          <span class="mg-l16 color-text-light">.color-text-light</span>
        </div>
        <div class="bordered">.bordered</div>
        <div class="font-number">123</div>
      </div>
    </section>
  </div>
</template>

<script>
import rgbHex from 'rgb-hex'
export default {
  data() {
    return {
      defaultValue: [110000, 110000]
    }
  },
  directives: {
    bg(el) {
      const computedStyle = window.getComputedStyle(el, null)
      setTimeout(() => {
        const bgColorRgb = computedStyle.getPropertyValue('background-color')
        const bgColorHex = rgbHex(bgColorRgb)
        el.innerHTML =
          el.textContent + '<br>' + '#' + bgColorHex + '<br>' + bgColorRgb
      })
    }
  }
}
</script>
