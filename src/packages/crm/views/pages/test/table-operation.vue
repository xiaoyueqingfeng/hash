<template>
  <div class="pay-list">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        enterButton
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        placeholder="搜索客户id、客户姓名、联系人电话"
      ></a-input-search>
      <template slot="actions">
        <oa-button @click="onSearch" type="primary">查询</oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
      <oa-select
        placeholder="选择运营模式"
        v-model="$searchQuery.work_model"
        :options="selects.work_model"
      ></oa-select>
      <a-select
        style="width:200px"
        placeholder="选择系统版本"
        v-model="$searchQuery.system_version_id"
      >
        <a-select-option
          v-for="item in selects.system_version"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <crm-sale-picker
        v-model="$searchQuery.sale_id"
        :type="1"
        placeholder="选择跟进销售"
      />
      <crm-sale-picker
        v-model="$searchQuery.hardware_sale_id"
        :type="3"
        placeholder="选择跟进硬件销售"
      />
      <crm-sale-picker
        v-model="$searchQuery.server_operate_id"
        :type="6"
        placeholder="选择跟进客运"
      />
      <crm-sale-picker
        v-model="$searchQuery.server_renewal_id"
        :type="7"
        placeholder="选择跟进客续"
      />
      <crm-sale-picker
        v-model="$searchQuery.tel_sale_id"
        :type="11"
        placeholder="选择跟进电销"
      />
      <crm-region-picker
        :province-id.sync="$searchQuery.province_id"
        :city-id.sync="$searchQuery.city_id"
      ></crm-region-picker>
      <oa-select
        placeholder="选择商服分级"
        v-model="$searchQuery.server_level"
        :options="selects.server_level"
      ></oa-select>
      <a-select
        placeholder="选择签约状态"
        v-model="$searchQuery.sign_contract_status"
        allowClear
      >
        <a-select-option :value="1">系统到期客保中</a-select-option>
        <a-select-option :value="2">已购买硬件</a-select-option>
        <a-select-option :value="3">未购买硬件</a-select-option>
        <a-select-option :value="4">已续约</a-select-option>
        <a-select-option :value="5">未续约</a-select-option>
      </a-select>
      <a-select
        placeholder="系统是否开通"
        v-model="$searchQuery.new_sign_status"
      >
        <a-select-option v-for="item in selects.new_sign_status" :key="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>

      <crm-tag-picker
        v-model="$searchQuery.tag"
        :options="selects.tag_type"
      ></crm-tag-picker>

      <oa-date-range-filter
        :start.sync="$searchQuery.system_open_time_start"
        :end.sync="$searchQuery.system_open_time_end"
        :placeholder="['系统开通开始时间', '系统开通结束时间']"
      ></oa-date-range-filter>

      <oa-date-range-filter
        :start.sync="$searchQuery.system_expired_time_start"
        :end.sync="$searchQuery.system_expired_time_end"
        :disabledDate="systemDisabledDate"
        :placeholder="['系统到期开始时间', '系统到期结束时间']"
      ></oa-date-range-filter>
      <oa-date-range-filter
        :start.sync="$searchQuery.recently_service_record_start_time"
        :end.sync="$searchQuery.recently_service_record_end_time"
        :disabledDate="systemDisabledDate"
        :placeholder="['最近服务开始时间', '最近服务结束时间']"
      ></oa-date-range-filter>
      <a-input
        type="number"
        :min="1"
        :max="9999"
        class="mg-r8"
        style="width:200px;"
        v-model="$searchQuery.last_login_time_min"
        placeholder="超过多少天未登录"
      ></a-input>
      <a-input
        type="number"
        :min="1"
        :max="9999"
        class="mg-r8"
        style="width:200px;"
        v-model="$searchQuery.hardware_assign_day"
        placeholder="首次分配硬件销售超过多少天"
      ></a-input>
      <a-input
        type="number"
        :min="1"
        :max="9999"
        v-model="$searchQuery.continue_login_day_min"
        class="mg-r8"
        style="width:200px;"
        placeholder="连续登录天数范围开始"
      ></a-input>
      <a-input
        type="number"
        :min="1"
        :max="9999"
        style="width:200px"
        v-model="$searchQuery.continue_login_day_max"
        placeholder="连续登录天数范围结束"
      ></a-input>
    </oa-filter-box>
    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="tbIsSelected && auth_area['web/pay/assign_sale']"
          v-modal-link="{
            name: 'customer-assign-sale',
            props: {
              from: 'pay',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配销售
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/pay/assign_tel_sale']"
          v-modal-link="{
            name: 'customer-assign-tel-sale',
            props: {
              from: 'pay',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配电销
        </a>
        <a
          v-if="
            tbIsSelected && auth_area['web/pay/assign_custom_operation_server']
          "
          v-modal-link="{
            name: 'customer-assign-server',
            props: {
              from: 'pay',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配客运
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/pay/assign_custom_renew_server']"
          v-modal-link="{
            name: 'customer-assign-renew-server',
            props: {
              from: 'pay',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配客续
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/pay/assign_hardware_sale']"
          v-modal-link="{
            name: 'customer-assign-hardware',
            props: {
              from: 'pay',
              customerIds: selectedRowKeys,
              customerNames: selectedRowCustomerNames
            },
            on: { done: onModalDone }
          }"
        >
          分配硬件销售
        </a>
        <a
          v-if="tbIsSelected && auth_area['web/pay/batch_unbind_hardware']"
          v-modal-link="{
            name: 'customer-unbind-hardware',
            props: {
              type: 'batch',
              customerIds: selectedRowKeys
            },
            on: { done: onModalDone }
          }"
        >
          解绑硬件销售
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
      :loading="getPayList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="customerList"
      :showFullScreen="false"
      :scroll="{ x: tableScrollX }"
      ref="tableCon"
    >
      <template slot="detail" slot-scope="text, record">
        <div class="listDetail">
          <oa-overflow-text maxWidth="10em" :title="record.brand_name">
            <a
              v-modal-link="{
                name: 'customer-detail',
                props: { leadsId: record.id, visible: true }
              }"
            >
              {{ record.brand_name }}
            </a>
          </oa-overflow-text>
          <span v-if="record.auth_area['web/pay/contact_list']">
            <a-popover
              title=""
              trigger="hover"
              placement="bottomLeft"
              @visibleChange="e => handleHoverChange(record, e)"
            >
              <div slot="content" class="contactTable">
                <oa-table
                  rowKey="id"
                  :loading="getContactList$loading"
                  :columns="contactTableOptions"
                  :dataSource="contactDataCachedData[record.id]"
                  :pagination="false"
                  :showFullScreen="false"
                >
                  <template slot="name" slot-scope="main">
                    <span class="mg-r8">{{ main.name }}</span>
                    <oa-tag type="kp-type" :value="1" />
                  </template>
                  <template slot="mobile" slot-scope="main">
                    <span class="mg-r8">{{ main.mobile }}</span>
                    <crm-call
                      :leads_id="record.id"
                      :contact_id="main.id"
                      :callNumber="main.mobile"
                      customerType="13"
                    ></crm-call>
                  </template>
                </oa-table>
              </div>
              <div class="mg-r8">
                <oa-icon type="shoujibeifen" />
              </div>
            </a-popover>
          </span>
        </div>
      </template>
      <template slot="system_expired_time" slot-scope="text, record">
        {{ record.system_expired_time }}
        <a-tooltip
          v-if="record.expired_status"
          :title="record.expired_status"
          placement="bottom"
        >
          <span class="warn-tooltip">
            <oa-icon type="anticon:exclamation-circle" />
          </span>
        </a-tooltip>
      </template>
      <template slot="brand_tag" slot-scope="record">
        <oa-tag
          class="mg-r8"
          v-for="item in record.brand_tag"
          :key="item.id"
          type="brand-tag"
          :value="item.id"
        />
        <oa-tag class="mg-r8" type="vip-type" :value="record.vip_type" />
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/leads/edit']"
            v-modal-link="{
              name: 'customer-edit',
              props: { editInfo: record },
              on: { done: onModalDone }
            }"
          >
            编辑
          </a>
          <a
            v-if="record.auth_area['web/pay/assign_sale']"
            v-modal-link="{
              name: 'customer-assign-sale',
              props: {
                from: 'pay',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配销售
          </a>
          <a
            v-if="record.auth_area['web/pay/assign_tel_sale']"
            v-modal-link="{
              name: 'customer-assign-tel-sale',
              props: {
                from: 'pay',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配电销
          </a>
          <a
            v-if="record.auth_area['web/pay/assign_custom_operation_server']"
            v-modal-link="{
              name: 'customer-assign-server',
              props: {
                from: 'pay',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配客运
          </a>
          <a
            v-if="record.auth_area['web/pay/assign_custom_renew_server']"
            v-modal-link="{
              name: 'customer-assign-renew-server',
              props: {
                from: 'pay',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配客续
          </a>
          <a
            v-if="record.auth_area['web/pay/assign_hardware_sale']"
            v-modal-link="{
              name: 'customer-assign-hardware',
              props: {
                from: 'pay',
                customerIds: [record.id],
                customerNames: [record.brand_name]
              },
              on: { done: onModalDone }
            }"
          >
            分配硬件销售
          </a>
          <a
            v-if="record.auth_area['web/pay/set_user_tag']"
            v-modal-link="{
              name: 'customer-tag',
              props: {
                customerId: record.id,
                customerName: record.brand_name,
                from: 'pay'
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
        </oa-table-actions>
      </template>
      <crm-custom-action-title slot="actionTitle"></crm-custom-action-title>
      <!-- <span slot="actionTitle">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" href="#">
            操作
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a href="javascript:;" @click="handleOpenFilter">设置显示字段</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="javascript:;" @click="handleTableFix">表格最大化</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span> -->
    </oa-table>
  </div>
</template>
<script>
import { getPayList, getContactList } from '@/api/pay'
import { tableOptions, contactTableOptions } from './list#config'
import { get, pick } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import tableCustom from '@/mixins/tableCustom'
import tableScroll from '@/mixins/tableScroll'
export default {
  mixins: [tableMixins, tableCustom, tableScroll],
  data() {
    return {
      customerList: [],
      selects: {
        work_model: [],
        server_level: [],
        new_sign_status: [],
        system_version: [],
        tag_type: []
      },
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },

      isExpand: false,

      contactDataCachedData: {},
      contactTableOptions: contactTableOptions,
      tableColumns: tableOptions
    }
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getPayList()
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
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getPayList()])
    },
    getPayList() {
      return getPayList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.server_level = res.server_level
        this.selects.new_sign_status = res.new_sign_status
        this.selects.system_version = res.system_version
        this.selects.tag_type = res.tag_type
        this.auth_area = res.auth_area
        this.customerList = res.list
        this.pager = res.pager
        this.handleTableResize()
      })
    },
    getContactList(leads_id) {
      return getContactList({
        leads_id
      }).then(res => {
        this.contactDataCachedData[leads_id] = Array.isArray(res) ? res : []
        return this.contactDataCachedData[leads_id]
      })
    }
  },
  methods: {
    systemDisabledDate(current) {
      return false
    },
    onSearch() {
      if (
        this.$searchQuery.continue_login_day_min >
        this.$searchQuery.continue_login_day_max
      ) {
        this.$message.error('连续登录天数范围开始不能大于结束')
        return
      }
      this.tbOnFilterSearch()
    },
    onModalDone() {
      this.tbOnSelectionReset()
      this.getPayList()
    },
    async handleHoverChange(record, e) {
      if (!e) return
      let current = get(this.contactDataCachedData, record.id)
      if (current) return current
      else return await this.getContactList(record.id)
    },
    handleOpenFilter() {
      this.$modalRouter.push({
        name: 'system-table-columns-set',
        on: {
          done: this.init
        }
      })
    }
  }
}
</script>
<style lang="less">
// .ant-table td {
//   white-space: nowrap;
// }
</style>
<style lang="less" scoped>
.pay-list {
}
.contact-icon {
  .mg-l(8px);
}
.warn-tooltip {
  .c(#f5222d);
  .mg-l(8px);
  .cur-p;
}
.listDetail {
  display: flex;
  justify-content: space-between;
}
</style>
