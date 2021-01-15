<template>
  <oa-panel app>
    <div class="mg-b16">
      <a-input-search
        enterButton
        placeholder="搜索leadsID，推荐人或合伙人姓名、手机号"
        v-model="$searchQuery.keywords"
        style="width: 500px"
        @search="tbOnSearchKeywords('keywords', $event)"
      ></a-input-search>
    </div>
    <oa-table
      rowKey="id"
      :scroll="{ x: 1600 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getCommissionList$loading"
      @change="tbOnTableChange"
    >
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/commission/stop']"
            @click="stopCommission(record.id)"
          >
            停止分佣
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './commission#config'
import { getCommissionList, commissionStop } from '@/api/commission'
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
    getCommissionList() {
      return getCommissionList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  created() {
    this.getCommissionList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getCommissionList()
    }
  },
  computed: {
    tableOptions
  },
  methods: {
    stopCommission(id) {
      this.$confirm({
        title: '是否停止分佣',
        content: '停止后，该订单将不再按月结算佣金，且停止后无法恢复操作。',
        onOk: () => {
          return commissionStop({ id: id }).then(res => {
            this.$message.success('停止分佣成功')
            this.getCommissionList()
          })
        }
      })
    }
  }
}
</script>
