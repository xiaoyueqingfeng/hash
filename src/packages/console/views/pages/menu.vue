<template>
  <oa-panel app>
    <a-tabs @change="onTabChange" tabPosition="left" :activeKey="platform_code">
      <a-tab-pane v-for="platform in platforms" :key="platform.code">
        <span slot="tab">{{ platform.name }}</span>
        <div class="ta-r">
          <oa-button
            type="primary"
            v-modal-link="{
              name: 'menu-add',
              props: {
                parent_id: '0',
                options: menuTree,
                platform_code: platform.code,
                platforms
              },
              on: { done: getMenuList }
            }"
            icon="anticon:plus"
          >
            添加[{{ platform.name }}]一级权限
          </oa-button>
        </div>
        <oa-table
          class="mg-t16"
          v-if="platform_code === platform.code"
          :pagination="{ pageSize: 20 }"
          rowKey="id"
          :columns="tableOptions.columns"
          :loading="getMenuList$loading"
          :dataSource="menuTree"
        >
          <span slot="list_order" slot-scope="record">
            {{ record.list_order }}
          </span>
          <span slot="status" slot-scope="v">
            <a-badge :status="v ? 'success' : 'default'" />
            {{ v ? '显示' : '隐藏' }}
          </span>

          <div slot="action" slot-scope="record">
            <oa-table-actions>
              <a
                v-modal-link="{
                  name: 'menu-add',
                  props: {
                    parent_id: record.id,
                    platform_code,
                    options: menuTree,
                    platforms
                  },
                  on: { done: getMenuList }
                }"
              >
                添加子权限
              </a>
              <a
                v-modal-link="{
                  name: 'menu-edit',
                  props: {
                    menu: record,
                    options: menuTree,
                    platforms,
                    platform_code
                  },
                  on: { done: getMenuList }
                }"
              >
                编辑
              </a>
              <a-popconfirm
                v-if="canShowDelete(record)"
                title="确认删除该权限么?"
                @confirm="onDeleteMenu(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </oa-table-actions>
          </div>
        </oa-table>
      </a-tab-pane>
    </a-tabs>
  </oa-panel>
</template>
<script>
import { tableOptions } from './menu#config'
import { getMenuList, deleteMenu } from '@/api/menu'
import { listToTree } from 'oa-core/utils/list-to-tree'

export default {
  beforeRouteEnter(to, from, next) {
    if (!to.query.platform_code) {
      next({
        name: 'menu',
        query: {
          platform_code: 'console'
        }
      })
    } else {
      next()
    }
  },
  computed: {
    tableOptions,
    platform_code() {
      return this.searchQuery.platform_code
    }
  },
  watch: {
    $route(newRoute) {
      this.searchQuery = this.$route.meta.query
      this.getMenuList()
    }
  },
  data() {
    return {
      searchQuery: this.$route.meta.query,
      platforms: [],
      menuTree: [],
      menuList: [],
      filters: {},
      info: {
        id: '0'
      }
    }
  },
  methods: {
    onTabChange(platformCode) {
      this.$router.push({ query: { platform_code: platformCode } })
    },
    canShowDelete(record) {
      return !(record.children && record.children.length)
    },
    onDeleteMenu(id) {
      this.deleteMenu(id).then(() => {
        this.$message.success('删除菜单成功')
        this.initData()
      })
    }
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getMenuList()])
    },
    getMenuList() {
      return getMenuList({
        platform_code: this.searchQuery.platform_code
      }).then(res => {
        this.menuList = res.list
        this.menuTree = listToTree(res.list)
        this.platforms = res.platform
      })
    },
    deleteMenu(id) {
      return deleteMenu({ id, platform_code: this.searchQuery.platform_code })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-tabs-tab a {
  text-decoration: none;
}
</style>
