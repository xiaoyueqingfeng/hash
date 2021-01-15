<template>
  <oa-panel app>
    <oa-select
      class="mg-r16"
      placeholder="请选择状态"
      @change="tbOnSearchKeywords('status', $event)"
      :options="mapping.status"
      v-model="$searchQuery.status"
    ></oa-select>
    <a-input-search
      enterButton
      placeholder="搜索品牌名、品牌id、超管手机号"
      v-model="$searchQuery.search"
      style="width: 300px"
      @search="tbOnSearchKeywords('search', $event)"
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
      <template slot="status_name" slot-scope="text, record">
        {{ text }}
        <a-popover v-if="record.status == 2" placement="top">
          <a-icon type="question-circle" />
          <template slot="title">
            <span>驳回原因</span>
          </template>
          <template slot="content">
            <span>{{ record.reason }}</span>
          </template>
        </a-popover>
      </template>
      <template slot="action" slot-scope="text, record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/platform-applet/withdraw-detail']"
            v-modal-link="{
              name: 'platform-withdraw-detail',
              props: { id: record.id }
            }"
          >
            详情
          </a>
          <a
            v-if="record.auth_area['web/platform-applet/withdraw-pass']"
            v-modal-link="{
              name: 'platform-withdraw-confirm',
              props: { id: record.id },
              on: {
                done: onConfirmDone
              }
            }"
          >
            通过
          </a>
          <a
            v-if="record.auth_area['web/platform-applet/withdraw-reject']"
            v-modal-link="{
              name: 'platform-withdraw-reject',
              props: { id: record.id },
              on: {
                done: onRejectDone
              }
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
import { tableOptions } from './list#config'
import { getWithdrawList } from '@/api/platform'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      mapping: {
        stauts: []
      },
      dataSource: [],
      pager: {}
    }
  },
  async: {
    getWithdrawList() {
      return getWithdrawList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
        this.mapping = get(res, 'mapping')
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
    onConfirmDone() {
      this.$message.success('提现申请已通过')
      this.getWithdrawList()
    },
    onRejectDone() {
      this.$message.success('提现申请已驳回')
      this.getWithdrawList()
    }
  }
}
</script>
