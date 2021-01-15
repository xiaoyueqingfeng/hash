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
      'system-customField',
      ['system-customField-listInit', 'system-customField-fieldStore'],
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
