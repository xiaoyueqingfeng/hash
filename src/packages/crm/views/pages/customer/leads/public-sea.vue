<template>
  <div class="public-sea">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.keywords"
        enterButton
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

      <crm-channel-picker
        :level1.sync="$searchQuery.channel_level1_id"
        :level2.sync="$searchQuery.channel_level2_id"
      ></crm-channel-picker>

      <oa-select
        placeholder="选择运营模式"
        v-model="$searchQuery.work_model"
        :options="selects.work_model"
      ></oa-select>

      <oa-cascader
        placeholder="掉入公海原因"
        change-on-select
        v-model="$searchQuery.throw_reason_id"
        :options="selects.throw_reason"
      ></oa-cascader>

      <oa-date-range-filter
        :placeholder="['创建时间开始', '创建时间结束']"
        :start.sync="$searchQuery.created_time_start"
        :end.sync="$searchQuery.created_time_end"
      ></oa-date-range-filter>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/leads/delete']"
          v-modal-link="{
            name: 'customer-delete',
            props: {
              from: 'leads',
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
      :scroll="{ x: 1440 }"
      :columns="tableOptions.columns"
      :rowSelection="{ selectedRowKeys, onChange: tbOnSelectionChange }"
      rowKey="id"
      :loading="getLeadsPublicList$loading"
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
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/leads/receive']"
            v-modal-link="{
              name: 'customer-receive',
              props: {
                from: 'leads',
                customerId: record.id,
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            领取
          </a>
          <a
            v-if="record.auth_area['web/leads/delete']"
            v-modal-link="{
              name: 'customer-delete',
              props: {
                from: 'leads',
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
import { getLeadsPublicList } from '@/api/leads'
import { tableOptions } from './public-sea#config'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      customerList: [],

      selects: {
        work_model: [],
        throw_reason: []
      },
      total: 0,
      auth_area: {},

      isExpand: false,
      pager: {
        p: 1,
        ps: 20
      },
      userStatus: 'all' //全部员工
    }
  },
  watch: {
    $route(newRoute) {
      this.getLeadsPublicList()
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
      return Promise.all([this.getLeadsPublicList()])
    },
    getLeadsPublicList() {
      return getLeadsPublicList(this.$searchQuery).then(res => {
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
      this.getLeadsPublicList().then(res => {
        this.tbOnSelectionReset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.public-sea {
}
</style>
