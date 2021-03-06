<template>
  <a-layout-sider class="layout-default-sider" v-model="collapsed">
    <a @click="collapsed = !collapsed" class="layout-default-sider__trigger">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
    </a>
    <div class="layout-default-sider__menu-wrap">
      <a-menu
        class="layout-default-sider__menu"
        mode="inline"
        :selectedKeys="selectedKeys"
        :openKeys.sync="openKeys"
        @openChange="onOpenChange"
        @select="onOpenChange"
      >
        <template v-for="menu in siderMenuTree">
          <a-sub-menu v-if="menu.children" :key="menu.id">
            <span slot="title">
              <oa-icon :type="menu.icon"></oa-icon>
              <span>{{ menu.name }}</span>
              <oa-icon
                class="layout-default-sider__menu-arrow"
                type="menu-arrow"
              ></oa-icon>
            </span>

            <template v-for="menu in menu.children">
              <a-sub-menu
                v-if="menu.children && menu.children.length"
                :key="menu.id"
              >
                <span slot="title">
                  <oa-icon :type="menu.icon"></oa-icon>
                  <span>{{ menu.name }}</span>
                </span>
              </a-sub-menu>
              <a-menu-item
                v-else
                class="menu-item-l2"
                :class="{
                  active: activeSiderMenuRouteName === menu.route_name
                }"
                :key="menu.id"
              >
                <oa-icon
                  v-if="isFavor(menu.route_name)"
                  @click.native="onCancelFavor(menu.route_name)"
                  class="layout-default-sidermenu-item__star active"
                  type="star"
                  size="8px"
                ></oa-icon>
                <oa-icon
                  v-else
                  class="layout-default-sidermenu-item__star"
                  @click.native="onFavor(menu)"
                  type="star"
                  size="8px"
                ></oa-icon>
                <span
                  @click="onClickMenuItem(menu)"
                  class="layout-default-sidermenu-item__title"
                >
                  {{ menu.name }}
                </span>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <!-- 一级menu-item 使用配置图标  -->
          <a-menu-item @click="onClickMenuItem(menu)" v-else :key="menu.id">
            <oa-icon :type="menu.icon"></oa-icon>
            <span>{{ menu.name }}</span>
          </a-menu-item>
        </template>
        <!-- 收藏收起的列表 -->
        <a-sub-menu v-if="collapsed && favors.length">
          <span slot="title">
            <oa-icon type="favor-text" size="22px"></oa-icon>
          </span>
          <a-menu-item
            :class="{ active: activeSiderMenuRouteName === favor.route_name }"
            class="menu-item-l2"
            v-for="favor in useableFavors"
            :key="favor.route_name"
          >
            <oa-icon
              @click.native="onCancelFavor(favor.route_name)"
              class="layout-default-sidermenu-item__star active"
              type="star"
              size="8px"
            ></oa-icon>
            <span
              @click="onClickFavorItem(favor)"
              class="layout-default-sidermenu-item__title"
            >
              {{ favor.name }}
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <!-- 收藏展开的列表 -->
      <div class="favor" v-show="!collapsed">
        <h4 class="favor__title">常用</h4>
        <ul class="favor__list">
          <li
            class="layout-default-sidermenu-item"
            :class="{ active: activeSiderMenuRouteName === favor.route_name }"
            v-for="favor in useableFavors"
            :key="favor.route_name"
          >
            <oa-icon
              @click.native="onCancelFavor(favor.route_name)"
              class="layout-default-sidermenu-item__star active"
              type="star"
              size="8px"
            ></oa-icon>
            <div
              @click="onClickFavorItem(favor)"
              class="layout-default-sidermenu-item__title"
            >
              {{ favor.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { find as lodashFind, last, findIndex } from 'lodash-es'
import { findPathWithTree } from 'oa-core/utils/find-path-with-tree'

export default {
  name: 'SiderBar',
  data() {
    return {
      collapsed: false,
      openKeys: [],

      favors: JSON.parse(localStorage.getItem('favors') || '[]')
    }
  },
  computed: {
    ...mapGetters('oa/user', [
      'siderMenuTree',
      'siderMenuList',
      'authedRouteList'
    ]),
    useableFavors() {
      return this.favors.filter(favor =>
        lodashFind(this.siderMenuList, { route_name: favor.route_name })
      )
    },
    activeSiderMenuRouteName() {
      const findedSiderMenuRouteConfig = lodashFind(
        this.$route.matched,
        routeConfig => routeConfig.meta.siderMenuRouteName
      )
      if (!findedSiderMenuRouteConfig) {
        console.warn(
          `[layout-default] 路由[${
            this.$route.name
          }]或父级路由 未配置 siderMenuRouteName`
        )
        return ''
      }
      const siderMenuRouteName =
        findedSiderMenuRouteConfig.meta.siderMenuRouteName
      return siderMenuRouteName
    },
    // 当前菜单选中的menu.id 组成的数组路径 ['']
    selectedKeysPath() {
      const siderMenu = lodashFind(this.siderMenuList, {
        route_name: this.activeSiderMenuRouteName
      })
      if (!siderMenu) {
        console.warn(
          `[layout-default] can not find ${
            this.activeSiderMenuRouteName
          } in siderMenuTree,侧边栏菜单配置中找不到名称为 ${
            this.activeSiderMenuRouteName
          } 的菜单！`
        )
        return []
      }
      const menuId = siderMenu.id
      const _selectedKeys = findPathWithTree(menuId, this.siderMenuTree)
      return _selectedKeys
    },
    selectedKeys() {
      return this.selectedKeysPath
    }
  },
  watch: {
    collapsed(newVal) {
      this.SET_COLLAPSED(newVal)
      this.calcOpenKeys()
    },
    favors(newVal) {
      localStorage.setItem('favors', JSON.stringify(newVal))
    }
  },
  created() {
    this.calcOpenKeys()
  },
  methods: {
    ...mapMutations('oa/base', ['SET_COLLAPSED']),
    ...mapMutations('oa/user', ['SET_AUTH_ROUTE_TABS']),
    calcOpenKeys() {
      if (this.collapsed) {
        this.openKeys = []
      } else {
        this.openKeys = this.selectedKeysPath
      }
    },
    onClickMenuItem(clickedMenu) {
      this.$router.push({
        name: clickedMenu.route_name
      })
    },
    // 只同时展开一个子sub
    onOpenChange(newOpenKeys) {
      // 只处理非收缩状态下的侧边栏
      if (!this.collapsed) {
        this.$nextTick(() => {
          const lastSubKey = last(newOpenKeys)
          if (lastSubKey) {
            this.openKeys = [lastSubKey]
          } else {
            this.openKeys = []
          }
        })
      }
    },
    onCancelFavor(key) {
      const idx = findIndex(this.favors, { route_name: key })
      this.favors.splice(idx, 1)
    },
    onClickFavorItem(favor) {
      this.$router.push({
        name: favor.route_name
      })
    },
    onFavor(menu) {
      if (!lodashFind(this.favors, { route_name: menu.route_name })) {
        this.favors.push({
          route_name: menu.route_name,
          name: menu.name
        })
      }
    },
    isFavor(routeName) {
      return lodashFind(this.favors, { route_name: routeName })
    }
  }
}
</script>
<style lang="less">
.layout-default-sider {
  .pos-f;
  z-index: 10;
  left: 0;
  top: 56px;
  bottom: 0;
  background: #fff;
  height: calc(100vh - 56px);
  box-shadow: 0px 2px 4px 0px rgba(124, 124, 124, 0.1);

  &__trigger {
    .pd(24px);
    .pos-a;
    bottom: 0;
    left: 0;
    right: 0;
    .fz(18px);
    .c(@text-light);
  }
  &__menu-wrap {
    padding-top: 24px;
    .h(calc(100% - 80px));
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__menu {
    border-right: none;
  }

  &__menu-arrow {
    .pos-a;
    right: 16px;
    fill: rgba(0, 0, 0, 0.25);
    top: 50%;
    margin-top: -5px;
    font-size: 10px;
    .mg-r(0) !important;
    transition: all 0.2s;
  }

  .favor {
    .mg-t(22px);
    &__title {
      .pd-l(24px);
      .fz(12px);
      .lh(20px);
      .c(@text-light);
    }
  }

  .ant-menu-inline {
    .ant-menu-submenu-open {
      .ant-menu-submenu-title {
        .bg(rgba(0, 0, 0, 0.04));
      }

      .layout-default-sider__menu-arrow {
        transform: rotate(180deg);
      }
    }
    &-collapsed {
      .layout-default-sider__menu-arrow {
        display: none;
      }
    }
    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        .c(@title);
        &:before {
          .h(22px);
        }
      }
    }
    .ant-menu-item-selected {
      .bg(none);
      &:after {
        content: none;
      }
    }
    .ant-menu-submenu-title {
      .c(@text);

      &:before {
        content: '';
        .pos-a;
        left: 0;
        .w(4px);
        .h(0);
        top: 50%;
        .bg(@primary-color);
        transform: translateY(-50%);
        transition: all 0.2s;
      }
      &:hover {
        .bg(rgba(0, 0, 0, 0.04));
      }
    }
    .ant-menu-submenu-arrow {
      display: none;
    }
    .menu-item-l2 {
      .lh(32px);
      .h(32px);
      cursor: default;
      .fz(12px);
      .c(@text-light);
      padding-left: 36px !important;
      display: flex;
      align-items: center;
      .layout-default-sidermenu-item__star {
        visibility: hidden;
      }
      &:hover .layout-default-sidermenu-item__star {
        visibility: visible;
      }
      &.active .layout-default-sidermenu-item__title {
        .c(@primary-color);
      }
    }
  }

  .ant .useful {
    color: rgba(0, 0, 0, 0.45);
  }
}

.layout-default-sidermenu-item {
  .pd-l(36px);
  .pd-r(24px);
  .fz(12px);
  .lh(36px);
  display: flex;
  align-items: center;
  .c(@text-light);
  user-select: none;
  &.active .layout-default-sidermenu-item__title {
    .c(@primary-color);
  }
  &__star {
    .cur-p;
    vertical-align: 0;
    .mg-r(6px);
    &.active {
      .c(@primary-color);
    }
  }
  &__title {
    .cur-p;
    flex: 1;
    .c(@text-light);
    display: inline-block;
    transition: all 0.3s;
    &:hover {
      .c(@primary-color);
    }
  }
}

// 提高权重
.ant-menu-vertical.ant-menu-vertical {
  .ant-menu-item {
    .c(@text-light);
    user-select: none;
    cursor: default;
    display: flex;
    align-items: center;
    .fz(12px);
    .lh(32px);
    .h(32px);
    .layout-default-sidermenu-item__star {
      visibility: hidden;
    }
    &:hover {
      .layout-default-sidermenu-item__star {
        visibility: visible;
      }
    }
    &-selected {
      .bg(rgba(47, 65, 86, 0.04));
      .layout-default-sidermenu-item__title {
        .c(@primary-color);
      }
    }
  }
}
</style>
