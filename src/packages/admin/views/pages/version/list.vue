<template>
  <oa-panel app>
    <oa-filter-box>
      <template slot="actions">
        <oa-button
          type="primary"
          v-modal-link="{
            name: 'version-add',
            props: { isEdit: false },
            on: { done: getVersionList }
          }"
        >
          新增版本
        </oa-button>
      </template>
    </oa-filter-box>
    <oa-table
      :loading="getVersionList$loading"
      class="mg-t16"
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="list"
      @change="tbOnTableChange"
      :pager="pager"
    >
      <template slot="work_model" slot-scope="record">
        <span>
          {{ record.work_model | statusFilter(options.work_model) }}
        </span>
      </template>
      <template slot="sold" slot-scope="record">
        <span>{{ record.is_sale | statusFilter(options.sale_type) }}</span>
      </template>
      <template slot="description" slot-scope="record">
        <oa-overflow-text maxWidth="400px" :title="record.description">
          {{ record.description }}
        </oa-overflow-text>
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-modal-link="{
              name: 'version-add',
              props: {
                isEdit: true,
                version_id: record.id
              },
              on: { done: getVersionList }
            }"
          >
            编辑版本
          </a>
          <router-link
            :to="{
              name: 'version-menu',
              query: {
                version_id: record.id,
                version_name: record.version_name
              }
            }"
          >
            菜单权限配置
          </router-link>
          <a
            v-modal-link="{
              name: 'version-init',
              props: {
                version_id: record.id,
                version_name: record.version_name
              }
            }"
          >
            初始化配置
          </a>

          <!-- <a v-modal-link="{name:'version-disable',props:{name:record.name,id:record.id}}">禁用</a> -->
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>

<script>
import { tableOptions } from './list#config'
import { getVersionList } from '@/api/version'
import tableMixins from 'oa-core/mixins/table'

export default {
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      options: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  computed: {
    tableOptions
  },
  created() {
    this.initData()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = { ...newRoute.meta.query }
      this.initData()
    }
  },
  async: {
    initData() {
      return Promise.all([this.getVersionList()])
    },
    getVersionList() {
      return getVersionList({
        ...this.$searchQuery
      }).then(res => {
        console.log('list', res)
        this.list = res.list
        this.options = res.mappings
        this.pager = res.pager
      })
    }
  }
}
</script>
