<template>
  <oa-panel :routes="authRouteTabs" app>
    <router-view></router-view>
  </oa-panel>
</template>
<script>
import { initAuthTab } from 'oa-core/mixins/init-auth-tab'

export default {
  mixins: [
    initAuthTab('stat-market', ['stat-market-customer'], 'authRouteTabs')
  ],
  data() {
    return {
      authRouteTabs: []
    }
  }
}
</script>
