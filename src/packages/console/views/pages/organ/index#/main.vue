<template>
  <div class="main-box">
    <div class="ta-r">
      <a-button-group>
        <oa-button
          v-modal-link="{
            name: 'organ-add',
            props: {
              parent_id: searchQuery.organ_id,
              teamMap: maps.team_id_cat,
              areaMap: maps.area
            },
            on: { done: onOrganDone }
          }"
        >
          添加子部门
        </oa-button>
        <oa-button
          v-modal-link="{
            name: 'organ-edit',
            props: {
              id: searchQuery.organ_id,
              teamMap: maps.team_id_cat,
              areaMap: maps.area,
              info: organInfo
            },
            on: { done: onOrganDone }
          }"
        >
          编辑部门
        </oa-button>
        <oa-button
          v-modal-link="{
            name: 'organ-area',
            props: { id: searchQuery.organ_id, info: organInfo }
          }"
        >
          设定区域
        </oa-button>
      </a-button-group>

      <a-popconfirm title="确认删除该部门么?" @confirm="onDeleteOrgan()">
        <a-button class="mg-l8" type="danger">删除部门</a-button>
      </a-popconfirm>
    </div>
    <a-row :gutter="16" class="search-box mg-t16">
      <a-col :span="10">
        <a-input-search
          v-model="searchQuery.keywords"
          placeholder="搜索员工手机号、姓名"
          @search="onSearch"
          enterButton="搜索"
        />
      </a-col>
      <a-col :span="6">
        <a-select
          v-model="searchQuery.status"
          style="width: 100%"
          @change="onChange"
        >
          <a-select-option :value="0">全部</a-select-option>
          <a-select-option
            v-for="(status, sid) in maps.status"
            :value="+sid"
            :key="sid"
          >
            {{ status }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="8" class="ta-r">
        <router-link to="/organ/user/add">
          <a-button type="primary">添加员工</a-button>
        </router-link>
      </a-col>
    </a-row>
    <a-row class="mg-t16">
      <a-col :span="24">
        <oa-table
          :columns="tableOptions.columns"
          :scroll="{ x: 1800 }"
          :loading="getOrganInfo$loading"
          :dataSource="users"
          :pagination="{
            current: searchQuery.p,
            total: pager.t,
            pageSize: searchQuery.ps
          }"
          @change="onPaginationChange"
          rowKey="id"
        >
          <span slot="name" slot-scope="record">
            {{ record.name }}
            <a-tag v-show="record.id === user_info.id" color="blue">我</a-tag>
            <a-tag v-show="organAdmin.id === record.id" color="blue">
              主管
            </a-tag>
          </span>

          <a-tag color="blue" slot="role_info" slot-scope="role_info">
            {{ role_info.role_name }}
          </a-tag>

          <span slot="organ_admin" slot-scope="record">
            {{ organAdmin.name }} {{ record.un }}
          </span>

          <span slot="status" slot-scope="record">
            {{ record.status | statusFilter }}
          </span>

          <div slot="action" slot-scope="record">
            <oa-table-actions>
              <router-link :to="`/organ/user/edit?user_id=${record.id}`">
                编辑
              </router-link>
              <a-popconfirm
                :title="
                  `确定将“${record.name}”设为离职吗？该员工将无法登陆系统`
                "
                @confirm="onSetLeave(record)"
                v-if="record.status === '1'"
              >
                <a>设为离职</a>
              </a-popconfirm>
              <a-popconfirm
                @confirm="onSetWork(record)"
                :title="
                  `确定将“${record.name}”设为在职吗？改员工将恢复系统使用权限`
                "
                v-if="record.status === '2'"
              >
                <a>设为在职</a>
              </a-popconfirm>
              <a-popconfirm
                @confirm="onSetOrganAdmin(record)"
                :title="`将“${record.name}”设为部门主管`"
              >
                <a>设为主管</a>
              </a-popconfirm>
              <a-popconfirm
                @confirm="onCancelOrganAdmin(record)"
                :title="`将“${record.name}”取消部门主管`"
              >
                <a>取消主管</a>
              </a-popconfirm>
            </oa-table-actions>
          </div>
        </oa-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getOrganInfo, updateUserStatus, setOrganAdmin } from '@/api/user'
import { deleteOrgan } from '@/api/organ'
import { tableOptions } from './main#config.js'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexMain',
  props: {
    organInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      users: [],
      pager: {
        t: 1
      },
      organAdmin: {},
      maps: {
        // 员工离职 在职状态
        status: {},
        area: {},
        team_id_cat: {}
      },
      jobStatus: [],
      searchQuery: this.$route.meta.query
    }
  },
  created() {
    this.initData()
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.searchQuery = this.$route.meta.query
      this.initData()
    }
  },
  computed: {
    ...mapGetters('oa/user', ['user_info']),
    tableOptions,
    // scroll() {
    //   const list = this.list || []
    //   return list.length > 0 ? { x: 1200 } : {}
    // },
    organId() {
      return this.$route.query.id
    }
  },
  methods: {
    onPaginationChange(pagination) {
      this.searchQuery.p = pagination.current
      this.searchQuery.ps = pagination.pageSize
      this.$router.push({ query: { ...this.searchQuery } })
    },
    onDeleteOrgan() {
      this.deleteOrgan({
        id: this.searchQuery.organ_id
      }).then(() => {
        this.$message.success('删除部门成功!')
        this.onOrganDone()
      })
    },
    onOrganDone() {
      this.$emit('reload')
    },
    onChange(value) {
      this.$router.replace({ query: { ...this.searchQuery } })
    },
    onSearch(value) {
      this.$router.replace({ query: { ...this.searchQuery } })
    },
    onSetLeave(user) {
      this.updateUserStatus({
        user_id: user.id,
        status: 2
      }).then(() => {
        this.$message.success('员工离职成功！')
        this.getOrganInfo()
      })
    },
    onSetWork(user) {
      this.updateUserStatus({
        user_id: user.id,
        status: 1
      }).then(() => {
        this.$message.success('设为员工在职成功！')
        this.getOrganInfo()
      })
    },
    onSetOrganAdmin(user) {
      this.setOrganAdmin({
        user_id: user.id,
        type: 1
      }).then(() => {
        this.$message.success('设为主管成功！')
        this.getOrganInfo()
      })
    },
    onCancelOrganAdmin(user) {
      this.setOrganAdmin({
        user_id: user.id,
        type: 0
      }).then(() => {
        this.$message.success('取消主管成功！')
        this.getOrganInfo()
      })
    }
  },
  async: {
    initData() {
      return Promise.all([this.getOrganInfo()])
    },
    getOrganInfo() {
      return getOrganInfo(this.searchQuery).then(res => {
        this.users = res.list
        this.pager = res.pager
        this.maps = res.maps
        this.organAdmin = res.organ_admin
      })
    },
    deleteOrgan,
    updateUserStatus,
    setOrganAdmin
  },
  filters: {
    statusFilter(val) {
      let ret = ''
      switch (val) {
        case '1':
          ret = '在职'
          break
        case '2':
          ret = '离职'
          break
      }
      return ret
    }
  }
}
</script>
