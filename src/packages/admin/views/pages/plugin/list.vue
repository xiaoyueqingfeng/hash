<template>
  <div class="plugin">
    <oa-panel app>
      <oa-filter-box class="mg-b24">
        <oa-select
          :options="mapping.plugin_type"
          placeholder="插件类型"
          v-model="$searchQuery.type"
          @change="tbOnSearch"
        ></oa-select>
        <template slot="actions">
          <a-button type="primary" @click="goAdd(0)">新增插件</a-button>
        </template>
      </oa-filter-box>
      <oa-table
        rowKey="id"
        :columns="tableOptions.columns"
        :dataSource="list"
        :loading="getPluginList$loading"
        @change="tbOnTableChange"
        :pager="pager"
      >
        <template slot="plugin_type" slot-scope="record">
          <span>
            {{ record.plugin_type | statusFilter(mapping.plugin_type) }}
          </span>
        </template>
        <template slot="system_type" slot-scope="record">
          <span>
            {{ record.system_type | statusFilter(mapping.system_type) }}
          </span>
        </template>
        <template slot="version" slot-scope="record">
          <span>
            {{ getVersionText(record.version) }}
          </span>
        </template>
        <template slot="permission_group_list_text" slot-scope="record">
          <oa-overflow-text
            maxWidth="400px"
            :title="record.permission_group_list_text"
          >
            {{ record.permission_group_list_text }}
          </oa-overflow-text>
        </template>
        <template slot="is_allow_try" slot-scope="record">
          <span>
            {{ record.is_allow_try | statusFilter(mapping.is_allow_try) }}
          </span>
        </template>
        <template slot="status" slot-scope="record">
          <a-badge :status="record.status ? 'success' : 'error'"></a-badge>
          <span>{{ record.status | statusFilter(mapping.status) }}</span>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a @click="goAdd(record.id)">编辑</a>
            <a
              v-modal-link="{
                name: 'plugin-disable',
                props: { id: record.id, name: record.name },
                on: { success: update }
              }"
            >
              下架
            </a>
            <a
              v-modal-link="{
                name: 'plugin-enable',
                props: { id: record.id, name: record.name },
                on: { success: update }
              }"
            >
              上架
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </oa-panel>
  </div>
</template>
<script>
import { getPluginList } from '@/api/plugin'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { get, map } from 'lodash-es'

export default {
  name: 'Plugin',
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      mapping: {},
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
      this.getPluginList()
    }
  },
  async: {
    getPluginList() {
      return getPluginList({ ...this.$searchQuery }).then(res => {
        this.list = get(res, 'list', [])
        this.mapping = get(res, 'mapping', {})
        this.pager = res.pager
      })
    }
  },
  created() {
    this.getPluginList()
  },
  methods: {
    getVersionText(versions) {
      let str = ''
      versions.map(version => {
        str +=
          this.mapping.version_list.filter(i => i.id === version)[0]['name'] +
          ','
      })
      return str.substr(0, str.length - 1)
    },
    update() {
      this.getPluginList()
    },
    goAdd(id) {
      this.$router.push({
        path: '/plugin/edit',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.plugin {
  height: 100%;
}
</style>
