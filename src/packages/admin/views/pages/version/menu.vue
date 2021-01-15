<template>
  <oa-panel app class="content">
    <div class="header">
      <div class="header-title">当前版本：{{ $searchQuery.version_name }}</div>
      <div class="header-filter">
        <div>
          <oa-select
            :options="mapping.is_multi"
            v-model="$searchQuery.is_multi"
            @change="handlerShopTypeChange"
            class="mg-r16"
          ></oa-select>
          <a-radio-group
            @change="handlerTypeChange"
            v-model="$searchQuery.menu_type"
          >
            <a-radio-button :value="1">品牌</a-radio-button>
            <a-radio-button :value="2">门店</a-radio-button>
          </a-radio-group>
        </div>
        <oa-button
          type="primary"
          v-modal-link="{
            name: 'version-menu-add',
            props: {
              parent_menu_id: 0,
              version_id: $searchQuery.version_id,
              menu_type: $searchQuery.menu_type,
              modalTitle: '添加菜单',
              version_name: $searchQuery.version_name,
              shop_type,
              is_multi: $searchQuery.is_multi
            },
            on: { done: getMenuList }
          }"
          icon="anticon:plus"
        >
          添加菜单
        </oa-button>
      </div>
    </div>
    <div>
      <oa-table
        :rowKey="row => row.version_menu_id"
        :columns="columns"
        :dataSource="menu_tree"
        :pagination="false"
        :loading="getMenuList$loading"
      >
        <template slot="is_hidden" slot-scope="record">
          <span>{{ record.is_hidden | statusFilter(mapping.is_hidden) }}</span>
        </template>
        <template slot="upgrade_hints" slot-scope="record">
          <span>
            {{ record.upgrade_hints | statusFilter(mapping.upgrade_hints) }}
          </span>
        </template>
        <template slot="perm_group" slot-scope="record">
          <oa-overflow-text maxWidth="400px" :title="getPerm(record.groups)">
            {{ getPerm(record.groups) }}
          </oa-overflow-text>
        </template>
        <template slot="gray_perm_group" slot-scope="record">
          <oa-overflow-text
            maxWidth="400px"
            :title="getPerm(record.grey_groups)"
          >
            {{ getPerm(record.grey_groups) }}
          </oa-overflow-text>
        </template>
        <div slot="action" slot-scope="record">
          <!-- 一级菜单parent_menu_id为0 -->
          <oa-table-actions>
            <a
              v-if="record.isParent"
              href="javascript:;"
              v-modal-link="{
                name: 'version-menu-add',
                props: {
                  isEdit: false,
                  parent_menu_id: record.version_menu_id,
                  version_id: $searchQuery.version_id,
                  version_menu_id: record.version_menu_id,
                  menu_type: $searchQuery.menu_type,
                  modalTitle: '添加子菜单',
                  showParent: true,
                  parent_menu_name: record.menu_name,
                  version_name: $searchQuery.version_name,
                  is_multi: $searchQuery.is_multi,
                  shop_type
                },
                on: { done: getMenuList }
              }"
            >
              添加子菜单
            </a>
            <a
              href="javascript:;"
              v-modal-link="{
                name: 'version-menu-add',
                props: {
                  isEdit: true,
                  version_menu_id: record.version_menu_id,
                  menu_type: $searchQuery.menu_type,
                  parent_menu_id: record.isParent ? 0 : record.parent_id,
                  modalTitle: '编辑菜单',
                  showParent: !record.isParent,
                  parent_menu_name: record.parent_menu_name,
                  version_name: $searchQuery.version_name,
                  is_multi: $searchQuery.is_multi,
                  version_id: $searchQuery.version_id,
                  shop_type
                },
                on: { done: getMenuList }
              }"
            >
              编辑菜单
            </a>
            <a
              href="javascript:;"
              v-modal-link="{
                name: 'version-menu-delete',
                props: {
                  menu_info: record,
                  version_name: $searchQuery.version_name,
                  menu_type: $searchQuery.menu_type
                },
                on: { done: getMenuList }
              }"
            >
              删除菜单
            </a>
            <a
              v-if="record.auth_area['api/version/edit-menu-perm']"
              href="javascript:;"
              v-modal-link="{
                name: 'version-menu-permission-add',
                props: {
                  menu_info: record,
                  menu_type: $searchQuery.menu_type,
                  version_name: $searchQuery.version_name,
                  shop_type
                },
                on: { done: getMenuList }
              }"
            >
              添加权限组
            </a>
            <a
              href="javascript:;"
              v-modal-link="{
                name: 'version-menu-permission-add',
                props: {
                  isGray: true,
                  menu_info: record,
                  menu_type: $searchQuery.menu_type,
                  version_name: $searchQuery.version_name,
                  shop_type
                },
                on: { done: getMenuList }
              }"
            >
              添加收费（隐藏）权限组
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </oa-panel>
</template>

<script>
import { columns } from './menu#config'
import { getMenuList } from '@/api/version'
import { eq, get, omit } from 'lodash-es'
import { walkTree } from 'oa-core/utils/walk-tree'
import tableMixins from 'oa-core/mixins/table'

export default {
  name: '',
  mixins: [tableMixins],
  components: {},

  props: {},

  data() {
    return {
      columns,
      menu_tree: [],
      mapping: {},
      shop_type: '多门店'
    }
  },

  computed: {},

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getMenuList()
    }
  },

  async: {
    getMenuList() {
      return getMenuList({
        ...this.$searchQuery
      })
        .then(res => {
          this.mapping = get(res, 'mapping', {})
          let list = get(res, 'list', [])
          walkTree(list, node => {
            if (!node.children) {
              return
            }
            if (!node.children.length) {
              delete node.children
            } else {
              node.children = node.children.map(item => {
                return {
                  ...item,
                  parent_menu_name: node.menu_name
                }
              })
            }
          })
          this.menu_tree = this.addType(list)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },

  mounted() {
    this.getMenuList()
  },

  methods: {
    getPerm(permList) {
      return permList
        .map(item => {
          return item.group_name
        })
        .join('、')
    },
    handlerTypeChange(e) {
      this.menu_tree = []
      this.$router.push({
        query: {
          ...this.$searchQuery
        }
      })
    },

    handlerShopTypeChange(e) {
      this.shop_type = this.mapping.is_multi.find(item => item.id === e).name
      this.handlerTypeChange(e)
    },
    //处理掉children为空数组的
    deleteEmptyChildren(list) {
      let newList = []
      list.map(item => {
        let listObject
        if (!!item.children) {
          if (!item.children.length) {
            listObject = omit(item, 'children')
          } else {
            listObject = {
              ...item,
              children: this.deleteEmptyChildren(item.children)
            }
          }
        } else {
          listObject = item
        }
        newList.push(listObject)
      })
      return newList
    },
    //区分是一级菜单
    addType(list) {
      let newList = list.map(item => {
        return {
          ...item,
          isParent: true
        }
      })
      return newList
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .header {
    &-title {
      padding-bottom: 8px;
      border-bottom: 1px solid @border-color;
      text-align: right;
    }
    &-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
    }
  }
}
</style>
