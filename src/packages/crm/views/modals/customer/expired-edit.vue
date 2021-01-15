<template>
  <oa-modal
    :width="800"
    v-model="show"
    title="调整有效期"
    @ok="onSubmit"
    :confirmLoading="systemExpiredEdit$loading"
  >
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>客户ID：</span>
        <span>{{ leadsInfo.id }}</span>
      </a-col>
      <a-col :span="8">
        <span>客户名称：</span>
        <span>{{ leadsInfo.name }}</span>
      </a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>当前系统：</span>
        <span>{{ leadsInfo.system_type_tip }}</span>
      </a-col>
      <a-col :span="8">
        <span>当前版本：</span>
        <span>{{ leadsInfo.system_version_id_tip }}</span>
      </a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="8">
        <span>门店数：</span>
        <span>{{ shopInfo.shop_num }}家</span>
      </a-col>
      <a-col :span="8">
        <span>已创建门店数：</span>
        <span>{{ shopInfo.open_shop_num }}家</span>
      </a-col>
      <a-col :span="8">
        <span>未创建门店数：</span>
        <span>{{ shopInfo.no_open_shop_num }}家</span>
      </a-col>
    </a-row>
    <oa-hr />
    <div class="title-tab">系统有效期</div>
    <oa-alert-intro class="mg-t16 mg-b16">
      <a-icon type="info-circle" />
      已选择
      <a>{{ selectedRowKeys.length }}</a>
      家门店
    </oa-alert-intro>
    <oa-table
      rowKey="id"
      :columns="columns"
      :dataSource="shopList"
      :rowSelection="{
        selectedRowKeys,
        onChange: selectionChange
      }"
      :pagination="false"
    >
      <template slot="remain_days" slot-scope="text, record">
        <span>{{ record.remain_days }}天</span>
      </template>
      <template slot="update_days" slot-scope="text, record">
        <span class="error-text">{{ record.update_days }}天</span>
      </template>
    </oa-table>
    <a-form :form="form" class="mg-t16">
      <a-form-item v-bind="formCol" label="系统到期时间:">
        <a-date-picker
          :disabledDate="disabledDate"
          @change="systemDateChange"
          v-decorator="decorators.system_expired_time"
        ></a-date-picker>
      </a-form-item>
      <a-form-item v-bind="formCol" label="备注:">
        <a-textarea
          v-decorator="decorators.remake"
          placeholder="请输入备注信息"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { systemExpiredEditForm, systemExpiredEdit } from '@/api/software'
import { get } from 'lodash-es'
import { columns, rules } from './expired-edit#config'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: false,
      leadsInfo: {},
      shopInfo: {},
      shopList: [],
      form,
      decorators,
      formCol: {
        'label-col': { span: 4 },
        'wrapper-col': { span: 14 }
      },
      selectedRowKeys: [],
      system_date: null
    }
  },
  props: {
    customerId: {
      type: [String, Number],
      required: true
    }
  },
  async: {
    systemExpiredEditForm() {
      return systemExpiredEditForm({
        leads_id: this.customerId
      }).then(res => {
        this.leadsInfo = get(res, 'leads_info', {})
        this.shopInfo = get(res, 'shop_info', {})
        this.shopList = get(res, 'shop_list', [])
        this.shopList.forEach(item => {
          item.update_days = 0
        })
      })
    },
    systemExpiredEdit(data) {
      return systemExpiredEdit(data)
    }
  },
  created() {
    this.systemExpiredEditForm()
  },
  computed: {
    columns,
    rules
  },
  methods: {
    selectionChange(keys, row) {
      this.selectedRowKeys = keys
      this.calcDiffDays()
    },
    systemDateChange(date, dateString) {
      this.system_date = dateString
      this.calcDiffDays()
    },
    disabledDate(current) {
      return current && current < moment()
    },
    onSubmit() {
      if (!this.selectedRowKeys.length) {
        return this.$message.error('请选择门店')
      }
      this.form.validate().then(values => {
        values.system_expired_time = values.system_expired_time.format(
          'YYYY-MM-DD'
        )
        this.systemExpiredEdit({
          leads_id: this.customerId,
          shop_id: this.selectedRowKeys,
          ...values
        }).then(res => {
          this.show = false
          this.$message.success('有效期调整提交成功')
        })
      })
    },
    calcDiffDays() {
      // 和产品后端沟通：原系统有效期具体到时分秒，半天时间忽略不计了，后端返回年月日时间，修改后的到期时间到23:59:59秒，所以按照粗略计算，选择的时间减去原时间
      this.shopList.forEach(shop => {
        shop.update_days = 0
        if (this.selectedRowKeys.length && this.system_date) {
          this.selectedRowKeys.forEach(id => {
            if (shop.id === id) {
              shop.update_days =
                (moment(this.system_date).valueOf() -
                  moment(shop.expire_time).valueOf()) /
                (3600 * 24 * 1000)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title-tab {
  width: 80px;
  text-align: center;
  line-height: 32px;
  color: @primary-color;
  border-bottom: 2px solid @primary-color;
}
.error-text {
  color: @error-color;
}
</style>
