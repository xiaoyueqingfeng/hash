<template>
  <div>
    <a-button @click="onReload">reload</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    onReload() {
      this.$router.reload()
    }
  }
}
</script>
