<template>
  <oa-panel app>
    <a-input-search
      enterButton
      placeholder="搜索合伙人姓名、手机号"
      v-model="$searchQuery.keywords"
      style="width: 300px"
      @search="tbOnSearchKeywords('keywords', $event)"
    ></a-input-search>
    <oa-table
      class="mg-t16"
      rowKey="id"
      :scroll="{ x: 1400 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getCommissionStatList$loading"
      @change="tbOnTableChange"
    >
      <template slot="detail" slot-scope="text, record">
        <oa-overflow-text maxWidth="10em" :title="record.agent_name">
          <router-link
            :to="{
              name: 'distribution-commission',
              query: { keywords: record.agent_name }
            }"
          >
            {{ record.agent_name }}
          </router-link>
        </oa-overflow-text>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './agent#config'
import { getCommissionStatList } from '@/api/commission'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      pager: {},
      dataSource: []
    }
  },
  async: {
    getCommissionStatList() {
      return getCommissionStatList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  created() {
    this.getCommissionStatList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getCommissionStatList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
