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
      'notice-list',
      ['notice-list-system', 'notice-list-activity'],
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
