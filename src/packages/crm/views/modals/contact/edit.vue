<template>
  <oa-modal
    :title="isEdit ? '编辑联系人' : '添加联系人'"
    @ok="onSubmit"
    v-model="show"
  >
    <a-row>
      <a-form :form="form">
        <a-form-item
          v-if="!isEdit"
          label="客户名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="info.brand_name" :id="info.id" readonly />
        </a-form-item>
        <a-form-item
          label="联系人姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          required
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ validator: checkName }],
                initialValue: isEdit ? editInfo.name : ''
              }
            ]"
            placeholder="请输入联系人姓名"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :class="{ hasTips: isPhoneRepeat }"
          required
        >
          <a-input
            v-decorator="[
              'mobile',
              {
                rules: [{ validator: checkPhone }],
                initialValue: isEdit ? editInfo.mobile : ''
              }
            ]"
            @blur="phoneChange"
            placeholder="请输入联系人手机号"
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
            v-decorator="[
              'wechat',
              {
                rules: [{ validator: checkWechat }],
                initialValue: isEdit ? editInfo.wechat : ''
              }
            ]"
            placeholder="请输入联系人微信号"
          />
        </a-form-item>
        <a-form-item
          label="职位"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          required
        >
          <a-input
            v-decorator="[
              'job',
              {
                rules: [{ validator: checkJob }],
                initialValue: isEdit ? editInfo.job : ''
              }
            ]"
            placeholder="请输入联系人职位"
          />
        </a-form-item>
        <a-form-item
          label="是否KP"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-switch v-model="isTrue" v-decorator="['switch', { kp: false }]" />
        </a-form-item>
      </a-form>
    </a-row>
  </oa-modal>
</template>
<script>
import { addContact, checkMobileRepeat } from '@/api/contact'
import { phoneReg, wechatReg, nameReg, jobReg } from '@/utils/reg.js'
export default {
  name: 'EditContact',
  data() {
    return {
      show: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      isEdit: false,
      isTrue: false, // switch是否选中
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
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    },
    editInfoMobile() {
      return this.editInfo && this.editInfo.mobile
    }
  },
  async: {
    checkMobileRepeat(mobile) {
      return checkMobileRepeat({ ...mobile, leads_id: this.leads_id })
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.isEdit = Object.keys(this.editInfo).length > 0
    this.isTrue = this.isEdit ? this.editInfo.kp === '1' : false
  },
  methods: {
    jumpToSearchRepeat() {
      let mobile = this.form.getFieldValue('mobile')
      this.$modalRouter.push({
        name: 'customer-search-repeat',
        props: {
          mobile
        }
      })
    },
    phoneChange() {
      let mobile = this.form.getFieldValue('mobile')
      if (this.editInfoMobile == mobile) return false
      this.checkMobileRepeat({
        mobile
      }).then(res => {
        this.isPhoneRepeat = !!res.is_repeat
      })
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        /* eslint-disable */
        callback('请输入手机号')
      } else if (!phoneReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确手机号码')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkName(rule, value, callback) {
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
        callback('请输入不超过10个字的职位名称')
      } else if (!jobReg.test(value)) {
        /* eslint-disable */
        callback('请输入正确格式的职位名称')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    handleEdit(fieldsValue) {
      console.log(fieldsValue)
      if (this.isEdit) {
        fieldsValue.id = this.editInfo.id
        this.$emit('editContactInfo', fieldsValue)
      } else {
        addContact({ ...fieldsValue }).then(res => {
          this.$message.success('添加成功')
          this.$store.commit('leads/SET_CONTACT', true)
        })
      }
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        delete fieldsValue.switch
        fieldsValue.leads_id = this.leads_id
        fieldsValue.kp = this.isTrue ? 1 : 2
        if (err) {
        } else {
          if (this.editInfoMobile == fieldsValue.mobile) {
            this.handleEdit(fieldsValue)
            this.show = false
          } else {
            this.checkMobileRepeat({
              mobile: fieldsValue.mobile
            }).then(res => {
              let is_repeat = !!res.is_repeat
              if (is_repeat) {
                this.$info({
                  title: '手机号存在冲突',
                  maskClosable: true,
                  content: '当前手机号在系统中已存在,不能重复录入。'
                })
              } else {
                this.handleEdit(fieldsValue)
              }
              this.show = false
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  display: flex;
  justify-content: space-between;
  span {
    color: rgba(251, 163, 90, 1);
  }
}
.hasTips {
  margin-bottom: 0;
}
</style>
