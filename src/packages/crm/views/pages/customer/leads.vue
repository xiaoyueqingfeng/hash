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
      'customer-leads',
      [
        'customer-leads-private-sea',
        'customer-leads-public-sea',
        'customer-leads-invalid'
      ],
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
