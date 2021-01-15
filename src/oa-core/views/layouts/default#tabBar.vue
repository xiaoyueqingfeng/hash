<template>
  <a-tabs
    class="layout-default-tabs"
    hideAdd
    :activeKey="$route.name"
    @change="onChange"
    type="editable-card"
    @edit="onEdit"
  >
    <a-tab-pane
      tabBarExtraContent="slot"
      v-for="tab in tabs"
      :closable="tabs.length > 1"
      :key="tab.name"
    >
      <span slot="tab">{{ tab.title }}</span>
    </a-tab-pane>
    <div slot="tabBarExtraContent">
      <a-dropdown
        placement="bottomRight"
        overlayClassName="layout-default-tabs__dropdown"
      >
        <a class="layout-default-tabs__dropdown-link">
          关闭
          <oa-icon
            class="layout-default-tabs__arrow"
            type="arrow-down-solid"
          ></oa-icon>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="onCloseAllTabs">关闭所有标签</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="onCloseOtherTabs">关闭其他标签</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-tabs>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'TabBar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('oa/base', ['tabs'])
  },
  methods: {
    ...mapMutations('oa/base', [
      'CLOSE_TAB',
      'CHANGE_TAB',
      'CLOSE_ALL_TABS',
      'CLOSE_ALL_OTHER_TABS'
    ]),
    onChange(routeName) {
      this.CHANGE_TAB(routeName)
    },
    onEdit(routeName, action) {
      if (action === 'remove') {
        this.CLOSE_TAB(routeName)
      }
    },
    onCloseAllTabs() {
      this.CLOSE_ALL_TABS()
    },
    onCloseOtherTabs() {
      this.CLOSE_ALL_OTHER_TABS()
    }
  }
}
</script>

<style lang="less">
.layout-default-tabs {
  .pos-f;
  transition: all 0.2s;
  left: 200px;
  right: 0;
  top: 56px;
  z-index: 10;
  &__dropdown {
    .ant-dropdown-menu {
      .pd(8px 0);
    }
    .ant-dropdown-menu-item {
      .pd(6px 24px);
    }
  }
  &__dropdown-link {
    .c(@text-light);
    margin-right: 24px;
    margin-left: 16px;
  }
  &__arrow {
    .fz(12px);
    .pos-r;
    top: -1px;
    transform: scale(0.6);
  }
}

#body .layout-default-tabs {
  .ant-tabs-bar {
    margin: 0;
  }
  .ant-tabs-nav {
    &-container {
      .mg-b(0);
    }
    &-container-scrolling .ant-tabs-nav-wrap {
      .pd-lr(0);
    }
    &-wrap {
      .pd-lr(10px);
      .pd-t(6px);
    }
    &-scroll {
    }
  }
  .ant-tabs-tab {
    .h(28px);
    &-active {
      .h(28px);
    }
  }

  .ant-tabs-nav-scroll,
  .ant-tabs-top-bar,
  .ant-tabs-extra-content,
  .ant-tabs-tab-arrow-show {
    background: white;
  }
  .ant-tabs-tab {
    border-radius: 0;
    border: none;
    .c(@text-light);
    .fz(14px);
    .bg(@white);
    .lh(28px);
    .pd-lr(10px);
    .mg-r(4px);
    border-radius: 99px;
    &:hover,
    &-active {
      .c(@text);
      font-weight: normal;
      .bg(rgba(#f0f2f5, 0.85));
    }
    &:hover {
      .ant-tabs-close-x {
        .bg(rgba(0, 0, 0, 0.25));
      }
      .ant-tabs-close-x::before,
      .ant-tabs-close-x::after {
        .bg(white);
      }
    }
    &-active {
      .pd-b(0);
    }
  }
  .ant-tabs-close-x {
    display: inline-block;
    .w(12px);
    .h(12px);
    .c(transparent);
    .mg-l(8px);
    .mg-r(0);
    border-radius: 50%;
    .pos-r;
    transition: background-color 0.2s;
    &:before,
    &:after {
      content: '';
      display: block;
      .pos-a;
      .h(1px);
      .w(8px);
      left: 50%;
      top: 50%;
      .bg(rgba(0, 0, 0, 0.25));
    }
    &::before {
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }
    &::after {
      transform: translateX(-50%) translateY(-50%) rotate(135deg);
    }
    &:hover {
      .bg(rgba(0, 0, 0, 0.65)) !important;
    }
    &:hover::before,
    &:hover::after {
      // .bg(white);
    }
  }
}
</style>
