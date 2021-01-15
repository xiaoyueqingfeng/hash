<template>
  <oa-panel app></oa-panel>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('oa/user', ['siderMenuList', 'user_info'])
  },
  created() {
    const firstUseableMenu = this.siderMenuList.find(menu => menu.route_name)
    if (!firstUseableMenu) {
      return
    }
    const resolveRoute = this.$router.resolve({
      name: firstUseableMenu.route_name
    })
    // 有该路由
    if (resolveRoute.route.matched.length) {
      this.$router.push({
        name: firstUseableMenu.route_name
      })
    } else {
      this.$notification.warning({
        message: 'INDEX_REDIRECT',
        description: `未找到匹配路由名 ${firstUseableMenu.route_name}`
      })
    }
  }
}
</script>
