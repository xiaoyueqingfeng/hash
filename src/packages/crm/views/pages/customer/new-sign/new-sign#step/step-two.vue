<template>
  <div class="new-sign-steptwo-tab-content">
    <a-form :form="form" @submit="nextStep">
      <template v-if="system_type == 2">
        <div class="group">
          <span class="group_title">购买模块：</span>
          <a-radio-group name="radioGroup" v-model="is_buy_module">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </div>

        <div class="buy_module" v-if="is_buy_module">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="模块"
          >
            <oa-select
              :options="moduleList"
              v-decorator="[
                'module.module_id',
                { rules: [{ required: true, message: '请选择模块' }] }
              ]"
              placeholder="请选择模块"
              mode="multiple"
            />
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="开通时长"
          >
            <a-input
              type="number"
              placeholder="请输入时长"
              id="success"
              min="0"
              v-decorator="[
                'module.open_day',
                { rules: [{ required: true, message: '请输入开通时长' }] }
              ]"
            >
              <a-select
                slot="addonAfter"
                defaultValue="year"
                v-model="moduleOpenDateUnit"
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
              type="number"
              placeholder="请输入价格"
              id="success"
              addonAfter="元"
              min="0"
              step="0.01"
              v-decorator="[
                'module.amount',
                { rules: [{ required: true, message: '请输入金额' }] }
              ]"
            />
          </a-form-item>
        </div>
      </template>

      <div class="group">
        <span class="group_title">购买插件：</span>
        <a-radio-group name="radioGroup" v-model="is_buy_plugins">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>

      <div class="plugin" v-if="is_buy_plugins">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="插件"
        >
          <oa-select
            :options="plugins"
            v-decorator="[
              'plugins_id',
              { rules: [{ required: true, message: '请选择插件' }] }
            ]"
            placeholder="请选择插件"
            mode="multiple"
          />
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="开通时长"
        >
          <a-input
            type="number"
            placeholder="请输入时长"
            id="success"
            min="0"
            v-decorator="[
              'plugins_day',
              { rules: [{ required: true, message: '请输入开通时长' }] }
            ]"
          >
            <a-select
              slot="addonAfter"
              defaultValue="year"
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
            type="number"
            placeholder="请输入价格"
            id="success"
            addonAfter="元"
            min="0"
            step="0.01"
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
      <div class="sms" v-if="is_buy_sms">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="短信数量"
        >
          <a-input-number
            placeholder="请输入短信数量"
            type="number"
            :min="0"
            v-decorator="[
              'sms_qty',
              { rules: [{ required: true, message: '请输入短息数量' }] }
            ]"
          />
          <span class="unit">条</span>
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
              'sms_amount',
              { rules: [{ required: true, message: '请输入金额' }] }
            ]"
          />
        </a-form-item>
      </div>

      <div class="group">
        <span class="group_title">是否赠送：</span>
        <a-radio-group name="radioGroup" v-model="is_present" :defaultValue="0">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="give" v-if="is_present">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="赠送系统时长"
        >
          <a-input
            id="success"
            type="number"
            min="0"
            v-decorator="['present.system_day']"
            placeholder="请输入时长"
          >
            <a-select
              slot="addonAfter"
              defaultValue="year"
              v-model="giveSysDateUnit"
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
          label="赠送插件"
        >
          <a-select
            mode="multiple"
            placeholder="请选择插件"
            v-decorator="['present.plugins_id']"
          >
            <a-select-option
              v-for="item in this.$props.plugins"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          type="number"
          :wrapper-col="wrapperCol"
          label="赠送插件时长"
        >
          <a-input
            id="success"
            type="number"
            min="0"
            placeholder="请输入时长"
            v-decorator="['present.plugins_day']"
          >
            <a-select
              slot="addonAfter"
              v-model="givePluginDateUnit"
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
          label="短信数量"
        >
          <a-input-number
            :min="0"
            v-decorator="['present.sms_qty']"
            placeholder="请输入短信数量"
          />
          <span>
            <span class="unit">条</span>
          </span>
        </a-form-item>

        <template v-if="system_type == 2">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="赠送模块"
          >
            <a-select
              mode="multiple"
              placeholder="请选择模块"
              v-decorator="['present.module_id']"
            >
              <a-select-option
                v-for="item in moduleList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            type="number"
            :wrapper-col="wrapperCol"
            label="赠送模块时长"
          >
            <a-input
              id="success"
              type="number"
              min="0"
              placeholder="请输入时长"
              v-decorator="['present.open_day']"
            >
              <a-select
                slot="addonAfter"
                v-model="giveModuleDateUnit"
                style="width: 50px"
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
          <a class="skip" @click="skip">跳过</a>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<style lang="less">
.new-sign-steptwo-tab-content {
  .unit {
    display: inline-block;
    position: absolute;
    margin-left: 8px;
  }
  .btn-group {
    margin-left: 80px;
    .ant-btn-primary {
      margin-left: 8px;
    }
    .skip {
      margin-left: 32px;
      color: rgba(0, 0, 0, 0.45);
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

  .plugin,
  .sms,
  .give,
  .buy_module {
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
  .sms {
  }
  .give {
    margin-bottom: 24px;
  }
}
</style>

<script>
import { getModuleList } from '@/api/pay'
import { get, cloneDeep } from 'lodash-es'
export default {
  name: 'step_two',
  props: {
    plugins: {
      type: Array,
      default: () => []
    },
    system_type: {
      type: [Number, String]
    },
    version_id: {
      type: [Number, String]
    }
  },
  data() {
    return {
      is_buy_module: 0,
      is_buy_plugins: 0,
      is_buy_sms: 0,
      is_present: 0,
      openDateUnit: 'year',
      giveSysDateUnit: 'year',
      givePluginDateUnit: 'year',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this),
      moduleList: [],
      moduleOpenDateUnit: 'year',
      giveModuleDateUnit: 'year'
    }
  },
  async: {
    getModuleList() {
      return getModuleList({ version_id: this.version_id }).then(res => {
        let moduleList = res || []
        this.moduleList = moduleList.map(item => {
          return {
            id: item.id,
            name: item.module_name
          }
        })
        console.log(this.moduleList)
        this.form.setFieldsValue({
          module: {
            module_id: []
          },
          present: {
            module_id: []
          }
        })
      })
    }
  },
  watch: {
    version_id(newVal) {
      if (newVal && this.system_type == 2) {
        this.getModuleList()
      }
    }
  },
  methods: {
    skip(e) {
      this.$emit('next-step', 2)
    },
    formatFormData(formData) {
      if (this.is_buy_plugins) {
        formData.plugins_day_original_value =
          formData.plugins_day + this.openDateUnit
        this.openDateUnit === 'year' &&
          (formData.plugins_day = formData.plugins_day * 365)
      }
      if (this.is_present) {
        formData.present.system_day_original_value =
          formData.present.system_day + this.givePluginDateUnit
        formData.present.plugins_day_original_value =
          formData.present.plugins_day + this.giveSysDateUnit
        this.giveSysDateUnit === 'year' &&
          (formData.present.system_day = formData.present.system_day * 365)
        this.givePluginDateUnit === 'year' &&
          (formData.present.plugins_day = formData.present.plugins_day * 365)
      }
      formData.is_buy_plugins = this.is_buy_plugins
      formData.is_buy_sms = this.is_buy_sms
      if (this.system_type == 2) {
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
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = this.formatFormData(cloneDeep(values))
          this.$emit('sign-step', form)
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
