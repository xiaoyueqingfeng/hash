<template>
  <div class="role-default-layout">
    <div class="role-default-layout__sider">
      <div class="role-default-layout__sider-actions">
        <a
          v-modal-link="{
            name: 'role-add',
            props: { version_id: searchQuery.version_id },
            on: { done: getRoleList }
          }"
        >
          <a-icon class="mg-r8" type="plus"></a-icon>
          添加角色
        </a>
      </div>
      <ul class="role-list">
        <li
          @click="onClickRole(role)"
          class="role-item"
          :class="{ active: searchQuery.role_id == role.id }"
          v-for="role in roleList"
          :key="role.id"
        >
          <span class="role-item__name">{{ role.name }}</span>
          <oa-more-dropdown class="role-item__more">
            <a
              v-modal-link="{
                name: 'role-edit',
                props: {
                  version_id: searchQuery.version_id,
                  name: role.name,
                  role_id: role.id,
                  level_id: role.level_id
                },
                on: { done: getRoleList }
              }"
            >
              编辑
            </a>
            <a
              v-modal-link="{
                name: 'role-delete',
                props: { role_id: role.id },
                on: { done: getRoleList }
              }"
            >
              删除
            </a>
          </oa-more-dropdown>
        </li>
      </ul>
    </div>
    <div class="role-default-layout__main">
      <div class="role-default-auth">
        <section class="role-default-auth__body">
          <div class="role-default-auth__main">
            <oa-t3>角色权限</oa-t3>
            <div class="role-default-auth__params">
              <oa-select
                v-model="is_multi"
                @change="onMultiChange"
                :options="shopOptions"
              ></oa-select>
            </div>
            <div class="role-default-auth__actions">
              <a-radio-group v-model="type">
                <a-radio-button value="brand">品牌</a-radio-button>
                <a-radio-button value="shop">门店</a-radio-button>
              </a-radio-group>
            </div>
            <!-- 品牌权限 -->
            <oa-table
              v-show="type === 'brand'"
              :loading="getAuthSetting$loading"
              :pagination="false"
              :columns="tableOptions.columns"
              rowKey="id"
              :dataSource="brandTree"
            >
              <template slot="checkbox" slot-scope="record">
                <a-checkbox
                  :indeterminate="hasBrandIndeterminate(record)"
                  :checked="hasBrandChecked(record)"
                  :disabled="info.level_id === 1"
                  @change="onBrandCheckChange(record, $event)"
                ></a-checkbox>
              </template>
            </oa-table>

            <!-- 门店权限 -->
            <oa-table
              v-show="type === 'shop'"
              :loading="getAuthSetting$loading"
              :pagination="false"
              :columns="tableOptions.columns"
              rowKey="id"
              :dataSource="shopTree"
            >
              <template slot="checkbox" slot-scope="record">
                <a-checkbox
                  :indeterminate="hasShopIndeterminate(record)"
                  :checked="hasShopChecked(record)"
                  :disabled="info.level_id === 1"
                  @change="onShopCheckChange(record, $event)"
                ></a-checkbox>
              </template>
            </oa-table>
          </div>

          <div class="role-default-auth__sider">
            <oa-t3>设置数据权限</oa-t3>
            <a-radio-group v-model="info.data_grant" class="grant-radio-group">
              <a-radio :value="4">全部门</a-radio>
              <a-radio :value="3">跨部门</a-radio>
              <a-radio :value="2">部门及子部门</a-radio>
              <a-radio :value="1">仅自己</a-radio>
            </a-radio-group>

            <oa-t3 class="mg-t32">角色描述</oa-t3>

            <oa-textarea
              class="mg-t24"
              rows="5"
              v-model="info.desc"
              maxlength="20"
              placeholder="请输入角色描述，不超过20个字"
            ></oa-textarea>
          </div>
        </section>
        <section class="role-default-auth__footer">
          <oa-button @click="onOpenAuthConfirm" type="primary">
            保存全部
          </oa-button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthOptions, getAuthSetting, getRoleList } from '@/api/role'
import { TableTreeSelect } from 'oa-core/utils/table-tree-select'
import { listToTree } from 'oa-core/utils/list-to-tree'
import { tableOptions, shopOptions } from './auth#config'
import { cloneDeep } from 'lodash-es'
import { diff } from 'oa-core/utils/collection'

export default {
  data() {
    return {
      searchQuery: this.$route.meta.query,
      type: 'brand',

      roleList: [],
      originalBrandIds: [],
      originalShopIds: [],

      info: {
        desc: '',
        data_grant: 4,
        name: '',
        brand_ids: [],
        shop_ids: []
      },
      brand_list: [],
      shop_list: [],

      brandTree: [],
      shopTree: [],
      brandTreeSelect: new TableTreeSelect(),
      shopTreeSelect: new TableTreeSelect(),

      is_multi: 1
    }
  },

  computed: {
    tableOptions,
    shopOptions,
    firstRoleId() {
      if (!this.roleList) {
        return '0'
      }
      if (!this.roleList[0]) {
        return '0'
      }
      return this.roleList[0].id
    }
  },
  methods: {
    onClickRole(role) {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          role_id: role.id
        }
      })
    },
    hasBrandChecked(record) {
      return this.info.brand_ids.indexOf(record.id) > -1
    },
    hasBrandIndeterminate(record) {
      return this.brandTreeSelect.hasIndeterminate(record, this.info.brand_ids)
    },
    onBrandCheckChange(record, e) {
      this.info.brand_ids = this.brandTreeSelect.calcCheckedIds(
        this.info.brand_ids,
        record,
        e.target.checked
      )
    },
    hasShopChecked(record) {
      return this.info.shop_ids.indexOf(record.id) > -1
    },
    hasShopIndeterminate(record) {
      return this.shopTreeSelect.hasIndeterminate(record, this.info.shop_ids)
    },
    onShopCheckChange(record, e) {
      this.info.shop_ids = this.shopTreeSelect.calcCheckedIds(
        this.info.shop_ids,
        record,
        e.target.checked
      )
    },
    onMultiChange() {
      this.initData()
    },
    onOpenAuthConfirm() {
      const brandDiff = diff(this.originalBrandIds, this.info.brand_ids)
      const shopDiff = diff(this.originalShopIds, this.info.shop_ids)
      const brandAddedNames = this.brandTreeSelect
        .getPathNameGroup(brandDiff.added)
        .map(name => '品牌 - ' + name)
      const brandRemovedNames = this.brandTreeSelect
        .getPathNameGroup(brandDiff.removed)
        .map(name => '品牌 - ' + name)
      const shopAddedNames = this.shopTreeSelect
        .getPathNameGroup(shopDiff.added)
        .map(name => '门店 - ' + name)
      const shopRemovedNames = this.shopTreeSelect
        .getPathNameGroup(shopDiff.removed)
        .map(name => '门店 - ' + name)
      this.$modalRouter.push({
        name: 'role-auth-confirm',
        props: {
          version_id: this.searchQuery.version_id,
          added: brandAddedNames.concat(shopAddedNames),
          removed: brandRemovedNames.concat(shopRemovedNames),
          info: this.info,
          type: 'auth',
          is_multi: this.is_multi
        },
        on: {
          done: () => {
            this.getAuthSetting()
          }
        }
      })
    }
  },
  created() {
    this.initData()
  },
  watch: {
    $route(newRoute) {
      // 这里不分析请求依赖关系 只要路由变化 就initData
      this.searchQuery = { ...newRoute.meta.query }
      this.initData()
    }
  },
  async: {
    initData() {
      return this.getRoleList().then(() => {
        if (!this.searchQuery.role_id) {
          this.searchQuery.role_id = this.firstRoleId
        }
        return Promise.all([this.getAuthSetting(), this.getAuthOptions()])
      })
    },
    getRoleList() {
      return getRoleList({
        ...this.searchQuery
      }).then(res => {
        this.roleList = res.list || []
      })
    },
    getAuthSetting() {
      return getAuthSetting({
        role_id: this.searchQuery.role_id,
        is_multi: this.is_multi
      }).then(res => {
        res.brand_ids = res.brand_ids || []
        res.shop_ids = res.shop_ids || []
        this.info = res

        this.originalBrandIds = cloneDeep(res.brand_ids)
        this.originalShopIds = cloneDeep(res.shop_ids)
      })
    },
    getAuthOptions() {
      return getAuthOptions({
        role_id: this.searchQuery.role_id,
        is_multi: this.is_multi
      }).then(res => {
        this.brand_list = res.brand_list || []
        this.shop_list = res.shop_list || []

        this.brandTree = listToTree(res.brand_list)
        this.shopTree = listToTree(res.shop_list)
        this.brandTreeSelect.setTree(this.brandTree)
        this.shopTreeSelect.setTree(this.shopTree)
      })
    }
  }
}
</script>

<style lang="less">
.role-default-auth {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  &__body {
    display: flex;
    flex: 1;
  }
  &__main {
    flex: 1;
    .pd(24px);
    border-right: 1px solid @border-color;
    .pos-r;
  }
  &__sider {
    flex: 0 0 300px;
    .pd(24px);
  }
  &__params {
    .pos-a;
    right: 200px;
    top: 8px;
  }
  &__actions {
    .pos-a;
    right: 24px;
    top: 8px;
  }

  &__footer {
    .ta-c;
    .pd(24px);
    border-top: 1px solid @border-color;
  }

  .grant-radio-group {
    .ant-radio-wrapper {
      display: block;
      .mg-t(24px);
    }
  }
}
</style>
