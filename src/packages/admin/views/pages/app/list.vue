<template>
  <div class="app-management">
    <oa-filter-box class="mg-b16">
      <oa-select
        :options="mapping.system_type"
        placeholder="选择系统"
        v-model="$searchQuery.system_type"
        @change="selectSystem"
      ></oa-select>
      <oa-select
        class="mg-r8"
        :options="mapping.push_status"
        placeholder="请选择"
        v-model="$searchQuery.push_status"
        @change="selectStatus"
      ></oa-select>
      <template slot="actions">
        <a-button type="primary" @click="addApp()">
          添加
        </a-button>
      </template>
    </oa-filter-box>
    <oa-table
      :rowKey="row => row.id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      @change="tbOnTableChange"
      :loading="getAppVersionList$loading"
    >
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            @click="editApp(record.id)"
            v-if="record.auth_area['api/app-version/edit']"
          >
            修改
          </a>
          <a
            @click="pushApp(record.id)"
            v-if="record.auth_area['api/app-version/push']"
          >
            推送
          </a>
          <a
            @click="deleteApp(record.id)"
            v-if="record.auth_area['api/app-version/delete']"
          >
            删除
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>
<script>
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { getAppVersionList, deleteApp } from '@/api/app-version.js'
import { get } from 'lodash-es'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      mapping: {
        push_status: [],
        system_type: []
      },
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getAppVersionList()
    }
  },
  created() {
    this.getAppVersionList()
  },
  async: {
    //获取app列表
    getAppVersionList() {
      return getAppVersionList({ ...this.$searchQuery }).then(res => {
        this.mapping = get(res, 'mapping', {})
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  methods: {
    //选择系统
    selectSystem() {
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    },
    //选择状态
    selectStatus() {
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    },
    //添加app
    addApp() {
      this.$modalRouter.push({
        name: 'app-add',
        props: {
          isEdit: false,
          os_type: this.mapping.os_type,
          system_type: this.mapping.system_type
        },
        on: { done: this.getAppVersionList }
      })
    },
    //修改app
    editApp(id) {
      console.log(id)
      this.$modalRouter.push({
        name: 'app-add',
        props: {
          isEdit: true,
          id: id
        },
        on: { done: this.getAppVersionList }
      })
    },
    //推送
    pushApp(id) {
      this.$modalRouter.push({
        name: 'app-push-confirm',
        props: {
          id: id
        },
        on: {
          done: this.getAppVersionList
        }
      })
    },
    //删除app
    deleteApp(id) {
      this.$confirm({
        title: '确认删除',
        content: '确定把此版本删除吗？',
        onOk: () => {
          return deleteApp({ id: id }).then(res => {
            this.$message.success('删除成功')
            this.getAppVersionList()
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.app-management {
  background-color: #fff;
  padding: 16px;
}
</style>
