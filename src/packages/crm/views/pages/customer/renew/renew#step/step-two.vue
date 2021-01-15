<template>
  <div class="renew-steptwo-tab-content">
    <a-form :form="form" @submit="nextStep">
      <div class="group">
        <span class="group_title">新增门店：</span>
        <a-radio-group name="radioGroup" v-model="is_buy_shop">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>

      <div class="add-store" v-if="is_buy_shop === 1">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="门店数"
        >
          <a-input
            v-if="!limit"
            placeholder="请输入门店数"
            id="success"
            type="number"
            min="0"
            :disabled="limit"
            addonAfter="个"
            v-decorator="[
              'shop_qty',
              { rules: [{ required: true, message: '请输入门店数' }] }
            ]"
          />
          <a-input
            v-if="limit"
            placeholder="请输入价格"
            id="success"
            type="number"
            :min="0"
            :step="0.01"
            :disabled="limit"
            addonAfter="个"
          />
          <!-- <a-checkbox v-model="limit">不限</a-checkbox> -->
        </a-form-item>
        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="开通时长">
          <a-input
            placeholder="请输入时长"
            id="success"
            type="number"
            min="0"
            v-decorator="[
              'open_time',
              {rules: [{ required: true, message: '请输入开通时长' }]}
            ]">
            <a-select slot="addonAfter" v-model="openDateUnit" style="width: 50px">
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item> -->
        <a-form-item
          v-if="sysInfo.system_type === 2"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="开通时长"
        >
          <a-input
            placeholder="请输入时长"
            id="success"
            type="number"
            min="0"
            v-decorator="[
              'shop_day_qty',
              { rules: [{ required: true, message: '请输入开通时长' }] }
            ]"
          >
            <a-select
              slot="addonAfter"
              v-model="openDateUnit"
              style="width: 50px"
            >
              <a-select-option value="year">年</a-select-option>
              <a-select-option value="day">日</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="金额"
        >
          <a-input
            placeholder="请输入价格"
            id="success"
            type="number"
            :min="0"
            step="0.01"
            addonAfter="元"
            v-decorator="[
              'shop_amount',
              { rules: [{ required: true, message: '请输入金额' }] }
            ]"
          />
        </a-form-item>
      </div>
      <!-- saas1.0 -->
      <template v-if="sysInfo.system_type === 1">
        <div class="group">
          <span class="group_title">升级版本：</span>
          <a-radio-group name="radioGroup" v-model="is_renew_version">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </div>
        <div class="version" v-if="is_renew_version === 1">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="当前版本"
          >
            <a-checkbox defaultChecked disabled>
              {{ sysInfo.work_model_tip }}
            </a-checkbox>
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="选择版本"
          >
            <oa-select
              :options="systemVersion"
              v-decorator="[
                'renew_version_id',
                { rules: [{ required: true, message: '请选择版本' }] }
              ]"
              placeholder="选择其他版本"
            />
            <!-- <a-radio-group
            @change="selectVersion"
            v-decorator="[
          'renew_version_id',
          {rules: [{ required: true, message: '请选择系统版本' }]}
          ]"
          >
            <a-radio v-for="(item) in sysInfo.system_version" :key="item.id" :value="item.id">{{item.name}}</a-radio>
          </a-radio-group> -->
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="金额"
          >
            <a-input
              id="success"
              type="number"
              :min="0"
              step="0.01"
              addonAfter="元"
              placeholder="请输入价格"
              v-decorator="[
                'renew_version_amount',
                { rules: [{ required: true, message: '请输入金额' }] }
              ]"
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
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="选择插件"
        >
          <oa-select
            mode="multiple"
            placeholder="请选择插件"
            :options="plugins"
            v-decorator="[
              'plugins_id',
              { rules: [{ required: true, message: '请选择插件' }] }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="开通时长"
        >
          <a-input
            id="success"
            type="number"
            min="1"
            v-decorator="[
              'plugins_day',
              { rules: [{ required: true, message: '请输入开通时长' }] }
            ]"
            placeholder="请输入时长"
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
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="金额"
        >
          <a-input
            id="success"
            addonAfter="元"
            type="number"
            min="0"
            step="0.01"
            placeholder="请输入价格"
            v-decorator="[
              'plugins_amount',
              { rules: [{ required: true, message: '请输入金额' }] }
            ]"
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
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="短信数量"
        >
          <a-input
            placeholder="请输入短信数量"
            :min="0"
            type="number"
            v-decorator="[
              'sms_qty',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入短信数量'
                  }
                ]
              }
            ]"
          />
          <span>
            <span class="unit">条</span>
          </span>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="金额"
        >
          <a-input
            id="success"
            type="number"
            :min="0"
            step="0.01"
            addonAfter="元"
            placeholder="请输入价格"
            v-decorator="[
              'sms_amount',
              {
                rules: [{ required: true, message: '请输入金额' }]
              }
            ]"
          />
        </a-form-item>
      </div>
      <template v-if="sysInfo.system_type === 2">
        <div class="group">
          <span class="group_title">购买模块：</span>
          <a-radio-group name="radioGroup" v-model="is_buy_module">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </div>
        <div class="buy_module" v-if="is_buy_module === 1">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="模块"
          >
            <oa-select
              mode="multiple"
              placeholder="请选择模块"
              :options="moduleList"
              v-decorator="[
                'module.module_id',
                { rules: [{ required: true, message: '请选择模块' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="开通时长"
          >
            <a-input
              id="success"
              type="number"
              min="1"
              v-decorator="[
                'module.open_day',
                { rules: [{ required: true, message: '请输入开通时长' }] }
              ]"
              placeholder="请输入时长"
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
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="金额"
          >
            <a-input
              id="success"
              addonAfter="元"
              type="number"
              min="0"
              step="0.01"
              placeholder="请输入价格"
              v-decorator="[
                'module.amount',
                { rules: [{ required: true, message: '请输入金额' }] }
              ]"
            />
          </a-form-item>
        </div>
      </template>
      <div class="group">
        <span class="group_title">是否赠送：</span>
        <a-radio-group name="radioGroup" v-model="is_present">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="give-system mg-b24" v-if="is_present === 1">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="系统赠送时长"
        >
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
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="赠送插件"
        >
          <oa-select
            mode="multiple"
            placeholder="请选择赠送插件"
            :options="plugins"
            v-decorator="['present.plugins_id']"
          />
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="赠送插件时长"
        >
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
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="赠送短信数量"
        >
          <a-input-number
            placeholder="请输入短信数量"
            :min="0"
            v-decorator="['present.sms_qty']"
          />
          <span>
            <span class="unit">条</span>
          </span>
        </a-form-item>
        <template v-if="sysInfo.system_type === 2">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="赠送模块"
          >
            <oa-select
              mode="multiple"
              placeholder="请选择赠送模块"
              :options="moduleList"
              v-decorator="['present.module_id']"
            ></oa-select>
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="赠送模块时长"
          >
            <a-input
              id="success"
              type="number"
              min="1"
              v-decorator="['present.open_day']"
              placeholder="请输入赠送插件时长"
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
          <a-button @click="preStep">返回</a-button>
          <a-button type="primary" html-type="submit">下一步</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
import { get, cloneDeep } from 'lodash-es'
export default {
  name: 'step_two',
  props: {
    sysInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      openDateUnit: 'year',
      pluginOpenDateUnit: 'year',
      giveDateUnit: 'year',
      givePluginDateUnit: 'year',
      limit: false,
      is_buy_plugins: 0,
      is_buy_sms: 0,
      is_buy_shop: 0,
      is_renew_version: 0,
      is_present: 0,
      is_buy_module: 0,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this),
      moduleOpenDateUnit: 'year',
      giveModuleDateUnit: 'year'
    }
  },
  computed: {
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
      formData.is_buy_plugins = this.is_buy_plugins
      formData.is_buy_sms = this.is_buy_sms
      formData.is_buy_shop = this.is_buy_shop
      formData.is_renew_version = this.is_renew_version
      formData.is_present = this.is_present
      if (this.is_buy_shop === 1 && this.limit) {
        formData.shop_qty = 9999
      }
      if (
        this.is_buy_shop === 1 &&
        this.openDateUnit === 'year' &&
        this.sysInfo.system_type === 2
      ) {
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
        if (
          this.giveModuleDateUnit === 'year' &&
          this.sysInfo.system_type === 2
        )
          formData.present.open_day = formData.present.open_day * 365
      }
      if (this.sysInfo.system_type === 2) {
        delete formData.is_renew_version
        formData.is_buy_module = this.is_buy_module
        if (this.is_buy_module === 1 && this.moduleOpenDateUnit === 'year') {
          formData.module.open_day = formData.module.open_day * 365
        }
      }
      return formData
    },
    nextStep(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.sysInfo.system_type === 1) delete values.shop_day_qty
          const form = this.formatDataform(cloneDeep(values))
          this.$emit('re-step', form)
          this.$emit('next-step', 2)
        }
      })
    },
    preStep() {
      this.$emit('pre-step', 0)
    }
  }
}
</script>
<style lang="less">
.renew-steptwo-tab-content {
  .unit {
    display: inline-block;
    position: absolute;
    margin-left: 8px;
  }
  .btn-group {
    margin-left: 80px;
    .ant-btn-primary,
    .skip {
      margin-left: 8px;
    }
  }
  .group {
    margin-top: 24px;
    margin-bottom: 19px;
    margin-left: 144px;
    .ant-radio-group {
      margin-left: 8px;
    }
  }

  .add-store,
  .version,
  .sms,
  .add-plugin,
  .buy_module,
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
    .sms {
    }
  }
  .add-plugin {
  }
  .version {
    .ant-radio-wrapper {
      display: block;
    }
  }
}
</style>
