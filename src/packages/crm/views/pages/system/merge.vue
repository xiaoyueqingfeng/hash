<template>
  <div class="record-merge">
    <div class="header mg-b16">
      <a-input-search
        enterButton
        placeholder="被合并客户id、主账号客户ID，被合并客户名称"
        v-model="$searchQuery.keywords"
        style="width: 300px"
        @search="tbOnSearchKeywords('keywords', $event)"
      ></a-input-search>
    </div>
    <div class="content">
      <oa-table
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pager="pager"
        @change="tbOnTableChange"
      >
        <div slot="id" slot-scope="text, record">
          <a
            v-modal-link="{
              name: 'customer-detail',
              props: { leadsId: record.id, leadsSn: record.sn, visible: true }
            }"
          >
            {{ record.id }}
          </a>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { getMergeRecord } from '@/api/pay'
import { tableColumns } from './merge#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      columns: tableColumns,
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {},

  async: {
    getMergeRecord(searchQuery) {
      return getMergeRecord(searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager', { p: 1, ps: 20, t: 0 })
      })
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getMergeRecord(this.$searchQuery)
    next()
  },

  created() {
    this.getMergeRecord(this.$searchQuery)
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.record-merge {
  background-color: #fff;
  padding: 24px;
}
</style>
