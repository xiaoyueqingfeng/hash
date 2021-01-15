<template>
  <oa-modal v-model="show" title="停店" :width="900" @ok="onSubmit">
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>客户ID：</span>
        <span>{{ leadsInfo.leads_id }}</span>
      </a-col>
      <a-col :span="8">
        <span>客户名称：</span>
        <span>{{ leadsInfo.brand_name }}</span>
      </a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>当前系统：</span>
        <span>{{ leadsInfo.saas_type }}</span>
      </a-col>
      <a-col :span="8">
        <span>当前版本：</span>
        <span>{{ leadsInfo.system_version_name }}</span>
      </a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>门店数：</span>
        <span>{{ leadsInfo.shop_count }}家</span>
      </a-col>
      <a-col :span="8">
        <span>已创建门店数：</span>
        <span>{{ leadsInfo.created_shop_count }}家</span>
      </a-col>
      <a-col :span="8">
        <span>未创建门店数：</span>
        <span>{{ leadsInfo.unopened_shop_count }}家</span>
      </a-col>
    </a-row>
    <oa-hr />
    <oa-alert-intro class="mg-t16 mg-b16">
      <a-icon type="info-circle" />
      已选择
      <a>{{ selectedRowKeys.length }}</a>
      家门店
    </oa-alert-intro>
    <oa-table
      rowKey="brand_buy_shop_id"
      :columns="columns"
      :dataSource="shopList"
      :rowSelection="{
        selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      :pagination="false"
    >
      <template slot="shop_status" slot-scope="text, record">
        <span>
          <a-badge
            :status="
              record.shop_status === 1
                ? 'success'
                : record.shop_status === 4
                ? 'error'
                : record.shop_status === 3
                ? 'processing'
                : record.shop_status === 2
                ? 'warning'
                : ''
            "
          />
          {{ record.status_desc }}
        </span>
      </template>
      <template slot="remain_days" slot-scope="text, record">
        <span class="error-text">{{ record.remain_days }}天</span>
      </template>
    </oa-table>
    <a-form :form="form" class="mg-t16">
      <a-form-item v-bind="formCol" label="退款金额:">
        <a-input
          min="0"
          max="999999.99"
          type="number"
          step="0.01"
          addonAfter="元"
          v-decorator="decorators.refund_money"
        ></a-input>
      </a-form-item>
      <a-form-item v-bind="formCol" label="备注:">
        <a-textarea
          v-decorator="decorators.remark"
          placeholder="请输入备注信息"
          rows="3"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import tableMixins from 'oa-core/mixins/table'
import { columns, rules } from './stop-shop#config'
import { shopStop, shopAllShop } from '@/api/shop'
import { stopBrandInfo } from '@/api/leads'
import { get } from 'lodash-es'
export default {
  mixins: [tableMixins],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: false,
      leadsInfo: {},
      shopList: [],
      form,
      decorators,
      formCol: {
        'label-col': { span: 3 },
        'wrapper-col': { span: 12 }
      }
    }
  },
  props: {
    customerId: {
      type: [String, Number],
      default: ''
    }
  },
  async: {
    stopBrandInfo() {
      return stopBrandInfo({ leads_id: this.customerId }).then(res => {
        this.leadsInfo = get(res, 'info', {})
      })
    },
    getShopList() {
      return shopAllShop({ leads_id: this.customerId }).then(res => {
        this.shopList = get(res, 'list', [])
      })
    },
    stopShop(data) {
      return shopStop(data)
    }
  },
  created() {
    this.stopBrandInfo()
    this.getShopList()
  },
  computed: {
    columns,
    rules
  },
  methods: {
    onSubmit() {
      if (!this.selectedRowKeys.length) {
        return this.$message.error('请选择门店')
      }
      this.form.validate().then(values => {
        this.stopShop({
          leads_id: this.customerId,
          brand_buy_shop_ids: this.selectedRowKeys,
          ...values
        }).then(res => {
          this.show = false
          this.$message.success('系统停用提交成功')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
