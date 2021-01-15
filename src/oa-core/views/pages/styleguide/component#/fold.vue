<template>
  <section class="sg-section">
    <h3>oa-fold</h3>
    <oa-fold v-model="isExpand"></oa-fold>
    isExpand -> {{ isExpand }}
  </section>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      isExpand: false
    }
  }
}
</script>
