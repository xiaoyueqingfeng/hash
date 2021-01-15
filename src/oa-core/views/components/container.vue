<template>
  <div class="oa-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '1'
    }
  }
}
</script>
