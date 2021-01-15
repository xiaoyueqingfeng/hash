<template>
  <oa-modal title="系统服务" v-model="show" :width="1200" :footer="null">
    <a-row>
      <a-input-search
        class="mg-b16"
        placeholder="请输入客户ID"
        @search="onSearch"
        enterButton="搜索"
      />
      <oa-table
        :loading="getSystemServiceList$loading"
        :columns="columns"
        :dataSource="DataSource"
        :pagination="false"
        :showFullScreen="false"
        rowKey="id"
      >
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-if="record.auth_area['web/potential/new_sign']"
              @click="newSign(record.id, 'saas1.0')"
            >
              新签Saas1.0
            </a>
            <a
              v-if="record.auth_area['web/potential/new_sign']"
              @click="newSign(record.id, 'saas2.0')"
            >
              新签Saas2.0
            </a>
            <a
              v-if="record.auth_area['web/potential/change_work_model']"
              v-modal-link="{
                name: 'customer-mode-change',
                props: { leads_id: record.id }
              }"
            >
              变更运营模式
            </a>
            <a
              v-if="record.auth_area['web/pay/hardware']"
              @click="hardwareSale(record.id)"
            >
              硬件售卖
            </a>
            <a
              v-if="record.auth_area['web/pay/renew_sign']"
              @click="renewSign(record.id)"
            >
              续签
            </a>
            <a
              v-if="record.auth_area['web/software/delay_system']"
              @click="delay(record.id, record.system_type)"
            >
              延期
            </a>
            <a
              v-if="record.auth_area['web/software/buy_more']"
              @click="buyMore(record.id)"
            >
              增购
            </a>
            <a
              v-if="record.auth_area['web/leads/frozen']"
              v-modal-link="{
                name: 'customer-freeze',
                props: { customerId: record.id }
              }"
            >
              系统冻结
            </a>
            <a
              v-if="record.auth_area['web/leads/unfrozen']"
              v-modal-link="{
                name: 'customer-unfreeze',
                props: { customerId: record.id }
              }"
            >
              取消冻结
            </a>
            <a
              v-if="record.auth_area['web/pay/refund']"
              v-modal-link="{
                name: 'customer-refund',
                props: { customerId: record.id }
              }"
            >
              停转店
            </a>
            <a
              v-if="record.auth_area['web/software/system_expired_edit']"
              v-modal-link="{
                name: 'customer-expired-edit',
                props: { customerId: record.id }
              }"
            >
              有效期修改
            </a>
            <a
              v-if="record.auth_area['web/shop/stop']"
              v-modal-link="{
                name: 'customer-stop-shop',
                props: { customerId: record.id }
              }"
            >
              停店
            </a>
            <a
              v-if="record.auth_area['web/pay/change_open_time']"
              v-modal-link="{
                name: 'customer-open-system',
                props: { id: record.id }
              }"
            >
              开通系统
            </a>
            <a
              v-if="record.auth_area['web/leads/change_admin_mobile']"
              v-modal-link="{
                name: 'customer-modify-phone',
                props: { id: record.id, customerName: record.name, from: 'pro' }
              }"
            >
              SaaS2.0 绑定手机号
            </a>
            <a
              v-if="record.auth_area['web/leads/change_saas1_admin_mobile']"
              v-modal-link="{
                name: 'customer-modify-phone',
                props: {
                  id: record.id,
                  customerName: record.name,
                  from: 'sass1'
                }
              }"
            >
              SaaS1.0 修改手机号
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
      <div class="text-center mg-t16 mg-b16" v-if="DataSource.length > 0">
        <a-pagination
          simple
          :defaultCurrent="pager.p"
          :total="pager.t"
          :pageSize="pager.ps"
          @change="pageChange"
        />
      </div>
    </a-row>
  </oa-modal>
</template>
<script>
import { getSystemService } from '@/api/software'
import { columns } from './system-service#config'
import { get } from 'lodash-es'
export default {
  name: 'SystemService',
  data() {
    return {
      DataSource: [],
      show: false,
      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      },
      keywords: ''
    }
  },
  computed: {
    columns
  },
  created() {},
  async: {
    getSystemServiceList() {
      if (!this.keywords) {
        return
      }
      return getSystemService({
        leads_id: this.keywords,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.DataSource = get(res, 'list', [])
        this.pager = get(res, 'pager', {})
      })
    }
  },
  methods: {
    // TODO 省份城市处理
    pageChange(p) {
      this.pager.p = p
      this.getSystemServiceList()
    },
    onSearch(value) {
      this.keywords = value
      this.getSystemServiceList()
    },
    //新签
    newSign(id, saasVersion) {
      this.show = false
      let saasValue
      switch (saasVersion) {
        case 'saas1.0':
          saasValue = 1
          break
        case 'saas2.0':
          saasValue = 2
          break
      }
      this.$router.push({
        name: 'customer-new-sign-index',
        query: { customer_id: id, system_type: saasValue }
      })
    },
    //硬件售卖
    hardwareSale(id) {
      this.show = false
      this.$router.push({
        name: 'customer-hardware-sell',
        query: { customer_id: id }
      })
    },
    //续签
    renewSign(id) {
      this.show = false
      this.$router.push({
        name: 'customer-renew-index',
        query: { customer_id: id }
      })
    },
    //延期
    delay(id, system_type) {
      if (system_type === '1') {
        //saas1.0
        this.$modalRouter.push({
          name: 'saas1-delay-config',
          props: { leads_id: id }
        })
      } else if (system_type === '2') {
        //saas2.0
        this.$modalRouter.push({
          name: 'saas2-delay-config',
          props: { leads_id: id }
        })
      }
    },
    //增购
    buyMore(id) {
      this.show = false
      this.$router.push({
        name: 'customer-increase-purchase-index',
        query: { leads_id: id }
      })
    }
  }
}
</script>
