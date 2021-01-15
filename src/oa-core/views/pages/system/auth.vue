<template>
  <div class="auth">
    <div class="auth__left">
      <p class="auth__left-title">角色列表</p>
      <div v-if="roleList.length" class="auth__left-list">
        <div
          class="auth__left-list-item"
          :class="{ active: role.id == roleId }"
          v-for="role in roleList"
          :key="role.id"
          @click="onSelectRole(role.id)"
        >
          {{ role.name }} ({{ role.count_user }})
        </div>
      </div>
    </div>
    <div class="auth__right">
      <div class="auth__right-content">
        <a-table
          :loading="getAuthConfigList$loading || initData$loading"
          rowKey="auth_id"
          :columns="tableOptions.columns"
          :dataSource="authTree"
          :pagination="false"
        >
          <!-- checkbox -->
          <template slot="checkbox" slot-scope="record">
            <a-checkbox
              :checked="record.checked"
              @change="onCheckboxChange(record, $event)"
            ></a-checkbox>
            <span>{{ record.list_order }}</span>
          </template>

          <a-tag color="blue" slot="auth_key" slot-scope="record">
            {{ record.auth_key }}
          </a-tag>

          <!-- operation  -->
          <a-select
            class="select"
            slot="operation"
            slot-scope="record"
            placeholder="请选择"
            v-show="record.checked"
            v-model="record.dataConfigValue"
          >
            <a-select-option
              v-for="(cname, cid) in record.data_field_config"
              :key="cid"
              :value="+cid"
            >
              {{ cname }}
            </a-select-option>
          </a-select>
        </a-table>
        <div class="ta-c mg-t24">
          <a-button
            :loading="saveAuth$loading"
            type="primary"
            @click="onSaveAuth"
          >
            保存全部
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getRoleList,
  getAuthList,
  getAuthConfigList,
  saveAuth
} from 'oa-core/api/user'
import container from 'oa-core/container'
import { listToTree } from 'oa-core/utils/list-to-tree'
import { walkTree } from 'oa-core/utils/walk-tree'
import { tableOptions } from './auth#config'
import { find, forEach, cloneDeep } from 'lodash-es'

const redirectRoleId = (to, from, next) => {
  const store = container.get('store')
  const userRole = store.getters['oa/user/role']

  if (!to.query.role_id) {
    if (userRole) {
      next({
        name: to.name,
        query: { role_id: userRole.role_id, _t: Date.now() }
      })
    } else {
      next({ name: to.name, query: { role_id: '1' } })
    }
  } else {
    next()
  }
}
export default {
  name: 'Auth',
  data() {
    return {
      roleList: [],
      originalAuthList: [],
      authList: [],
      authTree: []
    }
  },
  beforeRouteEnter: [redirectRoleId],
  beforeRouteUpdate: [redirectRoleId],
  created() {
    this.initData()
  },
  watch: {
    $route() {
      this.getAuthConfigList()
    }
  },
  computed: {
    tableOptions,
    roleId() {
      return this.$route.query.role_id
    }
  },

  methods: {
    // 选择角色
    onSelectRole(role_id) {
      this.$router.push({ query: { role_id } })
    },
    onSaveAuth() {
      this.saveAuth().then(() => {
        this.$message.success('保存权限成功！')
        this.getAuthConfigList()
      })
    },
    onCheckboxChange(record, e) {
      const findedAuth = find(this.authList, { id: record.id })
      const checked = e.target.checked
      this.$set(findedAuth, 'checked', checked)
      if (checked) {
        this.$set(findedAuth, 'dataConfigValue', 1)
      }
      if (findedAuth && findedAuth.children) {
        walkTree(findedAuth.children, node => {
          this.$set(node, 'checked', checked)
          if (checked) {
            this.$set(findedAuth, 'dataConfigValue', 1)
          }
        })
      }
    }
  },
  async: {
    initData() {
      return Promise.all([this.getRoleList(), this.getAuthList()]).then(() => {
        return this.getAuthConfigList()
      })
    },
    // 获取所有角色
    getRoleList() {
      return getRoleList().then(res => {
        this.roleList = Array.isArray(res.role) && res.role
      })
    },

    // 获取所有权限点
    getAuthList() {
      return getAuthList().then(res => {
        this.originalAuthList = res.auth
      })
    },
    getAuthConfigList() {
      return getAuthConfigList({ role_id: this.roleId }).then(res => {
        this.authList = cloneDeep(this.originalAuthList)
        this.authTree = listToTree(this.authList)
        forEach(this.authList, node => {
          const findAuthNode = find(res.role_auth, { auth_id: node.auth_id })
          if (findAuthNode) {
            this.$set(node, 'checked', true)
            this.$set(node, 'dataConfigValue', findAuthNode.data_field_config)
          }
        })
      })
    },
    saveAuth() {
      const data = []
      forEach(this.authList, node => {
        if (node.checked) {
          data.push({
            auth_id: node.auth_id,
            data_field_config: node.dataConfigValue || ''
          })
        }
      })
      return saveAuth({
        role_id: this.roleId,
        data: data.length ? data : ''
      })
    }
  }
}
</script>
<style lang="less">
.auth {
  display: flex;
  justify-content: space-around;
  &__left {
    display: inline-block;
    width: 15%;
    min-width: 200px;
    min-height: 756px;
    padding: 18px 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    &-title {
      padding: 0 24px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
    }
    &-list {
      &-item {
        height: 22px;
        font-size: 14px;
        margin-top: 22px;
        padding: 0 24px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
        cursor: pointer;
      }
      .active {
        color: #1890ff;
        border-left: 4px solid @primary-color;
      }
    }
  }
  .auth__right {
    width: 85%;
    margin-left: 24px;
    display: inline-block;
    background: #fff;
    .ant-table-row {
      .lh(32px);
    }
    .select {
      .w(100%);
    }
    &-content {
      padding-bottom: 24px;
      .title-wrap {
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        height: 54px;
        border-radius: 3px 3px 0px 0px;
      }
      .tree-wrap {
        background: #fff;
        padding: 18px 24px;
      }
    }
  }
}
</style>
