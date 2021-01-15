<template>
  <oa-modal title="延期确认" v-model="show" @ok="onSubmit" width="600px">
    <a-row>
      <a-col :span="6">
        <span>{{ leads_name }}</span>
      </a-col>
      <a-col :span="6">
        <span class="mg-r8">ID:</span>
        <span>{{ leads_id }}</span>
      </a-col>
      <a-col :span="6">
        <span class="mg-r8">当前系统:</span>
        <span>{{ system_type_tip }}</span>
      </a-col>
      <a-col :span="6">
        <span class="mg-r8">当前版本:</span>
        <span>{{ system_version_id_tip }}</span>
      </a-col>
    </a-row>
    <a-divider class="mg-t16 mg-b8" />
    <a-form class="delay-config" :form="form">
      <a-form-item>
        <a-radio-group
          name="radioGroup"
          :defaultValue="0"
          v-model="isSelectShop"
          @change="handlerSelectChange"
        >
          <a-radio :value="0">批量延期</a-radio>
          <a-radio :value="1">自选门店延期</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="!isSelectShop">
        <a-input
          id="success"
          type="number"
          min="1"
          v-decorator="decorators.system_day"
          style="width: 200px"
          placeholder="请输入时长"
        >
          <a-select slot="addonAfter" v-model="dateUnit" style="width: 58px">
            <a-select-option value="year">年</a-select-option>
            <a-select-option value="day">日</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-else>
        <div class="shop" v-for="shop in shops" :key="shop.id">
          <div class="shop__header">
            <a-checkbox
              :value="shop.checked"
              @change="e => handlerShopCheck(e, shop)"
            >
              <span v-if="shop.id !== 0">
                {{ shop.shop_name }} 到期时间 {{ shop.expire_time }} (剩余{{
                  shop.margin_days
                }}天)
              </span>
              <span v-else>
                {{ shop.shop_name }} {{ shop.no_create_num }}家
              </span>
            </a-checkbox>
          </div>
          <div class="shop__body">
            <div class="mg-r16">
              <a-input
                id="success"
                type="number"
                min="1"
                v-model="shop.system_day"
                style="width: 200px"
                placeholder="请输入时长"
                @change="e => handlerSystemDayChange(e, shop)"
              >
                <a-select
                  slot="addonAfter"
                  v-model="shop.dateUnit"
                  style="width: 58px"
                  @change="e => handlerDateUnitChange(e, shop)"
                >
                  <a-select-option value="year">年</a-select-option>
                  <a-select-option value="day">日</a-select-option>
                </a-select>
              </a-input>
            </div>
            <div v-if="shop.checked && shop.id">
              <span>延期后到期时间：</span>
              <span>{{ shop.end_time }}</span>
            </div>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="备注说明" required>
        <oa-textarea
          placeholder="请输入不超过50个字"
          maxlength="50"
          v-decorator="decorators.remark"
          placehloder="请输入版本说明"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { delaySystemFormData, calcExpiredTime } from '@/api/software'
import { get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    leads_id: {
      type: [Number, String]
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      system_day: {
        rules: [{ required: true, message: '请输入开通时长' }],
        initialValue: 1
      },
      remark: {
        rules: [{ required: true, message: '请输入备注说明' }]
      }
    })
    return {
      show: true,
      form,
      decorators,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      isSelectShop: 0,
      currentCustomer: {},
      shops: [],
      dateUnit: 'year'
    }
  },

  computed: {
    system_type_tip() {
      return get(this.currentCustomer, 'system_type_tip', '')
    },
    system_version_id_tip() {
      return get(this.currentCustomer, 'system_version_id_tip', '')
    },
    leads_name() {
      return get(this.currentCustomer, 'name', '')
    }
  },

  async: {
    delaySystemFormData(data) {
      return delaySystemFormData(data).then(res => {
        let shopInfo = get(res, 'shop', {})
        let shops = get(shopInfo, 'list', [])
        if (shopInfo.no_create_num) {
          shops.push({
            id: 0,
            shop_name: '未创建的门店',
            expire_time: '0000-00-00',
            margin_days: 0,
            no_create_num: shopInfo.no_create_num
          })
        }
        this.shops = shops.map(shop => {
          return {
            ...shop,
            checked: false,
            system_day: 1,
            dateUnit: 'year',
            end_time: '',
            expire_day: 365
          }
        })
        this.currentCustomer = res
      })
    },
    calcExpiredTime(data) {
      return calcExpiredTime({ expired_time: JSON.stringify(data) }).then(
        res => {
          return res instanceof Object && res
        }
      )
    }
  },

  mounted() {
    this.delaySystemFormData({
      leads_id: this.leads_id
    })
  },

  methods: {
    /**
     * @description 批量选择和自选门店选项变化监听
     */
    handlerSelectChange() {
      this.form.resetFields()
    },
    /**
     * @description 门店延期时长变化监听
     */
    async handlerSystemDayChange(e, shop) {
      let value = e.target.value
      if (!value) shop.system_day = 1
      let obj = {
        year: 365,
        day: 1
      }
      shop.expire_day = obj[shop.dateUnit] * value
      let count_time = await this.calcExpiredTime([
        {
          start_time: shop.expire_time,
          qty: shop.expire_day
        }
      ])
      shop.end_time = count_time[0]['end_time']
    },
    /**
     * @description 门店延期时长单位变化监听
     */
    async handlerDateUnitChange(dataUnit, shop) {
      let obj = {
        year: 365,
        day: 1
      }
      shop.expire_day = obj[dataUnit] * shop.system_day
      let count_time = await this.calcExpiredTime([
        {
          start_time: shop.expire_time,
          qty: shop.expire_day
        }
      ])
      shop.end_time = count_time[0]['end_time']
    },
    /**
     * @description 门店选择变化监听
     */
    async handlerShopCheck(e, shop) {
      let obj = {
        year: 365,
        day: 1
      }
      let checked = e.target.checked
      shop.checked = checked
      shop.expire_day = obj[shop.dateUnit] * shop.system_day
      let count_time = await this.calcExpiredTime([
        {
          start_time: shop.expire_time,
          qty: shop.expire_day
        }
      ])
      shop.end_time = count_time[0]['end_time']
    },
    onSubmit() {
      this.form.validate().then(async values => {
        let props = {
          currentCustomer: this.currentCustomer,
          remark: values.remark
        }
        if (!this.isSelectShop) {
          let obj = {
            year: 365,
            day: 1
          }
          let qty = values.system_day * obj[this.dateUnit]
          let calcData = this.shops.map(shop => {
            return { start_time: shop.expire_time, qty }
          })
          let count_time = await this.calcExpiredTime(calcData)
          let shops = this.shops.map((shop, index) => {
            return Object.assign(shop, {
              system_day: values.system_day, // 输入框中日期数
              dateUnit: this.dateUnit, // 输入框中日期单位
              end_time: count_time[index]['end_time'],
              expire_day: values.system_day * obj[this.dateUnit] // 延期后到期时间
            })
          })
          props = {
            system_day: values.system_day * obj[this.dateUnit], // 延期总天数
            shops,
            ...props
          }
        } else {
          let shops = this.shops.filter(shop => shop.checked)
          if (!shops.length) {
            this.$message.error('请选择至少一家门店！')
            return false
          }
          props = {
            shops,
            ...props
          }
        }
        this.$modalRouter.push({
          name: 'saas2-delay-confirm',
          props,
          on: {
            done: () => {
              this.show = false
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.delay-config {
  .ant-form-item {
    margin-bottom: 0;
  }
}
.shop {
  &__body {
    display: flex;
  }
}
</style>
