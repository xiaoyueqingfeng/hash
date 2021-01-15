/**
 * g2报表是否展示指令
 * @param {HTMLElement} el 插入的dom
 */

export const showChart = (el, binding) => {
  if (!('value' in binding)) {
    return
  }
  if (binding.value) {
    const chart = binding.value
    console.log(chart.data)
  }
}
