<template>
  <oa-panel :routes="authRouteTabs" app>
    <router-view></router-view>
  </oa-panel>
</template>
<script>
import { initAuthTab } from 'oa-core/mixins/init-auth-tab'

export default {
  mixins: [
    initAuthTab(
      'stat-leads',
      ['stat-leads-default', 'stat-leads-report'],
      'authRouteTabs'
    )
  ],
  data() {
    return {
      authRouteTabs: []
    }
  }
}
</script>
