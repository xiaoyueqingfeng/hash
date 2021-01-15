<template>
  <div>
    <oa-button @click="forceReload">123</oa-button>
  </div>
</template>
<script>
export default {
  methods: {
    forceReload() {
      this.$router.push({
        force: true
      })
    }
  }
}
</script>
