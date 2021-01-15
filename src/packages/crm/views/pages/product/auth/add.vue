<template>
  <div class="function-add">
    <div class="function-add__header">
      <div v-if="tag === 'batch'" class="batch">
        已选
        <span>{{ ids.length }}</span>
        个客户
      </div>
      <div v-else-if="tag === 'single'" class="single">
        <span class="brand_name">{{ leads_name }}</span>
        <span class="leads_id">ID: {{ leads_id }}</span>
        <div class="version-info">
          <span class="system_version">当前版本：{{ system_version }}</span>
        </div>
      </div>
      <div class="is_multi_select">
        <oa-select
          :options="multiOptions"
          v-model="$searchQuery.is_multi"
          @change="onMultiChange"
        ></oa-select>
      </div>
    </div>
    <div class="function-add__content">
      <!-- <div class="function-add__silderbar">
        <div class="role-title">角色等级</div>
        <ul class="role-list">
          <li
            class="role-item"
            @click="onClickLevel(level)"
            :class="{ active: searchQuery.level_id === level.id }"
            v-for="level in levelList"
            :key="level.id"
          >
            <span class="role-item__name">{{ level.name }}</span>
          </li>
        </ul>
      </div> -->
      <div class="function-add__tab">
        <a-tabs defaultActiveKey="1" @change="onChange">
          <a-tab-pane tab="品牌" key="1">
            <oa-table
              :loading="getRoleAuth$loading"
              :pagination="false"
              :columns="tableOptions.columns"
              :dataSource="brandTree"
              rowKey="id"
            >
              <template slot="checkbox" slot-scope="record">
                <a-checkbox
                  :indeterminate="hasBrandIndeterminate(record)"
                  :checked="hasBrandChecked(record)"
                  :disabled="isBrandDisabled(record)"
                  @change="onBrandCheckChange(record, $event)"
                ></a-checkbox>
              </template>
            </oa-table>
          </a-tab-pane>
          <a-tab-pane tab="门店" key="2">
            <oa-table
              :loading="getRoleAuth$loading"
              :pagination="false"
              :columns="tableOptions.columns"
              rowKey="id"
              :dataSource="shopTree"
            >
              <template slot="checkbox" slot-scope="record">
                <a-checkbox
                  :indeterminate="hasShopIndeterminate(record)"
                  :checked="hasShopChecked(record)"
                  :disabled="isShopDisabled(record)"
                  @change="onShopCheckChange(record, $event)"
                ></a-checkbox>
              </template>
            </oa-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="function-add__footer">
      <oa-button @click="onSubmit" type="primary" :loading="getAuthAdd$loading">
        保存全部
      </oa-button>
    </div>
  </div>
</template>

<script>
import { listToTree } from 'oa-core/utils/list-to-tree'
import { TableTreeSelect } from 'oa-core/utils/table-tree-select'
import {
  getRoleAuth,
  getRoleBrandAuth,
  getBatchAuthAdd,
  getAuthAdd
} from '@/api/software'
import { tableOptions, multiOptions } from './auth#config'
import { get } from 'lodash-es'
export default {
  name: 'function-add',

  components: {},

  props: {},

  data() {
    return {
      searchQuery: this.$route.meta.query,
      brandTree: [], // brand_list转化的tree数组
      shopTree: [], // shop_list转化的tree数组
      brand_ids: [], // 选择的brand相关权限点
      shop_ids: [], // 选择的shop相关权限点
      brand_select_ids: [], // 之前已选的brand相关权限点
      shop_select_ids: [], // 之前已选的shop相关权限点
      brandTreeSelect: new TableTreeSelect(),
      shopTreeSelect: new TableTreeSelect(),
      menu_type: '1'
    }
  },

  computed: {
    tableOptions,
    multiOptions,
    ids() {
      return get(this.searchQuery, 'ids', [])
    },
    leads_id() {
      return get(this.searchQuery, 'leads_id', '')
    },
    version_id() {
      return get(this.searchQuery, 'version_id', 1)
    },
    tag() {
      return get(this.searchQuery, 'tag', 'single')
    },
    search_menu_type() {
      return get(this.searchQuery, 'menu_type', 1)
    },
    leads_name() {
      return get(this.searchQuery, 'leads_name', '')
    },
    system_version() {
      return get(this.searchQuery, 'system_version', '')
    },
    is_multi() {
      return get(this.searchQuery, 'is_multi', 1)
    }
  },

  watch: {
    $route(newRoute) {
      /**
       * 更换时 全部重请求
       */
      this.searchQuery = { ...newRoute.meta.query }
      this.init()
    }
  },

  async: {
    init() {
      let params = {
        version_id: this.version_id,
        menu_type: this.search_menu_type,
        is_multi: this.searchQuery.is_multi
      }
      this.ids.forEach((id, index) => {
        params[`brand_ids[${index}]`] = id
      })
      this.getRoleAuth(params)
    },
    // 多个用户权限列表，无回显
    getRoleAuth(data) {
      return getRoleAuth(data).then(res => {
        // 给权限组组织成children形式
        this.brandTree = listToTree(this.handleGroupList(res.list.brand_ids))
        this.shopTree = listToTree(this.handleGroupList(res.list.shop_ids))

        this.brandTreeSelect.setTree(this.brandTree)
        this.shopTreeSelect.setTree(this.shopTree)
      })
    },
    // 批量添加权限
    // getBatchAuthAdd(data) {
    //   return getBatchAuthAdd(data).then(res => {
    //     this.$message.success('添加成功')
    //     this.brand_ids = []
    //     this.shop_ids = []
    //   })
    // },
    // 单个用户添加权限
    getAuthAdd(data) {
      return getAuthAdd(data).then(res => {
        this.$message.success('添加成功')
        this.brand_ids = []
        this.shop_ids = []
      })
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /**
     * @description 品牌权限勾选状态展示
     * @param {Object} record
     */
    hasBrandIndeterminate(record) {
      return this.brandTreeSelect.hasIndeterminate(record, this.brand_ids)
    },
    /**
     * @description 品牌权限是否已选
     * @param {Object} record
     */
    hasBrandChecked(record) {
      return this.brand_ids.indexOf(record.id) > -1
    },
    /**
     * @description 品牌权限被选回调
     * @param {Object} record
     * @param {Event} e
     */
    onBrandCheckChange(record, e) {
      this.brand_ids = this.brandTreeSelect.calcCheckedIds(
        this.brand_ids,
        record,
        e.target.checked
      )
    },
    /**
     * @description 品牌权限是否禁选
     * @param {Object} record
     */
    isBrandDisabled(record) {
      return this.brand_select_ids.includes(record.id)
    },
    /**
     * @description 门店权限勾选状态展示
     * @param {Object} record
     */
    hasShopIndeterminate(record) {
      return this.shopTreeSelect.hasIndeterminate(record, this.shop_ids)
    },
    /**
     * @description 门店权限是否已选
     * @param {Object} record
     */
    hasShopChecked(record) {
      return this.shop_ids.indexOf(record.id) > -1
    },
    /**
     * @description 门店权限被选回调
     * @param {Object} record
     */
    onShopCheckChange(record, e) {
      this.shop_ids = this.shopTreeSelect.calcCheckedIds(
        this.shop_ids,
        record,
        e.target.checked
      )
    },
    /**
     * @description 单门店多门店切换
     */
    onMultiChange() {
      this.$router.push({
        query: {
          ...this.$searchQuery
        }
      })
    },
    onChange(key) {
      this.menu_type = key
    },
    /**
     * @description 门店权限是否禁选
     */
    isShopDisabled(record) {
      return this.shop_select_ids.includes(record.id)
    },
    /**
     * @description 将菜单下权限组转化树形结构
     */
    handleGroupList(list) {
      let listTree = []
      if (list.length <= 0) {
        return
      }
      listTree = list.map(item => {
        item = {
          ...item,
          id: item.version_menu_id,
          name: item.menu_name,
          remarks: item.aliases
        }
        if (item.groups && item.groups.length > 0) {
          // 如果存在权限组
          item.groups = item.groups.map(group => {
            return {
              id: `group_${group.group_id}`,
              name: `${group.group_name}${
                group.is_grayscale === 1 ? '【灰度】' : ''
              }`,
              remarks: group.remarks,
              is_grayscale: group.is_grayscale
            }
          })
          if (item.children && item.children.length > 0) {
            item.children.map(child => {
              return {
                id: child.version_menu_id,
                name: child.menu_name,
                remarks: child.aliases
              }
            })
            // 子菜单存在，权限组属于子菜单下一级
            item.children.children = []
            item.children.children.push(item.groups)
          } else {
            // 不存在子菜单，属于菜单的下一级
            item.children = [...item.groups]
          }
        }
        return item
      })
      return listTree
    },
    onSubmit() {
      // if (this.tag === 'batch') {
      //   this.getBatchAuthAdd({
      //     ids: this.ids,
      //     brand_list: this.brand_ids,
      //     shop_list: this.shop_ids
      //   }).then(() => {
      //     this.getRoleAuth({
      //       is_multi: this.searchQuery.is_multi
      //     })
      //   })
      // } else {
      let filterBrandIds = this.brand_ids.filter(item => {
        return (
          !this.brand_select_ids.includes(item) &&
          item.toString().startsWith('group_')
        )
      })
      let filterShopIds = this.shop_ids.filter(item => {
        return (
          !this.shop_select_ids.includes(item) &&
          item.toString().startsWith('group_')
        )
      })
      filterBrandIds = filterBrandIds.map(id => {
        return id.replace('group_', '')
      })
      filterShopIds = filterShopIds.map(id => {
        return id.replace('group_', '')
      })
      this.getAuthAdd({
        brand_ids: this.ids,
        brand_prem_ids: filterBrandIds,
        shop_prem_ids: filterShopIds,
        menu_type: this.menu_type,
        is_multi: this.is_multi,
        version_id: this.version_id
      }).then(() => {
        this.init()
      })
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.function-add {
  padding: 0 24px;
  background-color: #fff;
  &__header {
    .lh(44px);
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f5;
    position: relative;
    .batch {
      font-size: 20px;
      span {
        color: #1890ff;
      }
    }
    .single {
      .brand_name {
        font-weight: bold;
        font-size: 16px;
      }
      span {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        font-size: 14px;
      }
      .version-info {
        float: right;
      }
    }
    .is_multi_select {
      position: absolute;
      right: 200px;
      top: 0;
      margin-top: 15px;
    }
  }
  &__silderbar {
    width: 256px;
    background: #f6faff;
    padding-top: 16px;
    padding-bottom: 16px;
    border-right: 1px solid #f3f4f5;
  }
  &__content {
    display: flex;
  }
  &__tab {
    flex: 1;
  }
  &__footer {
    .h(66px);
    .lh(44px);
    border-top: 1px solid #f3f4f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.role-title {
  .fz(16px);
  .lh(22px);
  .pd(8px 24px);
  color: #1890ff;
  font-weight: bold;
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
}
</style>
