<template>
  <oa-panel app>
    <div class="ta-r">
      <a
        v-modal-link="{
          name: 'role-add',
          props: { platforms },
          on: { done: getRoleList }
        }"
      >
        <oa-button type="primary">添加角色</oa-button>
      </a>
    </div>
    <oa-table
      class="mg-t24"
      :columns="tableOptions.columns"
      :loading="getRoleList$loading"
      :dataSource="roles"
      rowKey="id"
    >
      <span slot="roleType" slot-scope="record">
        {{ record.role_type | mapFilter(maps.role_type) }}
      </span>
      <div slot="platform_info" slot-scope="record">
        <a-tag color="blue" v-for="p in record.platform_info" :key="p.code">
          {{ p.name }}
        </a-tag>
      </div>

      <div slot="action" slot-scope="record">
        <a
          v-modal-link="{
            name: 'role-edit',
            props: { role: record, platforms },
            on: { done: getRoleList }
          }"
        >
          编辑
        </a>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm
          title="确认删除该角色么?"
          @confirm="onDeleteRole(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
      </div>
    </oa-table>
  </oa-panel>
</template>

<script>
import { tableOptions } from './index#config'
import { getRoleList, deleteRole, getRolePlatform } from '@/api/role'
export default {
  computed: {
    tableOptions
  },
  data() {
    return {
      roles: [],
      platforms: [],
      maps: {
        role_type: {}
      },
      searchQuery: this.$route.meta.query
    }
  },
  created() {
    this.initData()
  },
  methods: {
    onDeleteRole(id) {
      this.deleteRole({ id }).then(() => {
        this.$message.success('删除角色成功！')
        this.getRoleList()
      })
    }
  },
  async: {
    initData() {
      return Promise.all([this.getRoleList(), this.getRolePlatform()])
    },
    getRolePlatform() {
      return getRolePlatform().then(res => {
        this.platforms = res.list
      })
    },
    getRoleList() {
      return getRoleList().then(res => {
        this.roles = res.list
        this.maps = res.maps
      })
    },
    deleteRole
  }
}
</script>
