<template>
  <div class="oa-overflow-text" :style="{ maxWidth }">
    <a-tooltip placement="topLeft" :title="title">
      <slot></slot>
    </a-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      required: true
    },
    maxWidth: {
      type: String,
      default: '1000px'
    }
  }
}
</script>

<style lang="less">
.oa-overflow-text {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
