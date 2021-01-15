<template>
  <div class="increase-purchase-stepone-tab-content">
    <a-form :form="form" @submit="nextStep">
      <div class="group">
        <span class="group_title">新增门店：</span>
        <a-radio-group name="radioGroup" v-model="is_buy_shop">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="add-store" v-if="is_buy_shop === 1">
        <a-form-item v-bind="formCol" label="门店数">
          <a-input
            placeholder="请输入门店数"
            id="success"
            type="number"
            min="0"
            addonAfter="个"
            v-decorator="decorators.shop_qty"
          />
        </a-form-item>
        <a-form-item
          v-bind="formCol"
          label="开通时长"
          v-if="sysInfo.system_type === '2'"
        >
          <a-input
            placeholder="请输入开通时长"
            id="success"
            type="number"
            min="1"
            v-decorator="decorators.shop_day_qty"
          >
            <a-select
              slot="addonAfter"
              style="width: 50px"
              v-model="shopOpenDateUnit"
            >
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formCol" label="金额">
          <a-input
            placeholder="请输入价格"
            id="success"
            type="number"
            min="0"
            step="0.01"
            addonAfter="元"
            v-decorator="decorators.shop_amount"
          />
        </a-form-item>
      </div>

      <div class="group" v-if="sysInfo.system_type === '1'">
        <span class="group_title">升级版本：</span>
        <a-radio-group name="radioGroup" v-model="is_renew_version">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div
        class="version"
        v-if="is_renew_version === 1 && sysInfo.system_type === '1'"
      >
        <a-form-item v-bind="formCol" label="当前版本">
          <a-checkbox defaultChecked disabled>
            {{ sysInfo.work_model_tip }}
          </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="formCol" label="选择版本">
          <oa-select
            :options="systemVersion"
            v-decorator="decorators.renew_version_id"
            placeholder="选择其他版本"
          />
        </a-form-item>
        <a-form-item v-bind="formCol" label="金额">
          <a-input
            id="success"
            type="number"
            :min="0"
            step="0.01"
            addonAfter="元"
            placeholder="请输入价格"
            v-decorator="decorators.renew_version_amount"
          />
        </a-form-item>
      </div>

      <template v-if="sysInfo.system_type === '2'">
        <div class="group">
          <span class="group_title">购买模块：</span>
          <a-radio-group name="radioGroup" v-model="is_buy_module">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </div>
        <div class="buy_module" v-if="is_buy_module">
          <a-form-item v-bind="formCol" label="模块">
            <oa-select
              mode="multiple"
              placeholder="请选择模块"
              :options="moduleList"
              v-decorator="decorators.module.module_id"
            />
          </a-form-item>
          <a-form-item v-bind="formCol" label="开通时长">
            <a-input
              placeholder="请输入开通时长"
              id="success"
              type="number"
              min="1"
              v-decorator="decorators.module.open_day"
            >
              <a-select
                slot="addonAfter"
                style="width: 50px"
                v-model="moduleOpenDateUnit"
              >
                <a-select-option value="year">年</a-select-option>
                <a-select-option value="day">日</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="formCol" label="金额">
            <a-input
              placeholder="请输入价格"
              id="success"
              type="number"
              min="0"
              step="0.01"
              addonAfter="元"
              v-decorator="decorators.module.amount"
            />
          </a-form-item>
        </div>
      </template>

      <div class="group">
        <span class="group_title">新增插件：</span>
        <a-radio-group name="radioGroup" v-model="is_buy_plugins">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="add-plugin" v-if="is_buy_plugins === 1">
        <a-form-item v-bind="formCol" label="选择插件">
          <oa-select
            mode="multiple"
            placeholder="请选择插件"
            :options="plugins"
            v-decorator="decorators.plugins_id"
          />
        </a-form-item>
        <a-form-item v-bind="formCol" label="开通时长">
          <a-input
            placeholder="请输入开通时长"
            id="success"
            type="number"
            min="1"
            v-decorator="decorators.plugins_day"
          >
            <a-select
              slot="addonAfter"
              style="width: 50px"
              v-model="pluginOpenDateUnit"
            >
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formCol" label="插件金额">
          <a-input
            placeholder="请输入价格"
            id="success"
            type="number"
            min="0"
            step="0.01"
            addonAfter="元"
            v-decorator="decorators.plugins_amount"
          />
        </a-form-item>
      </div>

      <div class="group">
        <span class="group_title">购买短信：</span>
        <a-radio-group name="radioGroup" v-model="is_buy_sms">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="sms" v-if="is_buy_sms === 1">
        <a-form-item v-bind="formCol" label="短信数量">
          <a-input
            placeholder="请输入短信数量"
            id="success"
            type="number"
            min="0"
            v-decorator="decorators.sms_qty"
          />
        </a-form-item>
        <a-form-item v-bind="formCol" label="金额">
          <a-input
            placeholder="请输入价格"
            id="success"
            type="number"
            min="0"
            step="0.01"
            addonAfter="元"
            v-decorator="decorators.sms_amount"
          />
        </a-form-item>
      </div>

      <div class="group">
        <span class="group_title">是否赠送：</span>
        <a-radio-group name="radioGroup" v-model="is_present">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="give-system mg-b24" v-if="is_present === 1">
        <a-form-item v-bind="formCol" label="系统赠送时长">
          <a-input
            id="success"
            type="number"
            min="1"
            v-decorator="['present.system_day']"
            placeholder="请输入赠送时长"
          >
            <a-select
              slot="addonAfter"
              style="width: 50px"
              v-model="giveDateUnit"
            >
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formCol" label="赠送插件">
          <oa-select
            mode="multiple"
            placeholder="请选择赠送插件"
            :options="plugins"
            v-decorator="['present.plugins_id']"
          />
        </a-form-item>
        <a-form-item v-bind="formCol" label="赠送插件时长">
          <a-input
            id="success"
            type="number"
            min="1"
            v-decorator="['present.plugins_day']"
            placeholder="请输入赠送插件时长"
          >
            <a-select
              slot="addonAfter"
              style="width: 50px"
              v-model="givePluginDateUnit"
            >
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formCol" label="赠送短信数量">
          <a-input-number
            placeholder="请输入短信数量"
            :min="0"
            v-decorator="['present.sms_qty']"
          />
          <span>
            <span class="unit">条</span>
          </span>
        </a-form-item>
        <template v-if="sysInfo.system_type === '2'">
          <a-form-item v-bind="formCol" label="赠送模块">
            <oa-select
              mode="multiple"
              placeholder="请选择赠送模块"
              :options="moduleList"
              v-decorator="decorators.present.module_id"
            />
          </a-form-item>
          <a-form-item v-bind="formCol" label="赠送模块时长">
            <a-input
              id="success"
              type="number"
              min="1"
              v-decorator="decorators.present.open_day"
              placeholder="请输入赠送模块时长"
            >
              <a-select
                slot="addonAfter"
                style="width: 50px"
                v-model="giveModuleDateUnit"
              >
                <a-select-option value="year">年</a-select-option>
                <a-select-option value="day">日</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </template>
      </div>
      <div class="btn-group">
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">下一步</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { stepOneRules } from './increase-purchase#step#config'
export default {
  data() {
    return {
      form: this.$stForm.create(),
      formCol: {
        'label-col': { xs: { span: 24 }, sm: { span: 7 } },
        'wrapper-col': { xs: { span: 24 }, sm: { span: 12 } }
      },
      shopOpenDateUnit: 'year',
      pluginOpenDateUnit: 'year',
      giveDateUnit: 'year',
      givePluginDateUnit: 'year',
      is_buy_shop: 0,
      is_renew_version: 0,
      is_buy_plugins: 0,
      is_buy_sms: 0,
      is_present: 0,
      is_buy_module: 0,
      moduleOpenDateUnit: 'year',
      giveModuleDateUnit: 'year'
    }
  },
  props: {
    sysInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    decorators() {
      return this.form.decorators(stepOneRules)
    },
    systemVersion() {
      return this.sysInfo.system_version || []
    },
    plugins() {
      return this.sysInfo.plugins || []
    },
    moduleList() {
      return this.sysInfo.moduleList || []
    }
  },
  methods: {
    formatDataform(formData) {
      formData.is_buy_shop = this.is_buy_shop
      formData.is_buy_plugins = this.is_buy_plugins
      formData.is_buy_sms = this.is_buy_sms
      formData.is_present = this.is_present
      if (this.sysInfo.system_type === '1') {
        formData.is_renew_version = this.is_renew_version
      }
      if (this.is_buy_shop && this.shopOpenDateUnit == 'year') {
        formData.shop_day_qty = formData.shop_day_qty * 365
      }
      if (this.is_buy_plugins === 1 && this.pluginOpenDateUnit === 'year') {
        formData.plugins_day = formData.plugins_day * 365
      }
      if (this.is_present === 1) {
        this.giveDateUnit === 'year' &&
          (formData.present.system_day = formData.present.system_day * 365)
      }
      if (this.is_present === 1) {
        this.givePluginDateUnit === 'year' &&
          (formData.present.plugins_day = formData.present.plugins_day * 365)
      }
      if (this.sysInfo.system_type === '1') {
        formData.shop_day_qty = 0
      }
      if (this.sysInfo.system_type === '2') {
        formData.is_buy_module = this.is_buy_module
        if (this.is_buy_module && this.moduleOpenDateUnit === 'year') {
          formData.module.open_day = formData.module.open_day * 365
        }
        if (this.is_present && this.giveModuleDateUnit === 'year') {
          formData.present.open_day = formData.present.open_day * 365
        }
      }
      return formData
    },
    nextStep(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        const form = this.formatDataform(cloneDeep(values))
        this.$emit('re-step', form)
        this.$emit('next-step', 1)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.increase-purchase-stepone-tab-content {
  .group {
    margin: 24px 0 18px 144px;
    &_title {
      margin-right: 8px;
    }
  }

  .add-store,
  .buy_module,
  .sms,
  .add-plugin,
  .give-system {
    width: 76%;
    background: rgba(245, 245, 245, 0.5);
    position: relative;
    left: 142px;
    padding: 24px;
    padding-left: 83px;
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
    .ant-input-number {
      width: 100%;
    }
  }
  .btn-group {
    margin-left: 96px;
  }
  .unit {
    display: inline-block;
    position: absolute;
    margin-left: 8px;
  }
}
</style>
