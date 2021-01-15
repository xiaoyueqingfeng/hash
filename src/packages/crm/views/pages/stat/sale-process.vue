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
      'stat-sale-process',
      [
        'stat-sale-process-visit-organ',
        'stat-sale-process-visit-staff',
        'stat-sale-process-custom-organ',
        'stat-sale-process-custom-staff'
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
