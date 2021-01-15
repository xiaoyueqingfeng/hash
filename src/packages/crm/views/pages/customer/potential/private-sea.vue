<template>
  <div class="potential-private-sea">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        enterButton
        placeholder="搜索客户id、客户姓名、联系人电话"
      ></a-input-search>

      <template slot="actions">
        <oa-button @click="onSearch" type="primary">查询</oa-button>
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

      <oa-select
        :options="selects.work_model"
        v-model="$searchQuery.work_model"
        placeholder="选择运营模式"
      ></oa-select>

      <oa-select
        :options="selects.brand_level"
        v-model="$searchQuery.brand_level"
        placeholder="选择用户等级"
      ></oa-select>

      <crm-tag-picker
        v-model="$searchQuery.tag"
        :options="selects.tag_type"
      ></crm-tag-picker>

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
      <a-input
        type="number"
        :min="0"
        :max="99"
        v-model="$searchQuery.become_order_protect_time_min"
        style="width:200px;margin-right:8px"
        placeholder="保护期剩余天数下限"
      ></a-input>
      <a-input
        type="number"
        :min="0"
        :max="99"
        style="width:200px"
        v-model="$searchQuery.become_order_protect_time_max"
        placeholder="保护期剩余天数上限"
      ></a-input>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/potential/assign_tel_sale']"
          v-modal-link="{
            name: 'customer-assign-tel-sale',
            props: {
              from: 'potential',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配电销
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/potential/assign_sale']"
          v-modal-link="{
            name: 'customer-assign-sale',
            props: {
              from: 'potential',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配销售
        </a>
      </span>
    </oa-alert-intro>

    <oa-table
      class="mg-t16"
      :columns="columns"
      :rowSelection="{
        selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      rowKey="id"
      ref="tableCon"
      :scroll="{ x: 1200 }"
      :loading="getPotentialPrivateList$loading"
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

      <span slot="protectTitle">
        剩余保护天数
        <a-tooltip placement="topLeft">
          <a-icon type="question-circle"></a-icon>
          <template slot="title">
            <span>
              超过7天未填写拜访记录，超过15天未上门拜访，超过45天未签约会掉入公海，若剩余保护天数为0
              表示过了今天该客户将会掉入公海
            </span>
          </template>
        </a-tooltip>
      </span>

      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/leads/edit']"
            v-modal-link="{
              name: 'customer-edit',
              props: { editInfo: record },
              on: { done: getPotentialPrivateList }
            }"
          >
            编辑
          </a>
          <a
            v-if="record.auth_area['web/potential/assign_tel_sale']"
            v-modal-link="{
              name: 'customer-assign-tel-sale',
              props: {
                from: 'potential',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配电销
          </a>
          <a
            v-if="record.auth_area['web/potential/assign_sale']"
            v-modal-link="{
              name: 'customer-assign-sale',
              props: {
                from: 'potential',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配销售
          </a>
          <a
            v-if="record.auth_area['web/potential/give_up']"
            v-modal-link="{
              name: 'customer-give-up',
              props: {
                from: 'potential',
                customerId: record.id,
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            放弃
          </a>

          <a
            v-if="record.auth_area['web/potential/translate_normal_sale']"
            v-modal-link="{
              name: 'customer-turn-sale',
              props: {
                customerIds: [record.id],
                customerName: record.brand_name,
                from: 'potential'
              },
              on: { done: onModalDone }
            }"
          >
            转面销
          </a>
          <a
            v-if="record.auth_area['web/potential/translate_public_sea']"
            v-modal-link="{
              name: 'customer-turn-public',
              props: {
                customerIds: [record.id],
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            转公海
          </a>

          <a
            v-if="record.auth_area['web/potential/translate_manager']"
            v-modal-link="{
              name: 'customer-turn-manager',
              props: {
                customerIds: [record.id],
                customerName: record.brand_name
              },
              on: { done: onModalDone }
            }"
          >
            转主管
          </a>

          <a
            v-if="record.auth_area['web/potential/set_user_tag']"
            v-modal-link="{
              name: 'customer-tag',
              props: {
                customerId: record.id,
                customerName: record.brand_name,
                from: 'potential'
              },
              on: { done: onModalDone }
            }"
          >
            修改等级
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
            v-if="record.auth_area['web/potential/change_work_model']"
            v-modal-link="{
              name: 'customer-mode-change',
              props: { leads_id: record.id },
              on: { done: onModalDone }
            }"
          >
            变更运营模式
          </a>
          <a
            v-if="record.auth_area['web/potential/edit']"
            v-modal-link="{
              name: 'customer-name-change',
              props: { leads_id: record.id },
              on: { done: onModalDone }
            }"
          >
            修改客户名称
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { getPotentialPrivateList } from '@/api/potential'
import { tableOptions } from './private-sea#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import tableCustom from '@/mixins/tableCustom'
export default {
  mixins: [tableMixins, tableCustom],
  data() {
    return {
      customerList: [],
      selects: {
        work_model: [],
        brand_level: [],
        tag_type: []
      },
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },
      isExpand: false,
      tableColumns: tableOptions
    }
  },
  watch: {
    $route(newRoute) {
      this.getPotentialPrivateList()
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
    this.getPotentialPrivateList()
  },
  async: {
    getPotentialPrivateList() {
      return getPotentialPrivateList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.brand_level = res.brand_level
        this.selects.tag_type = get(res, 'tag_type', [])
        this.customerList = Object.freeze(res.list)
        this.auth_area = res.auth_area
        this.pager = res.pager
      })
    }
  },
  methods: {
    onSearch() {
      if (
        this.$searchQuery.become_order_protect_time_min >
        this.$searchQuery.become_order_protect_time_max
      ) {
        this.$message.error('保护期剩余天数下限不能大于上限')
        return
      }
      this.tbOnFilterSearch()
    },
    onModalDone() {
      this.getPotentialPrivateList().then(res => {
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
