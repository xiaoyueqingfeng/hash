<template>
  <oa-panel>
    <a-input-search
      class="mg-r16"
      enterButton
      placeholder="搜索客户id、客户姓名"
      v-model="$searchQuery.search"
      style="width: 300px"
      @search="tbOnSearchKeywords('search', $event)"
    ></a-input-search>
    <oa-table
      class="mg-t16"
      rowKey="leads_id"
      :scroll="{ x: 1500 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getBrandList$loading"
      @change="tbOnTableChange"
    >
      <template slot="total_revenue" slot-scope="text, record">
        <router-link
          v-if="text >= 0"
          :to="{
            name: 'platform-order-list',
            query: { brand_id: record.brand_id }
          }"
        >
          {{ text }}
        </router-link>
        <span v-else>{{ text }}</span>
      </template>
      <router-link
        v-if="text >= 0"
        slot="total_order_num"
        slot-scope="text, record"
        :to="{
          name: 'platform-order-list',
          query: { brand_id: record.brand_id }
        }"
      >
        {{ text }}
      </router-link>
      <span v-else>{{ text }}</span>
    </oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './list#config'
import { getBrandList } from '@/api/platform'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getBrandList() {
      return getBrandList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  created() {
    this.getBrandList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getBrandList()
    }
  },
  computed: {
    tableOptions
  },
  methods: {}
}
</script>
