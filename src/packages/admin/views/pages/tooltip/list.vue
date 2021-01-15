<template>
  <div class="tooltip">
    <oa-panel app>
      <oa-filter-box class="mg-b24">
        <a-input-search
          enterButton
          placeholder="请输入内容"
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
        ></a-input-search>
        <template slot="actions">
          <oa-button
            type="primary"
            class="mg-l24"
            v-modal-link="{ name: 'tooltips-edit', on: { success: update } }"
          >
            新增tooltip
          </oa-button>
        </template>
      </oa-filter-box>
      <oa-table
        rowKey="id"
        :columns="tableOptions.columns"
        :dataSource="list"
        :loading="getTooltipsList$loading"
        @change="tbOnTableChange"
        :pager="pager"
      >
        <template slot="status" slot-scope="record">
          <a-badge :status="record.status ? 'success' : 'error'"></a-badge>
          <span>{{ record.status ? '有效' : '无效' }}</span>
        </template>
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-modal-link="{
                name: 'tooltips-edit',
                props: { record },
                on: { success: update }
              }"
            >
              编辑
            </a>
            <a
              v-if="record.status"
              v-modal-link="{
                name: 'tooltips-disable',
                props: { record },
                on: { success: update }
              }"
            >
              禁用
            </a>
            <a
              v-if="!record.status"
              v-modal-link="{
                name: 'tooltips-enable',
                props: { record },
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
import { getTooltipsList } from '@/api/tooltip'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './list#config'
import { get } from 'lodash-es'
export default {
  name: 'ToolTip',
  mixins: [tableMixins],
  data() {
    return {
      list: [],
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
      this.getTooltipsList()
    }
  },
  async: {
    getTooltipsList() {
      return getTooltipsList({ ...this.$searchQuery }).then(res => {
        this.list = get(res, 'list', [])
        this.pager = res.pager
      })
    }
  },
  created() {
    this.getTooltipsList()
  },
  methods: {
    update() {
      this.getTooltipsList()
    }
  }
}
</script>
<style lang="less" scoped>
.tooltip {
  height: 100%;
}
</style>
