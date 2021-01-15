<template>
  <oa-panel app>
    <a-input-search
      enterButton
      placeholder="搜索品牌商姓名、手机号"
      v-model="$searchQuery.keywords"
      style="width: 300px"
      @search="tbOnSearchKeywords('keywords', $event)"
    ></a-input-search>
    <oa-table
      class="mg-t16"
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getBrandSettlementList$loading"
      @change="tbOnTableChange"
    >
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-modal-link="{
              name: 'mall-distributor-withdraw-detail',
              props: {
                withdrawId: record.id,
                from: 'business'
              }
            }"
          >
            详情
          </a>
          <a @click="withdrawConfirm(record.id)">
            结算
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getBrandSettlementList, brandSettl } from '@/api/brand'
import { tableOptions } from './business-withdraw#config'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getBrandSettlementList() {
      return getBrandSettlementList().then(res => {
        this.pager = get(res, 'pager')
        this.dataSource = get(res, 'list', [])
      })
    }
  },
  created() {
    this.getBrandSettlementList()
  },
  watch: {
    $route(newRoute) {
      this.getBrandSettlementList()
    }
  },
  computed: {
    tableOptions
  },
  methods: {
    withdrawConfirm(id) {
      this.$confirm({
        title: '结算完成',
        content: '确认已完成结算打款后点击确认按钮',
        onOk: () => {
          return brandSettl({ settlement_id: id }).then(res => {
            this.$message.success('已确认结算完成')
            this.getBrandSettlementList()
          })
        }
      })
    }
  }
}
</script>
