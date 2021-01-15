<template>
  <oa-layout-default>
    <section slot="prepend"></section>
  </oa-layout-default>
</template>

<script>
import OaLayoutDefault from 'oa-core/views/layouts/default.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    OaLayoutDefault
  },
  methods: {
    ...mapActions('admin', ['getVersionList'])
  },
  created() {
    this.getVersionList()
  }
}
</script>
