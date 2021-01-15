<template>
  <div class="businesscase">
    <oa-panel app>
      <oa-filter-box class="mg-b24">
        <oa-select
          placeholder="请选择状态"
          @change="tbOnSearch"
          :options="fromData.status"
          v-model="$searchQuery.status"
        ></oa-select>
        <admin-version-select
          v-model="$searchQuery.version_id"
          @change="tbOnSearch"
        />
        <template slot="actions">
          <oa-button
            type="primary"
            v-modal-link="{ name: 'businesscase-edit' }"
          >
            新增案例
          </oa-button>
        </template>
      </oa-filter-box>
      <oa-table
        :scroll="{ x: 1440 }"
        rowKey="id"
        :columns="tableOptions.columns"
        :dataSource="list"
        @change="tbOnTableChange"
        :loading="getBusinesscaseList$loading"
        :pager="pager"
      >
        <template slot="type" slot-scope="record">
          <span>{{ record.type | statusFilter(fromData.type) }}</span>
        </template>
        <template slot="status" slot-scope="record">
          <a-badge
            :status="record.status === 1 ? 'success' : 'error'"
          ></a-badge>
          <span>{{ record.status | statusFilter(fromData.status) }}</span>
        </template>
        <template slot="link_url" slot-scope="record">
          <a :href="record.link_url" target="_blank" class="text-overflow">
            {{ record.link_url }}
          </a>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-modal-link="{
                name: 'businesscase-edit',
                props: { id: record.id },
                on: { success: update }
              }"
            >
              编辑
            </a>
            <a
              v-if="record.status === 1"
              v-modal-link="{
                name: 'businesscase-disable',
                props: { id: record.id },
                on: { success: update }
              }"
            >
              禁用
            </a>
            <a
              v-if="record.status === 2"
              v-modal-link="{
                name: 'businesscase-enable',
                props: { id: record.id },
                on: { success: update }
              }"
            >
              恢复
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </oa-panel>
  </div>
</template>
<script>
import { getBusinesscaseList } from '@/api/businesscase'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { get } from 'lodash-es'
export default {
  name: 'Businesscase',
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      fromData: {},
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
    this.getBusinesscaseList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getBusinesscaseList()
    }
  },
  methods: {
    update() {
      this.getBusinesscaseList()
    }
  },
  async: {
    getBusinesscaseList() {
      return getBusinesscaseList({ ...this.$searchQuery, only_list: 0 }).then(
        res => {
          if (res.mapping) this.fromData = get(res, 'mapping', {})
          this.list = get(res, 'list', [])
          this.pager = res.pager
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.businesscase {
  height: 100%;
}
.text-overflow {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
