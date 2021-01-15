<template>
  <oa-panel app>
    <section class="sell-brand-info">
      <div class="sell-brand-info__left mg-r16">
        <oa-t3 class="title mg-r16">
          <oa-tag
            class="mg-r8"
            type="work-model"
            :value="currentSysInfo.work_model"
          ></oa-tag>
          <span>{{ currentSysInfo.name }}</span>
        </oa-t3>
        <div>
          <span class="lable">ID:</span>
          <span class="value">{{ currentSysInfo.id }}</span>
        </div>
      </div>
      <ul class="sell-brand-info__right">
        <li class="mg-r16">
          <span class="label">当前系统:</span>
          <span class="value">{{ currentSysInfo.system_type_tip }}</span>
        </li>
        <li>
          <span class="label">当前版本:</span>
          <span class="value">{{ currentSysInfo.system_version_id_tip }}</span>
        </li>
      </ul>
    </section>
    <div class="tab-con">
      <div class="sell-steptwo-tab-content">
        <a-form :form="form" @submit="submit">
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="硬件产品"
          >
            <a-button type="dashed" icon="plus" block @click="AddProducts">
              添加产品
            </a-button>
          </a-form-item>
          <div class="products" v-for="item in products" :key="item.productId">
            <Product
              @delete="onDeleteProduct"
              :currentSysInfo="currentSysInfo.product"
              :addId="item.productId"
              :form="form"
            />
          </div>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="是否赠送"
          >
            <div class="group">
              <a-radio-group
                name="radioGroup"
                v-model="present"
                :defaultValue="0"
              >
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <div class="version" v-if="present === 1">
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="赠送系统时长"
            >
              <a-input
                type="number"
                id="success"
                :max="99"
                :min="0"
                v-decorator="['present.system_day']"
                placeholder="请输入时长"
              >
                <a-select
                  slot="addonAfter"
                  v-model="sysUnit"
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
              label="插件"
            >
              <a-select
                mode="multiple"
                placeholder="请选择插件"
                v-decorator="['present.plugins_id']"
              >
                <a-select-option
                  v-for="item in currentSysInfo.plugins"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="赠送插件时长"
            >
              <a-input
                type="number"
                :max="99"
                :min="0"
                id="success"
                v-decorator="['present.plugins_day']"
                placeholder="请输入时长"
              >
                <a-select
                  slot="addonAfter"
                  v-model="pluginUnit"
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
                style="width: 90%;margin-right:15px;"
                placeholder="请输入短信数量"
                v-decorator="['present.sms_qty']"
              />
              <span>
                <span class="unit">条</span>
              </span>
            </a-form-item>
          </div>

          <div class="order">
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="付款时间"
            >
              <a-date-picker
                @change="getPayTime"
                v-decorator="[
                  'pay_time',
                  { rules: [{ required: true, message: '请选择支付时间' }] }
                ]"
                style="width: 100%"
              />
            </a-form-item>

            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="OA单号"
            >
              <a-input
                id="success"
                v-decorator="['oa_sn']"
                placeholder="请输入OA单号"
              />
            </a-form-item>

            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="售卖人"
            >
              <oa-select
                v-decorator="[
                  'sale_id',
                  {
                    rules: [{ required: true, message: '请选择售卖人' }],
                    initialValue: currentSysInfo.default_sale_id || undefined
                  }
                ]"
                placeholder="请选择销售(默认客户跟进销售)"
                :options="currentSysInfo.sale"
              ></oa-select>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="备注"
            >
              <a-textarea
                v-decorator="['remake']"
                placeholder="请输入备注信息"
                :rows="4"
              />
            </a-form-item>
          </div>
          <div class="btn-group">
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button class="mg-r8" @click="reset">
                取消
              </a-button>
              <a-button
                type="primary"
                html-type="submit"
                :loading="setSaleHardWare$loading"
              >
                保存
              </a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </oa-panel>
</template>

<style lang="less" scoped>
.sell-brand-info {
  .mg-b(24px);
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  .pd(26px 80px);
  &__left {
    display: flex;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
    }
  }
  &__right {
    display: flex;
  }
}
.tab-con {
  width: 800px;
  margin: 0 auto;
}
.sell-steptwo-tab-content {
  .pd-b(24px);
}
</style>
<script>
import { gethardwareOptions, setSaleHardWare } from '@/api/pay'
import Product from './sell#product'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'HardWareSell',
  data() {
    return {
      currentSysInfo: {},
      present: 0,
      payTime: null,
      sysUnit: 'year',
      pluginUnit: 'year',
      products: [],
      productIndex: 0,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    this.gethardwareOptions()
  },
  async: {
    gethardwareOptions() {
      gethardwareOptions({ leads_id: this.$route.query.customer_id }).then(
        res => {
          this.currentSysInfo = res
        }
      )
    },
    setSaleHardWare(form) {
      return setSaleHardWare(form).then(res => {
        this.$message.success('操作成功', 5)
        this.$router.push({
          name: 'customer-pay-list',
          query: { keywords: form.leads_id }
        })
      })
    }
  },
  methods: {
    reset() {
      this.form.resetFields()
    },
    getPayTime(date, dateString) {
      this.payTime = dateString
    },
    onDeleteProduct(addId) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].productId === addId) {
          let index = this.products.indexOf(this.products[i])
          if (index > -1) {
            this.products.splice(index, 1)
          }
        }
      }
    },
    formatFormData(formData) {
      formData.leads_id = this.$route.query.customer_id
      formData.pay_time = this.payTime
      if (this.sysUnit === 'year' && this.present === 1) {
        formData.present.system_day = formData.present.system_day
          ? formData.present.system_day * 365
          : ''
      }
      if (this.pluginUnit === 'year' && this.present === 1) {
        formData.present.plugins_day = formData.present.plugins_day
          ? formData.present.plugins_day * 365
          : ''
      }
      return formData
    },
    submit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.is_present = this.present
          if (this.present === 1) {
            if (
              !(
                values.present.plugins_day ||
                values.present.plugins_id ||
                values.present.sms_qty ||
                values.present.system_day
              )
            ) {
              this.$message.error('请至少选择一个赠送项目')
              return
            }
            if (values.present.plugins_id && !values.present.plugins_day) {
              this.$message.error('请选择插件赠送时长')
              return
            }
            // 对选择插件进行判断2种情况 1.没有选为undefined 2.选择了又删除了为一个空数组
            if (
              ((values.present.plugins_id &&
                values.present.plugins_id.length === 0) ||
                !values.present.plugins_id) &&
              values.present.plugins_day
            ) {
              this.$message.error('请选择插件')
              return
            }
          }
          this.setSaleHardWare(this.formatFormData(cloneDeep(values)))
        }
      })
    },
    AddProducts() {
      this.productIndex += 1
      let item = {
        productId: this.productIndex,
        type_id: null,
        product_id: null,
        qty: null,
        amount: null
      }
      this.products.push(item)
    }
  },
  components: {
    Product
  }
}
</script>
