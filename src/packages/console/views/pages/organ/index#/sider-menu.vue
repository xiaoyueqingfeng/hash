<template>
  <div class="menu-box">
    <a-menu
      theme="light"
      :forceSubMenuRender="true"
      :openKeys.sync="openKeys"
      v-model="selectedKeys"
      @select="onSelect"
      mode="inline"
      class="organ-sider-menu"
    >
      <template v-for="menu in data">
        <a-sub-menu
          :class="{ clicked: menu.id === value }"
          @titleClick="onSubmenuClick"
          v-if="canShowSubmenu(menu)"
          :key="menu.id"
        >
          <span slot="title">
            <oa-icon v-if="menu.icon" :type="menu.icon" />
            <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
          </span>
          <template v-for="menu in menu.children">
            <a-sub-menu
              :class="{ clicked: menu.id === value }"
              v-if="canShowSubmenu(menu)"
              @titleClick="onSubmenuClick"
              :key="menu.id"
            >
              <span slot="title">
                <oa-icon v-if="menu.icon" :type="menu.icon" />
                <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
              </span>
              <template v-for="menu in menu.children">
                <a-sub-menu
                  :class="{ clicked: menu.id === value }"
                  v-if="canShowSubmenu(menu)"
                  @titleClick="onSubmenuClick"
                  :key="menu.id"
                >
                  <span slot="title">
                    <oa-icon v-if="menu.icon" :type="menu.icon" />
                    <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
                  </span>
                  <template v-for="menu in menu.children">
                    <a-sub-menu
                      :class="{ clicked: menu.id === value }"
                      v-if="canShowSubmenu(menu)"
                      @titleClick="onSubmenuClick"
                      :key="menu.id"
                    >
                      <span slot="title">
                        <oa-icon v-if="menu.icon" :type="menu.icon" />
                        <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
                      </span>
                      <template v-for="menu in menu.children">
                        <a-sub-menu
                          :class="{ clicked: menu.id === value }"
                          v-if="canShowSubmenu(menu)"
                          @titleClick="onSubmenuClick"
                          :key="menu.id"
                        >
                          <span slot="title">
                            <oa-icon v-if="menu.icon" :type="menu.icon" />
                            <span>
                              {{ menu.name }} ({{ menu.user_count }}人)
                            </span>
                          </span>
                          <!-- inner-placeholder -->
                        </a-sub-menu>
                        <a-menu-item
                          v-else-if="canShowMenuItem(menu)"
                          :key="menu.id"
                        >
                          <oa-icon v-if="menu.icon" :type="menu.icon" />
                          <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
                        </a-menu-item>
                      </template>
                      <!-- inner-placeholder -->
                    </a-sub-menu>
                    <a-menu-item
                      v-else-if="canShowMenuItem(menu)"
                      :key="menu.id"
                    >
                      <oa-icon v-if="menu.icon" :type="menu.icon" />
                      <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
                    </a-menu-item>
                  </template>
                </a-sub-menu>
                <a-menu-item v-else-if="canShowMenuItem(menu)" :key="menu.id">
                  <oa-icon v-if="menu.icon" :type="menu.icon" />
                  <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item v-else-if="canShowMenuItem(menu)" :key="menu.id">
              <oa-icon v-if="menu.icon" :type="menu.icon" />
              <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item v-else-if="canShowMenuItem(menu)" :key="menu.id">
          <oa-icon v-if="menu.icon" :type="menu.icon" />
          <span>{{ menu.name }} ({{ menu.user_count }}人)</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { clone, includes, isNil } from 'lodash-es'
import { treeToMap } from 'oa-core/utils/tree-to-map'
import { findPathWithMap } from 'oa-core/utils/find-path-with-map'
import { mapToList } from 'oa-core/utils/map-to-list'

export default {
  name: 'SiderMenu',
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      openKeys: [],
      // menu-item 打开的keys
      selectedKeys: [],
      isFirst: true
    }
  },
  computed: {
    menuMap() {
      return treeToMap(this.data)
    },
    menuList() {
      return mapToList(this.menuMap)
    },
    menuListKeys() {
      return this.menuList.map(item => item.id)
    },
    value$menuListKeys() {
      return this.value + JSON.stringify(this.menuListKeys)
    }
  },
  watch: {
    value$menuListKeys(newVal) {
      if (!isNil(newVal)) {
        // 打开的 sub-menu keys
        if (this.isFirst) {
          const FirstKey = this.data[0]['id']
          if (this.value === FirstKey) {
            this.openKeys = [FirstKey]
          } else {
            this.openKeys = findPathWithMap(this.value, this.menuMap)
          }
        }
        // 打开的menu-item keys
        this.selectedKeys = [this.value]
      }
    }
  },
  methods: {
    canShowSubmenu(menu) {
      return (
        // 需要 有子节点 并且子节点的status都为有效
        menu.children && menu.children.length
      )
    },
    canShowMenuItem(menu) {
      return true
    },
    onSubmenuClick({ key, domEvent }) {
      this.isFirst = false
      const oldOpenKeys = clone(this.openKeys)
      this.$nextTick(() => {
        const isClickedArrow = includes(
          domEvent.target.className,
          'ant-menu-submenu-arrow'
        )
        // 不是点击arrow 图标的情况下重置submenu
        if (!isClickedArrow) {
          this.openKeys = oldOpenKeys
          this.selectedKeys = []
          this.emitClick(key)
        }
      })
    },
    onSelect({ key }) {
      this.emitClick(key)
    },
    emitClick(key) {
      this.$emit('input', key)
      const menu = this.menuMap[key]
      this.$emit('click', menu)
    }
  }
}
</script>

<style lang="less">
.organ-sider-menu {
  min-height: calc(100vh - 80px);
  .ant-menu-item-selected {
    &::after {
      left: 0;
      right: auto;
    }
  }
  .ant-menu-submenu {
    .ant-menu-item {
      &::after {
        left: 0;
        right: auto;
      }
    }
    &-title {
      margin: 0;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-right: 3px solid #1890ff;
        transform: scaleY(0.001);
        opacity: 0;
        transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
          opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
          -webkit-transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      .ant-menu-submenu-arrow {
        right: 0;
        width: 40px;
        height: 100%;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &.clicked > .ant-menu-submenu-title {
      background: #e6f7ff;
      &::after {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item {
    margin: 0;
  }
}
</style>
<style lang="less" scoped>
.menu-box {
  height: 770px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
