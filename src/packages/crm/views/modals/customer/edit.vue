<template>
  <oa-modal
    :title="!isEdit ? '添加客户' : '编辑客户'"
    @ok="onSubmit"
    v-model="show"
    :confirmLoading="isSubmitting"
    :okText="!isEdit ? '保存并转化' : '保存'"
  >
    <a-row>
      <a-form :form="form">
        <a-form-item
          label="客户名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :colon="false"
          required
        >
          <a-input
            :disabled="isEdit ? true : false"
            v-decorator="[
              'name',
              {
                rules: [{ validator: checkName }],
                initialValue: isEdit ? otherEditInfo.brand_name : ''
              }
            ]"
            placeholder="请输入客户名称"
          />
        </a-form-item>
        <a-form-item
          label="城市"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          required
        >
          <oa-region-cascader
            @change="onRegionChange"
            v-decorator="[
              'proCityArea',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择城市'
                  }
                ],
                initialValue: isEdit ? defaultCity : null
              }
            ]"
          ></oa-region-cascader>
        </a-form-item>
        <a-form-item
          label="详细地址"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :colon="false"
          required
        >
          <a-input
            v-decorator="[
              'address',
              {
                rules: [{ validator: checkAddress }],
                initialValue: isEdit ? otherEditInfo.address : ''
              }
            ]"
            placeholder="请输入详细地址"
          />
        </a-form-item>
        <a-form-item
          label="渠道来源"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <oa-cascader
            :disabled="isEdit ? true : false"
            @change="onChannelChange"
            placeholder="渠道来源"
            :options="otherEditInfo.channel || otherInfo.channel"
            v-decorator="[
              'channel',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择渠道'
                  }
                ],
                initialValue: isEdit ? defaultChannel : null
              }
            ]"
          ></oa-cascader>
        </a-form-item>
        <a-form-item
          label="经营模式"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-select
            placeholder="请选择经营模式"
            :disabled="isEdit ? true : false"
            v-decorator="[
              'work_model',
              {
                rules: [{ required: true, message: '请选择经营模式' }],
                initialValue: isEdit ? otherEditInfo.work_model_tip : ''
              }
            ]"
          >
            <a-select-option
              v-for="item in otherInfo.work_model"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="!isEdit ? '注意事项' : '修改说明'"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            :placeholder="!isEdit ? '请输入客户注意事项' : '请输入修改说明'"
            v-decorator="[
              'edit_remark',
              {
                rules: [{ validator: checkMention }]
              }
            ]"
          />
        </a-form-item>
        <div v-if="!isEdit">
          <p>联系人</p>
          <div class="contact">
            <a-form-item
              label="联系人"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              :colon="false"
              required
            >
              <a-input
                placeholder="请输入联系人姓名"
                v-decorator="[
                  'contact.name',
                  {
                    rules: [{ validator: checkContactName }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="手机号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              :colon="false"
              required
              :class="{ hasTips: isPhoneRepeat }"
            >
              <a-input
                placeholder="请输入联系人手机号"
                v-decorator="[
                  'contact.mobile',
                  {
                    rules: [{ validator: checkPhone }]
                  }
                ]"
                @blur="phoneChange"
              />
              <div class="tips" v-if="isPhoneRepeat">
                <span>该手机号存在冲突!</span>
                <a href="javascript:;" @click="jumpToSearchRepeat">点击查看</a>
              </div>
            </a-form-item>
            <a-form-item
              label="微信号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                placeholder="请输入联系人微信号"
                v-decorator="[
                  'contact.wechat',
                  {
                    rules: [{ validator: checkWechat }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="职位"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              :colon="false"
              required
            >
              <a-input
                placeholder="请输入联系人职位"
                v-decorator="[
                  'contact.job',
                  {
                    rules: [{ validator: checkJob }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="是否KP"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-switch
                v-model="isTrue"
                v-decorator="['switch', { kp: false }]"
              />
            </a-form-item>
          </div>
        </div>
      </a-form>
    </a-row>
    <!-- <div class="loading">
      <a-spin :spinning="isSubmitting"/>
    </div> -->
  </oa-modal>
</template>
<script>
import { checkMobileRepeat } from '@/api/contact'
import {
  getAddCustomerOtherInfo,
  addCustomer,
  editCustomer,
  getEditCustomerOtherInfo
} from '@/api/leads'
import { phoneReg, wechatReg, normalReg, jobReg, nameReg } from '@/utils/reg.js'
export default {
  name: 'EditCustomer',
  data() {
    return {
      show: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      isEdit: false,
      isTrue: false, // switch是否选中
      otherInfo: {},
      province_id: '',
      city_id: '',
      area_id: '',
      channel_level1_id: '',
      channel_level2_id: '',
      defaultChannel: [],
      defaultCity: [],
      otherEditInfo: {},
      isSubmitting: false,
      isPhoneRepeat: false
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  created() {
    this.isEdit = Object.keys(this.editInfo).length > 0
    if (this.isEdit) {
      this.getEditOtherInfo()
    } else {
      this.getOtherInfo()
    }
  },
  async: {
    checkMobileRepeat(mobile) {
      return checkMobileRepeat(mobile)
    }
  },
  methods: {
    jumpToSearchRepeat() {
      this.$modalRouter.push({
        name: 'customer-search-repeat',
        props: {
          mobile: this.form.getFieldValue('contact.mobile')
        }
      })
    },
    phoneChange(e) {
      let mobile = this.form.getFieldValue('contact.mobile')
      this.checkMobileRepeat({
        mobile
      }).then(res => {
        this.isPhoneRepeat = !!res.is_repeat
      })
    },
    // 获取其他信息
    getOtherInfo() {
      getAddCustomerOtherInfo({}).then(res => {
        this.otherInfo = res instanceof Object && res
        this.auth = res.is_can_translate
      })
    },
    getEditOtherInfo() {
      getEditCustomerOtherInfo({ leads_id: this.editInfo.id }).then(res => {
        this.otherEditInfo = res instanceof Object && res
        this.defaultChannel = [
          this.otherEditInfo.channel_level1_id,
          this.otherEditInfo.channel_level2_id
        ]
        this.isTrue = this.isEdit ? this.otherEditInfo.kp_tip === '是' : false
        this.defaultCity = [
          Number(this.otherEditInfo.city_value.province_id),
          Number(this.otherEditInfo.city_value.city_id),
          Number(this.otherEditInfo.city_value.area_id)
        ]
      })
    },
    checkName(rule, value, callback) {
      if (!value || value.length > 20) {
        /* eslint-disable */
        callback('请输入不超过20个字的客户名称')
      } else if (!normalReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的客户名称')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkAddress(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30个字的地址')
      } else if (!normalReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的地址')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        /* eslint-disable */
        callback('请输入手机号')
      } else if (!phoneReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的手机号码')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkMention(rule, value, callback) {
      if (value && value.length > 50) {
        /* eslint-disable */
        callback('请输入不超过50个字的内容')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkContactName(rule, value, callback) {
      if (!value || value.length > 20) {
        /* eslint-disable */
        callback('请输入不超过20个字的联系人姓名')
      } else if (!nameReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的联系人姓名')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkWechat(rule, value, callback) {
      if (value && value.length > 20) {
        /* eslint-disable */
        callback('请输入不超过20个字的微信号')
      } else if (value && !wechatReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的微信号')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkJob(rule, value, callback) {
      if (!value || value.length > 10) {
        /* eslint-disable */
        callback('请输入不超过10个字的职位')
      } else if (!jobReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的职位')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    openPhoneRepeatModal() {
      this.$info({
        title: '手机号存在冲突',
        maskClosable: true,
        content: '当前手机号在系统中已存在,不能重复录入。'
      })
    },
    // 城市信息
    onRegionChange(para) {
      this.province_id = para[0]
      this.city_id = para[1]
      this.area_id = para[2]
    },
    onChannelChange(value1, value2) {
      this.channel_level2_id = value1
      this.channel_level1_id = value2.parent_id
    },
    handlerEdit(fieldsValue) {
      if (this.isEdit) {
        let para = {
          leads_id: this.editInfo.id,
          province_id: this.province_id || this.defaultCity[0],
          city_id: this.city_id || this.defaultCity[1],
          area_id: this.area_id || this.defaultCity[2],
          address: fieldsValue.address,
          edit_remark: fieldsValue.edit_remark
        }
        editCustomer({ ...para }).then(res => {
          this.$message.success('编辑成功')
          this.$emit('done')
          this.show = false
          this.isSubmitting = false
        })
      } else {
        fieldsValue.attention = fieldsValue.edit_remark
        delete fieldsValue.edit_remark
        addCustomer({ ...fieldsValue }).then(res => {
          this.$message.success('添加成功')
          if (this.auth) {
            let id = res.id
            this.$modalRouter.push({
              name: 'customer-translate',
              props: {
                customerId: id,
                customerName: fieldsValue.name
              }
            })
          }
          this.show = false
          this.isSubmitting = false
        }).catch(err=>{
          this.isSubmitting = false
        })
      }
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!this.isEdit) {
          fieldsValue.contact.kp = this.isTrue ? 1 : 2
          fieldsValue.contact.wechat = fieldsValue.contact.wechat || ''
        }
        if (this.isPhoneRepeat) {
          this.openPhoneRepeatModal()
          return false
        }
        if (err) {
        } else {
          this.isSubmitting = true
          delete fieldsValue.switch
          delete fieldsValue.proCityArea
          delete fieldsValue.channel
          fieldsValue.province_id = this.province_id
          fieldsValue.city_id = this.city_id
          fieldsValue.area_id = this.area_id
          fieldsValue.channel_level1_id = this.channel_level1_id
          fieldsValue.channel_level2_id = this.channel_level2_id
          if (this.isEdit) {
            // 编辑，或者编辑的手机号未改变
            this.handlerEdit(fieldsValue)
          } else {
            this.checkMobileRepeat({
              mobile: fieldsValue.contact.mobile
            }).then(res => {
              this.isPhoneRepeat = !!res.is_repeat
              if (!this.isPhoneRepeat) {
                this.handlerEdit(fieldsValue)
              } else {
                this.openPhoneRepeatModal()
              }
              this.isSubmitting = false
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.contact {
  position: relative;
  padding: 30px;
  background: rgba(0, 0, 0, 0.04);
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
  }
}
.hasTips {
  margin-bottom: 0;
}
.tips {
  display: flex;
  justify-content: space-between;
  span {
    color: rgba(251,163,90,1);
  }
}
</style>
