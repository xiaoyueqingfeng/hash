<template>
  <oa-panel app>
    <oa-filter-box>
      <template slot="actions">
        <oa-button type="primary" @click="goAdd(0)">新增模块</oa-button>
      </template>
    </oa-filter-box>
    <oa-table
      :loading="getModuleList$loading"
      class="mg-t16"
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="list"
      @change="tbOnTableChange"
      :pager="pager"
    >
      <template slot="support_version_list" slot-scope="record">
        <oa-overflow-text
          maxWidth="400px"
          :title="getVersionName(record.support_version_list)"
        >
          {{ getVersionName(record.support_version_list) }}
        </oa-overflow-text>
      </template>
      <template slot="support_permission_group_list" slot-scope="record">
        <oa-overflow-text
          maxWidth="400px"
          :title="record.support_permission_group_list"
        >
          {{ record.support_permission_group_list }}
        </oa-overflow-text>
      </template>
      <template slot="module_status_tip" slot-scope="record">
        <span :class="{ 'error-text': record.module_status === 2 }">
          {{ record.module_status_tip }}
        </span>
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="goAdd(record.id)">编辑</a>
          <a
            v-modal-link="{
              name: 'module-off',
              props: {
                id: record.id,
                name: record.module_name
              },
              on: {
                success: getModuleList
              }
            }"
          >
            下架
          </a>
          <a
            v-modal-link="{
              name: 'module-on',
              props: {
                id: record.id,
                name: record.module_name
              },
              on: {
                success: getModuleList
              }
            }"
          >
            上架
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getModuleList } from '@/api/module'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      list: [],
      pager: {}
    }
  },
  mixins: [tableMixins],
  computed: {
    tableOptions
  },
  async: {
    getModuleList() {
      return getModuleList({ ...this.$searchQuery }).then(res => {
        this.list = get(res, 'list', [])
        this.pager = get(res, 'pager', {})
      })
    }
  },
  mounted() {
    this.getModuleList()
  },
  methods: {
    goAdd(id) {
      this.$router.push({
        name: 'module-add',
        query: {
          id: id
        }
      })
    },
    getVersionName(list) {
      if (!list.length) return ''
      let versionNameList = list.map(item => {
        return item.version_name
      })
      return versionNameList.join('、')
    },
    getPermName(list) {
      if (!list.length) return ''
      let permNameList = list.map(item => {
        return item.permission_group_name
      })
      return permNameList.join('、')
    }
  }
}
</script>
<style lang="less" scoped>
.error-text {
  color: @error-color;
}
</style>
