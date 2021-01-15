<template>
  <div
    class="oa-panel"
    :class="{
      'oa-panel--app': app,
      'oa-panel--initial': initial,
      'oa-panel--routes': routes.length,
      'oa-panel--tabs': tabs
    }"
  >
    <div class="oa-panel__header">
      <a-tabs
        @change="onTabRouteChange"
        v-if="routes.length"
        :activeKey="activeRouteName"
      >
        <a-tab-pane
          v-for="tabRoute in routes"
          :key="tabRoute.route.name"
          :tab="tabRoute.label"
        ></a-tab-pane>
      </a-tabs>
      <div class="oa-panel__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <slot name="prepend"></slot>

    <div class="oa-panel__body">
      <slot></slot>
      <div v-if="loading" class="oa-panel__loading-mask"></div>
      <a-spin
        v-show="loading"
        class="oa-panel__loading"
        :spinning="loading"
      ></a-spin>
    </div>
  </div>
</template>

<script>
import { intersection } from 'lodash-es'
export default {
  props: {
    app: {
      type: Boolean,
      default: false
    },
    initial: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    /**
     * routes 路由面版
     * [{label:'业绩统计',route:{name:'oa/styleguide'}}]
     */
    routes: {
      type: Array,
      default: () => []
    },
    tabs: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeRouteName() {
      const matchedRouteNames = this.$route.matched.map(item => item.name)
      const activeRouteNames = intersection(
        matchedRouteNames,
        this.routes.map(item => item.route.name)
      )
      if (activeRouteNames.length) {
        return activeRouteNames[0]
      } else {
        return ''
      }
    }
  },
  methods: {
    onTabRouteChange(key) {
      const findedTab = this.routes.find(item => {
        return item.route.name === key
      })
      console.log(findedTab)
      this.$router.push(findedTab.route)
    }
  }
}
</script>

<style lang="less">
.oa-panel {
  .bg(@white);
  .pos-r;
  &__actions {
    .pos-a;
    right: 16px;
    top: 16px;
    z-index: 2;
  }
  &__body {
    .pd(16px);
    .pos-r;
  }

  &__loading-mask {
    z-index: 3;
    .pos-a;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.4;
    .bg(white);
  }
  &__loading {
    .pos-a;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
  }
  &__tab-content {
    .pd(24px);
  }
  .ant-tabs-bar {
    .mg-b(0);
    // .pd-t(8px);
    .pd-lr(16px);
  }
  &--routes {
    .oa-panel__actions {
      top: 10px;
    }
  }
  &--tabs {
    .oa-panel__body {
      .pd(0);
    }
    .ant-tabs-tabpane {
      .pd(16px);
    }
    .oa-panel__actions {
      top: 10px;
    }
  }

  &--app {
    height: 100%;
  }
  &--initial {
    .oa-panel__body {
      .pd(0);
    }
  }
}
</style>
