<template>
  <oa-modal title="系统冻结" :width="900" v-model="show" :footer="null">
    <div class="step-one" v-show="step === 1">
      <a-row class="mg-b16">
        <a-col :span="8">
          <span>客户ID：</span>
          <span>{{ brandInfo.leads_id }}</span>
        </a-col>
        <a-col :span="8">
          <span>客户名称：</span>
          <span>{{ brandInfo.brand_name }}</span>
        </a-col>
      </a-row>
      <a-row class="mg-b16">
        <a-col :span="8">
          <span>当前系统：</span>
          <span>{{ brandInfo.saas_type }}</span>
        </a-col>
        <a-col :span="8">
          <span>当前版本：</span>
          <span>{{ brandInfo.system_version_name }}</span>
        </a-col>
      </a-row>
      <a-row class="mg-b16">
        <a-col :span="8">
          <span>门店数：</span>
          <span>{{ brandInfo.shop_count }}家</span>
        </a-col>
        <a-col :span="8">
          <span>已创建门店数：</span>
          <span>{{ brandInfo.created_shop_count }}家</span>
        </a-col>
        <a-col :span="8">
          <span>未创建门店数：</span>
          <span>{{ brandInfo.unopened_shop_count }}家</span>
        </a-col>
      </a-row>
      <div class="tip mg-b16" v-if="frozen_used_times">
        <oa-alert-intro>
          <a-icon class="tip-icon" type="info-circle" />
          <span class="tip-text">
            该品牌SaaS系统已使用冻结机会：{{
              frozen_used_times
            }}次，申请冻结累计天数：{{ frozen_total_days }}天。
          </span>
        </oa-alert-intro>
      </div>
      <div class="title-tab mg-b16">冻结品牌</div>
      <div class="info mg-b16">
        <span>品牌冻结期间，所有门店将无法使用SaaS系统！</span>
      </div>
      <a-form :form="form">
        <a-form-item
          label="冻结开始时间"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-date-picker
            :disabledDate="disabledDate"
            v-decorator="decorators.frozen_start_time"
          />
        </a-form-item>
        <a-form-item
          label="冻结天数"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            type="number"
            :min="1"
            :max="45"
            v-decorator="decorators.frozen_time"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-textarea
            minLength="5"
            maxLength="30"
            v-decorator="decorators.remark"
            placeholder="请输入备注信息，至少五个字符"
            :rows="3"
          />
        </a-form-item>
      </a-form>
      <div class="footer">
        <a-button class="mg-r8" type="default" @click="show = false">
          取消
        </a-button>
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </div>
    </div>
    <div class="step-two" v-show="step === 2">
      <div class="mg-b16">请确认以下信息是否有误</div>
      <oa-table
        rowKey="brand_buy_shop_id"
        :columns="columns"
        :dataSource="shopInfo"
        :pagination="false"
      >
        <template slot="frozen_time" slot-scope="text, record">
          <span class="error-text">{{ record.frozen_time }}天</span>
        </template>
        <template slot="margin_days" slot-scope="text, record">
          <span>{{ record.margin_days }}天</span>
        </template>
      </oa-table>
      <div class="mg-t16">注：品牌门店有效期变更后，立即生效</div>
      <div class="footer">
        <a-button class="mg-r8" type="default" @click="step = 1">
          上一步
        </a-button>
        <a-button type="primary" @click="onSubmit">确定</a-button>
      </div>
    </div>
  </oa-modal>
</template>
<script>
import { decorator, columns } from './freeze#config'
import { frozenBrandInfo, frozen } from '@/api/leads'
import { shopBuyList } from '@/api/shop'
import { get } from 'lodash-es'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(decorator)
    return {
      leads_id: null,
      show: false,
      step: 1,
      form,
      decorators,
      labelCol: { span: 3 },
      wrapperCol: { span: 12 },
      brandInfo: {},
      shopInfo: [],
      formData: {},
      frozen_used_times: 0,
      frozen_total_days: 0
    }
  },
  props: {
    customerId: {
      type: [String, Number],
      default: ''
    }
  },
  async: {
    getBrandInfo() {
      return frozenBrandInfo({ leads_id: this.customerId }).then(res => {
        this.brandInfo = get(res, 'info', {})
        this.frozen_used_times = get(res, 'frozen_used_times', 0)
        this.frozen_total_days = get(res, 'frozen_total_days', 0)
      })
    },
    getshopList() {
      return shopBuyList({ leads_id: this.customerId }).then(res => {
        this.shopInfo = get(res, 'list', [])
      })
    },
    frozen(data) {
      return frozen(data)
    }
  },
  created() {
    this.getBrandInfo()
    this.getshopList()
  },
  computed: {
    decorator,
    columns
  },
  methods: {
    disabledDate(current) {
      return current && current < moment()
    },
    nextStep() {
      this.form.validate().then(values => {
        this.step = 2
        this.formData = values
        this.formData.frozen_start_time = values.frozen_start_time.format(
          'YYYY-MM-DD'
        )
        this.shopInfo.forEach(item => {
          item.frozen_time = this.formData.frozen_time
          item.frozen_start_time = this.formData.frozen_start_time
        })
      })
    },
    onSubmit() {
      this.frozen({ leads_id: this.customerId, ...this.formData }).then(res => {
        this.show = false
        this.$message.success('系统冻结提交成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tip {
  &-icon {
    position: relative;
    top: 1px;
  }
}
.title-tab {
  width: 80px;
  line-height: 32px;
  text-align: center;
  color: @primary-color;
  border-bottom: 2px solid @primary-color;
}
.info {
  color: @error-color;
  padding-left: 16px;
}
.step-one,
.step-two {
  position: relative;
  padding-bottom: 32px;
}
.footer {
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: 0;
  background: white;
}
.error-text {
  color: @error-color;
}
</style>
