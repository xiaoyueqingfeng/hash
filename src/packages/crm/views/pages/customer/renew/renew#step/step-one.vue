<template>
  <div class="renew-stepone-tab-content">
    <a-form :form="form" @submit="nextStep">
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="选择续签系统"
        validate-status="error"
      >
        <a-radio-group
          name="radioGroup"
          disabled
          v-decorator="[
            'system_type',
            {
              rules: [{ required: true, message: '请选择续签系统' }]
            }
          ]"
        >
          <a-radio
            v-for="item in sysBaseInfo.system_type_tips"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- SaasPro -->
      <template v-if="sysBaseInfo.system_type === 2">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="选择门店"
          required
        >
          <a-radio-group name="radioGroup" v-model="shop_choose_type">
            <a-radio
              v-for="item in sysBaseInfo.shop_choose_type_tips"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label=" "
          v-if="shop_choose_type === 1"
        >
          <span>
            该品牌所有门店（{{
              sysBaseInfo.shop_info.shop_total_num
            }}家）全部续费
          </span>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="{
            xs: { span: 24 },
            sm: { span: 16 }
          }"
          label=" "
          v-if="shop_choose_type === 2"
        >
          <div>
            已选 {{ checkedShopList.length }} /
            {{ sysBaseInfo.shop_list.length }} 家门店
            <span class="error-color" v-if="showErrorText">
              请至少选择一家门店
            </span>
          </div>
          <a-checkbox-group v-model="checkedShopList" @change="checkShop">
            <li v-for="item in sysBaseInfo.shop_list" :key="item.id">
              <a-checkbox :key="item.id" :value="item.id">
                {{ item.shop_name }}
              </a-checkbox>
              <span>系统到期时间{{ item.expire_time }}</span>
              <span v-if="item.checked">
                , 续签后到期时间{{ item.sign_time }}
              </span>
            </li>
          </a-checkbox-group>
        </a-form-item>
      </template>
      <template v-else>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="门店"
        >
          门店数 {{ sysBaseInfo.shop_num }}
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="到期时间"
        >
          {{ sysBaseInfo.system_expired_time }}（剩余{{
            sysBaseInfo.system_expired_days
          }}天）
        </a-form-item>
      </template>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="续费时长"
      >
        <a-input
          id="success"
          type="number"
          :min="0"
          v-decorator="[
            'system_day',
            {
              rules: [{ required: true, message: '请输入开通时长' }],
              initialValue: 1
            }
          ]"
          @change="getSystemDay"
        >
          <a-select
            slot="addonAfter"
            v-model="dateUnit"
            style="width: 56px"
            @change="selectDateUnit"
          >
            <a-select-option value="year">年</a-select-option>
            <a-select-option value="day">日</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>

      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="金额">
        <a-input
          id="success"
          addonAfter="元"
          type="number"
          :min="0"
          step="0.01"
          v-decorator="[
            'system_amount',
            { rules: [{ required: true, message: '请输入金额' }] }
          ]"
          placeholder
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'step_one',
  props: {
    sysBaseInfo: {
      type: Object
    }
  },
  data() {
    return {
      model: {},
      dateUnit: 'year',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this),
      shop_choose_type: null, // pro
      checkedShopList: [], // pro
      system_day: 1,
      showErrorText: false
    }
  },
  mounted() {
    this.shop_choose_type =
      this.sysBaseInfo.shop_choose_type_tips &&
      this.sysBaseInfo.shop_choose_type_tips[0].id
    this.$nextTick(() => {
      this.form.setFieldsValue({
        system_type: this.sysBaseInfo.system_type
      })
    })
    let shopList = this.sysBaseInfo.shop_list
    shopList &&
      shopList.forEach(item => {
        item.checked = false
      })
  },
  methods: {
    // pro
    checkShop(value) {
      let shopList = this.sysBaseInfo.shop_list
      shopList.forEach(item => {
        item.checked = this.checkedShopList.some(id => item.id === id)
      })
      this.showErrorText = !this.checkedShopList.length
      this.calcShopTime()
    },
    // pro
    getSystemDay(e) {
      if (this.sysBaseInfo.system_type === 2) {
        this.system_day = e.target.value
        this.calcShopTime()
      }
    },
    selectDateUnit(values) {
      this.calcShopTime()
    },
    calcShopTime() {
      let shopList = this.sysBaseInfo.shop_list
      let system_day =
        this.dateUnit === 'year' ? this.system_day * 365 : this.system_day
      shopList.forEach(item => {
        this.checkedShopList.forEach(id => {
          if (item.id === id) {
            item.sign_time = moment(item.expire_time)
              .add(system_day, 'days')
              .format('YYYY-MM-DD')
          }
        })
      })
    },
    skip(e) {
      this.$emit('skip', 0)
      this.$emit('next-step', 1)
    },
    formatFormData(formData) {
      formData.system_day_original_value = formData.system_day + this.dateUnit
      if (this.dateUnit === 'year') {
        formData.system_day = formData.system_day * 365
      }
      if (this.sysBaseInfo.system_type === 2) {
        formData.shop_choose_type = this.shop_choose_type
        formData.shop_id =
          this.shop_choose_type === 2
            ? this.checkedShopList
            : this.sysBaseInfo.shop_list.map(item => item.id)
      }
      return formData
    },
    nextStep(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (this.shop_choose_type === 2) {
          this.showErrorText = !this.checkedShopList.length
        }
        if (!err && !this.showErrorText) {
          this.$emit('skip', 1)
          const form = this.formatFormData(cloneDeep(values))
          this.$emit('re-step', form)
          this.$emit('next-step', 1)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.skip {
  margin-left: 32px;
  color: rgba(0, 0, 0, 0.45);
}
.error-color {
  .c(#f5222d);
}
.ant-checkbox-wrapper + span {
  padding-right: 0;
}
</style>
