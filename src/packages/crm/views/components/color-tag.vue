<template>
  <span class="crm-color-tag" :style="{ 'background-color': bgColor }">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: 'crm-tag',
  data() {
    return {}
  },
  props: {
    bgColor: {
      type: [String]
    },
    /**
     * tag值
     */
    label: {
      type: [String, Number],
      default: '标签'
    }
  }
}
</script>
<style lang="less">
.crm-color-tag {
  display: inline-block;
  vertical-align: middle;
  padding: 0 8px;
  color: #fff;
  border-radius: 2px;
  height: 22px;
  background-color: #cdcdcd;
}
</style>
