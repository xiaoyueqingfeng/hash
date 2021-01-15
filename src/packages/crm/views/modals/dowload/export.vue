<template>
  <oa-modal
    title="客户导出"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="exportLeads$loading"
  >
    <a-form :form="form">
      <a-form-item
        label="leads添加时间"
        required
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <oa-date-range-filter
          :start.sync="requestQuery.start_time"
          :end.sync="requestQuery.end_time"
          :disabledDate="disabledDate"
          v-decorator="['time', { rules: [{ validator: timeValidate }] }]"
          :placeholder="['开始时间', '结束时间']"
        ></oa-date-range-filter>
      </a-form-item>
      <a-form-item
        label="创建人"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <crm-department-user-picker
          :organ-id.sync="requestQuery.creator_organ"
          :user-id.sync="requestQuery.creator"
          type="creator"
        ></crm-department-user-picker>
      </a-form-item>
      <a-form-item
        label="渠道来源"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <crm-channel-picker
          :level1.sync="requestQuery.channel_level1_id"
          :level2.sync="requestQuery.channel_level2_id"
        ></crm-channel-picker>
      </a-form-item>
      <a-form-item
        label="跟进销售"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <crm-department-user-picker
          :organ-id.sync="requestQuery.sale_organ"
          :user-id.sync="requestQuery.sale"
          type="sale"
        ></crm-department-user-picker>
      </a-form-item>
      <a-form-item
        label="跟进商服"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <crm-department-user-picker
          :organ-id.sync="requestQuery.cs_organ"
          :user-id.sync="requestQuery.server"
          type="businessService"
        ></crm-department-user-picker>
      </a-form-item>
      <a-form-item
        label="跟进硬件销售"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <crm-department-user-picker
          :organ-id.sync="requestQuery.hardware_sale_organ"
          :user-id.sync="requestQuery.hardware_sale"
          type="hardwaresale"
        ></crm-department-user-picker>
      </a-form-item>
      <a-form-item
        label="客户类型"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
        required
      >
        <oa-checkbox-group
          :options="plainOptions"
          v-decorator="[
            'checkedList',
            { rules: [{ validator: checkedListValidate }] }
          ]"
        ></oa-checkbox-group>
      </a-form-item>
      <a-form-item
        label="账号"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <span class="mg-r8">{{ userMobile | userMobileMaskFilter }}</span>
        <a-button
          type="primary"
          :loading="getSmsCaptcha$loading"
          :disabled="!!times"
          @click.stop="sendVerificationCode"
        >
          {{ this.SendSmsCaptchaButtonText }}
        </a-button>
      </a-form-item>
      <a-form-item
        label="账号验证码"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
        required
      >
        <a-input
          v-decorator="[
            'verificationCode',
            { rules: [{ validator: verificationCodeValidate }] }
          ]"
          placeholder="请输入验证码"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { getSmsCaptcha } from '@/api/user'
import { exportLeads, getExportTypeList } from '@/api/leads'
import { mapGetters } from 'vuex'

const CAPTCHA_TIME = 60

export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
      show: true,
      form: this.$form.createForm(this),
      requestQuery: {
        start_time: undefined,
        end_time: undefined,
        channel_level1_id: undefined,
        channel_level2_id: undefined,
        creator_organ: undefined,
        creator: undefined,
        sale_organ: undefined,
        sale: undefined,
        hardware_sale_organ: undefined,
        hardware_sale: undefined,
        cs_organ: undefined,
        server: undefined
      },
      plainOptions: [],
      checkedList: [],
      indeterminate: false,
      checkAll: true,
      modal: null,
      times: 0
    }
  },

  computed: {
    userMobile() {
      return this.user_info && this.user_info.mobile
    },
    SendSmsCaptchaButtonText() {
      return this.times ? `${this.times}秒后重新获取` : '发送验证码'
    },
    ...mapGetters('oa/user', ['user_info'])
  },

  created() {
    this.init().then(res => {
      let checkedList = this.plainOptions.map(item => item.value)
      this.form.setFieldsValue({
        checkedList
      })
      this.checkedList = checkedList
    })
  },

  async: {
    init() {
      return Promise.all([this.getExportTypeList()])
    },
    exportLeads(queryData) {
      return exportLeads(queryData)
    },
    getExportTypeList() {
      return getExportTypeList().then(res => {
        this.plainOptions = res
      })
    },
    getSmsCaptcha() {
      return getSmsCaptcha({
        action_type: 1,
        mobile: this.userMobile
      })
    }
  },

  methods: {
    disabledDate(current) {
      return current < moment().subtract(90, 'days') || current > moment()
    },
    timeValidate(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择起始结束时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    verificationCodeValidate(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入验证码')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    checkedListValidate(rule, value, callback) {
      if (value && !value.length) {
        // eslint-disable-next-line
        callback('请选择至少一项客户类型')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) return
        let queryData = Object.assign(this.requestQuery, {
          sms_code: values.verificationCode,
          export_brand_type: values.checkedList
        })
        this.exportLeads(queryData).then(res => {
          this.show = false
          let prefixObj = {
            1: '本次导出数据>=1000条,请到',
            2: 'leads记录正在导出,请到',
            3: '当前没有您要导出的数据'
          }
          let prefix = prefixObj[res] || ''

          this.modal = this.$info({
            title: '导出leads记录',
            maskClosable: true,
            content: this.$createElement(
              'div',
              {},
              res !== 3
                ? [
                    prefix,
                    this.$createElement(
                      'a',
                      {
                        href: 'javascript:;',
                        on: {
                          click: this.handlerGoDownloadCenter
                        }
                      },
                      ['【下载中心】']
                    ),
                    '进行查看及下载'
                  ]
                : [prefix]
            )
          })
        })
      })
    },
    // 跳转下载中心
    handlerGoDownloadCenter() {
      this.show = false
      this.modal.destroy()
      this.$router.push({
        name: 'system-download-export'
      })
    },
    // 发送短信验证码
    sendVerificationCode() {
      this.getSmsCaptcha()
        .then(() => {
          this.times = CAPTCHA_TIME
          let clearn = setInterval(() => {
            this.times--
            if (!this.times) {
              clearInterval(clearn)
            }
          }, 1000)
        })
        .catch(() => {
          this.times = 0
        })
    }
  }
}
</script>
