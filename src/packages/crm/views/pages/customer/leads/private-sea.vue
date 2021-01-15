<template>
  <div class="leads-sea">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        placeholder="搜索客户id、客户姓名、联系人电话"
        enterButton
      ></a-input-search>

      <template slot="actions">
        <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
      <crm-organ-user-picker
        :organ-id.sync="$searchQuery.organ_id"
        :user-id.sync="$searchQuery.user_id"
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

      <crm-tag-picker
        v-model="$searchQuery.tag"
        :options="selects.tag_type"
      ></crm-tag-picker>

      <oa-select
        placeholder="请选择电销拜访状态"
        v-model="$searchQuery.tel_visit_status"
        :options="selects.tel_visit_status"
      ></oa-select>

      <oa-date-range-filter
        :placeholder="['创建时间开始', '创建时间结束']"
        :start.sync="$searchQuery.created_time_start"
        :end.sync="$searchQuery.created_time_end"
      ></oa-date-range-filter>
      <oa-date-range-filter
        :placeholder="['分配开始时间', '分配结束时间']"
        :start.sync="$searchQuery.protect_time_start"
        :end.sync="$searchQuery.protect_time_end"
      ></oa-date-range-filter>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/leads/assign_sale']"
          v-modal-link="{
            name: 'customer-assign-sale',
            props: {
              from: 'leads',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配销售
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/leads/assign_tel_sale']"
          v-modal-link="{
            name: 'customer-assign-tel-sale',
            props: {
              from: 'leads',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配电销
        </a>
      </span>
    </oa-alert-intro>

    <oa-table
      class="mg-t16"
      :columns="columns"
      :rowSelection="{ selectedRowKeys, onChange: tbOnSelectionChange }"
      ref="tableCon"
      rowKey="id"
      :scroll="{ x: 1200 }"
      :loading="getLeadsPrivateList$loading"
      :pager="pager"
      :dataSource="customerList"
      :authKey="authKey"
      @change="tbOnTableNoClearSelectChange"
      @resetTable="getUserFieldsForm"
    >
      <template slot="detail" slot-scope="text, record">
        <crm-table-column-customer-name
          :record="record"
          :hasPhoneCall="true"
        ></crm-table-column-customer-name>
      </template>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/leads/edit']"
            v-modal-link="{
              name: 'customer-edit',
              props: { editInfo: record },
              on: { done: getLeadsPrivateList }
            }"
          >
            编辑
          </a>
          <a
            v-if="record.auth_area['web/leads/translate']"
            v-modal-link="{
              name: 'customer-translate',
              props: { customerId: record.id, customerName: record.brand_name },
              on: { done: onModalDone }
            }"
          >
            转化
          </a>
          <a
            v-if="record.auth_area['web/tag/tag_set']"
            v-modal-link="{
              name: 'customer-set-tag',
              props: {
                customerId: record.id,
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            设置标签
          </a>
          <a
            v-if="record.auth_area['web/leads/assign_tel_sale']"
            v-modal-link="{
              name: 'customer-assign-tel-sale',
              props: {
                from: 'leads',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配电销
          </a>
          <a
            v-if="record.auth_area['web/leads/assign_sale']"
            v-modal-link="{
              name: 'customer-assign-sale',
              props: {
                from: 'leads',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配销售
          </a>
          <a
            v-if="record.auth_area['web/leads/give_up']"
            v-modal-link="{
              name: 'customer-give-up',
              props: {
                from: 'leads',
                customerId: record.id,
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            放弃
          </a>
          <a
            v-if="record.auth_area['web/leads/translate_normal_sale']"
            v-modal-link="{
              name: 'customer-turn-sale',
              props: {
                customerIds: [record.id],
                customerName: record.brand_name,
                from: 'leads'
              },
              on: { done: onModalDone }
            }"
          >
            转面销
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { getLeadsPrivateList } from '@/api/leads'
import { tableOptions } from './private-sea#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import tableCustom from '@/mixins/tableCustom'
export default {
  mixins: [tableMixins, tableCustom],
  data() {
    return {
      customerList: [],
      userList: [],
      channelList: [],
      selects: {
        work_model: [],
        tag_type: [],
        tel_visit_status: []
      },
      auth_area: {},
      total: 0,
      isExpand: false,
      pager: {
        p: 1,
        ps: 20
      },
      tableColumns: tableOptions
    }
  },
  watch: {
    $route(newRoute) {
      this.getLeadsPrivateList()
    }
  },
  computed: {
    selectedRowCustomerNames() {
      const names = this.customerList
        .filter(item => this.selectedRowKeys.includes(item.id))
        .map(item => item.brand_name)
      return names
    }
  },
  mounted() {
    this.getLeadsPrivateList()
  },
  async: {
    getLeadsPrivateList() {
      return getLeadsPrivateList(this.$searchQuery).then(res => {
        this.selects.work_model = get(res, 'work_model', [])
        this.selects.tag_type = get(res, 'tag_type', [])
        this.selects.tel_visit_status = get(res, 'tel_visit_status', [])
        this.customerList = Object.freeze(res.list)
        this.auth_area = res.auth_area
        this.pager = res.pager
      })
    }
  },
  methods: {
    onModalDone() {
      this.getLeadsPrivateList().then(res => {
        this.tbOnSelectionReset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.listDetail {
  display: flex;
  justify-content: space-between;
}
</style>
