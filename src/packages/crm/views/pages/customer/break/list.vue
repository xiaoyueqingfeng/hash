<template>
  <div class="break-list">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        enterButton
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        placeholder="搜索客户id、客户姓名、联系人电话"
      ></a-input-search>

      <template slot="actions">
        <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
      <crm-organ-user-picker
        :organ-id.sync="$searchQuery.pre_organ_id"
        :user-id.sync="$searchQuery.pre_sale_id"
        :user-status="userStatus"
      ></crm-organ-user-picker>

      <crm-region-picker
        :province-id.sync="$searchQuery.province_id"
        :city-id.sync="$searchQuery.city_id"
      ></crm-region-picker>

      <oa-select
        placeholder="选择运营模式"
        v-model="$searchQuery.work_model"
        :options="selects.work_model"
      ></oa-select>

      <oa-select
        placeholder="选择用户等级"
        v-model="$searchQuery.brand_level"
        :options="selects.brand_level"
      ></oa-select>

      <!-- <oa-cascader
        placeholder="选择掉入公海原因"
        changeOnSelect
        :options="selects.throw_reason"
        v-model="$searchQuery.throw_reason_id"
      ></oa-cascader>-->

      <oa-date-range-filter
        :start.sync="$searchQuery.translate_time_start"
        :end.sync="$searchQuery.translate_time_end"
        :placeholder="['变成客户开始时间', '变成客户结束时间']"
      ></oa-date-range-filter>

      <oa-date-range-filter
        :start.sync="$searchQuery.last_visit_time_start"
        :end.sync="$searchQuery.last_visit_time_end"
        :placeholder="['最近拜访开始时间', '最近拜访结束时间']"
      ></oa-date-range-filter>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/potential/delete']"
          v-modal-link="{
            name: 'customer-delete',
            props: {
              from: 'potential',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          删除
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
      :loading="getBreakList$loading"
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
      <template slot="throw_reason" slot-scope="record">
        {{ record.throw_public_sea_remark }}
      </template>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/potential/receive']"
            v-modal-link="{
              name: 'customer-receive',
              props: {
                from: 'potential',
                customerId: record.id,
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            领取
          </a>
          <a
            v-if="record.auth_area['web/potential/delete']"
            v-modal-link="{
              name: 'customer-delete',
              props: {
                from: 'potential',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            删除
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { getBreakList } from '@/api/potential'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  mixins: [tableMixins],
  data() {
    return {
      customerList: [],
      selects: {
        work_model: [],
        brand_level: [],
        throw_reason: []
      },
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },

      isExpand: false,
      userStatus: 'all'
    }
  },
  watch: {
    $route(newRoute) {
      this.getBreakList()
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
      return Promise.all([this.getBreakList()])
    },
    getBreakList() {
      return getBreakList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.brand_level = res.brand_level
        this.selects.throw_reason = res.throw_reason
        this.auth_area = res.auth_area

        this.customerList = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    onModalDone() {
      this.getBreakList().then(res => {
        this.tbOnSelectionReset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.break-list {
}

.warn-tooltip {
  .c(#f5222d);
  .mg-l(8px);
  .cur-p;
}
</style>
