<template>
  <oa-layout-default></oa-layout-default>
</template>

<script>
import container from 'oa-core/container'
import OaLayoutDefault from 'oa-core/views/layouts/default.vue'
export default {
  name: 'Dmalllayout',
  components: {
    OaLayoutDefault
  },
  created() {
    const store = container.get('store')
    store.dispatch('finance/getEnumMap')
  }
}
</script>
