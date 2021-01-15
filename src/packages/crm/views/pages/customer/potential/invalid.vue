<template>
  <div class="invalid-sea">
    <oa-filter-box mode="search">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.keywords"
        enterButton
        @search="tbOnSearchKeywords('keywords', $event)"
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
          v-if="tbIsSelected && auth_area['web/potential/recovery']"
          v-modal-link="{
            name: 'customer-recovery',
            props: {
              from: 'potential',
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
      :scroll="{ x: 1440 }"
      :columns="tableOptions.columns"
      :rowSelection="{
        selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      rowKey="id"
      :loading="getPotentialInvilidList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="customerList"
    >
      <template slot="detail" slot-scope="text, record">
        <crm-table-column-customer-name
          :record="record"
        ></crm-table-column-customer-name>
      </template>
      <span slot-scope="record" slot="area">
        {{ record.province_name }} - {{ record.city_name }}
      </span>
      <div slot="action" slot-scope="record">
        <a
          v-if="record.auth_area['web/potential/recovery']"
          v-modal-link="{
            name: 'customer-recovery',
            props: {
              from: 'potential',
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
import { getPotentialInvilidList } from '@/api/potential'
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
      this.getPotentialInvilidList()
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
      return Promise.all([this.getPotentialInvilidList()])
    },
    getPotentialInvilidList() {
      return getPotentialInvilidList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.throw_reason = res.throw_reason
        this.customerList = res.list
        this.auth_area = res.auth_area
        this.pager = res.pager
      })
    }
  },
  methods: {
    onModalDone() {
      this.getPotentialInvilidList().then(res => {
        this.tbOnSelectionReset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.potential-invalid-sea {
}
</style>
