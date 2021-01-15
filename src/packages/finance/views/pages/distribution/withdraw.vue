<template>
  <oa-panel>
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
      :scroll="{ x: 1500 }"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getWithdrawList$loading"
      @change="tbOnTableChange"
    >
      <template slot="reject_reason" slot-scope="record">
        <a-tooltip v-if="record.status === '2'" placement="top">
          <a-icon type="question-circle" />
          <template slot="title">
            <span>
              {{ record.reject_reason }}
            </span>
          </template>
        </a-tooltip>
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/withdraw/detail']"
            v-modal-link="{
              name: 'distribution-withdraw-detail',
              props: {
                id: record.id
              }
            }"
          >
            详情
          </a>
          <a
            v-if="record.auth_area['web/withdraw/confirm']"
            @click="withdrawConfirm(record.id)"
          >
            通过
          </a>
          <a
            v-if="record.auth_area['web/withdraw/reject']"
            v-modal-link="{
              name: 'distribution-withdraw-reject',
              props: {
                id: record.id
              },
              on: { done: getWithdrawList }
            }"
          >
            驳回
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './withdraw#config'
import { getWithdrawList, withdrawConfirm } from '@/api/withdraw'
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
    getWithdrawList() {
      return getWithdrawList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
      })
    }
  },
  created() {
    this.getWithdrawList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getWithdrawList()
    }
  },
  computed: {
    tableOptions
  },
  methods: {
    withdrawConfirm(id) {
      this.$confirm({
        title: '是否通过申请？',
        content: '审核前请先完成线下打款',
        onOk: () => {
          return withdrawConfirm({ id: id }).then(res => {
            this.$message.success('通过申请')
            this.getWithdrawList()
          })
        }
      })
    }
  }
}
</script>
