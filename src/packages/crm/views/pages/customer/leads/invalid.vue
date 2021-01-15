<template>
  <div class="invalid-sea">
    <oa-filter-box mode="search">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        enterButton
        placeholder="搜索客户id、客户姓名、联系人电话"
      ></a-input-search>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/leads/recovery']"
          v-modal-link="{
            name: 'customer-recovery',
            props: {
              from: 'leads',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          还原
        </a>
      </span>
    </oa-alert-intro>

    <oa-table
      class="mg-t16"
      :scroll="{ x: 1600 }"
      :columns="tableOptions.columns"
      :rowSelection="{
        selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      rowKey="id"
      :loading="getLeadsInvilidList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="customerList"
    >
      <template slot="detail" slot-scope="text, record">
        <crm-table-column-customer-name
          :record="record"
        ></crm-table-column-customer-name>
      </template>
      <span slot-scope="record" slot="channel">
        {{ record.channel_level1_name }} {{ record.channel_level2_name }}
      </span>
      <span slot-scope="record" slot="area">
        {{ record.province_name }} - {{ record.city_name }}
      </span>
      <div slot="action" slot-scope="record">
        <a
          v-if="record.auth_area['web/leads/recovery']"
          v-modal-link="{
            name: 'customer-recovery',
            props: {
              from: 'leads',
              customerIds: [record.id],
              customerNames: [record.brand_name]
            },
            on: { done: onModalDone }
          }"
        >
          还原
        </a>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { getLeadsInvilidList } from '@/api/leads'
import { tableOptions } from './invalid#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  mixins: [tableMixins],
  data() {
    return {
      customerList: [],
      selects: {},
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  watch: {
    $route(newRoute) {
      this.getLeadsInvilidList()
    }
  },
  computed: {
    tableOptions,
    selectedRowCustomerNames() {
      const names = this.customerList
        .filter(item => this.selectedRowKeys.includes(item.id))
        .map(item => item.brand_name)
      return names
    }
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getLeadsInvilidList()])
    },
    getLeadsInvilidList() {
      return getLeadsInvilidList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.throw_reason = res.throw_reason
        this.auth_area = res.auth_area
        this.customerList = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    onModalDone() {
      this.getLeadsInvilidList().then(res => {
        this.tbOnSelectionReset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.invalid-sea {
}
</style>
