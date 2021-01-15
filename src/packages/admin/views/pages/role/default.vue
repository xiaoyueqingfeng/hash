<template>
  <oa-panel app class="page-role-default" :routes="authedTabRoutes">
    <div slot="actions">
      <admin-version-select
        @change="onVersionChange"
        v-model="searchQuery.version_id"
      ></admin-version-select>
    </div>
    <router-view></router-view>
  </oa-panel>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: this.$route.meta.query,
      roleList: [],
      authedTabRoutes: [
        {
          label: '角色权限',
          route: {
            name: 'role-default-auth'
          }
        }
      ]
    }
  },
  watch: {
    $route(newRoute) {
      this.searchQuery = newRoute.meta.query
    }
  },
  methods: {
    onVersionChange(version_id) {
      this.$router.push({
        query: {
          ...this.searchQuery,
          role_id: undefined
        }
      })
    }
  }
}
</script>

<style lang="less">
.page-role-default {
  .oa-panel__body {
    .pd(0);
  }
}

.role-default-layout {
  display: flex;
  &__sider {
    .w(256px);
    .bg(#f6faff);
    .pd-tb(16px);
  }
  &__main {
    flex: 1;
  }
  &__sider-actions {
    .ta-r;
    .pd-r(16px);
  }

  .role-list {
  }
  .role-item {
    display: flex;
    .fz(14px);
    .lh(22px);
    .pd(8px 24px);
    .mg-tb(6px);
    .cur-p;
    transition: all 0.2s;
    align-items: center;
    justify-content: space-between;
    &:hover,
    &.active {
      .c(@primary-color);
      .bg(white);
    }
    &__tag {
      .mg-l(8px);
    }
    &__more {
    }
  }
}
</style>
