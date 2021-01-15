<template>
  <oa-modal
    title="添加白名单客户"
    @ok="onSubmit"
    v-model="show"
    :confirmLoading="addWhiteListLeads$loading"
    okText="保存并转化"
  >
    <a-row>
      <a-form :form="form">
        <a-form-item label="客户名称" v-bind="formCol" :colon="false" required>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ validator: checkName }]
              }
            ]"
            placeholder="请输入客户名称"
          />
        </a-form-item>
        <a-form-item label="城市" v-bind="formCol" required>
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
                ]
              }
            ]"
          ></oa-region-cascader>
        </a-form-item>
        <a-form-item label="详细地址" v-bind="formCol" :colon="false" required>
          <a-input
            v-decorator="[
              'address',
              {
                rules: [{ validator: checkAddress }]
              }
            ]"
            placeholder="请输入详细地址"
          />
        </a-form-item>
        <a-form-item label="渠道来源" v-bind="formCol">
          <oa-cascader
            @change="onChannelChange"
            placeholder="渠道来源"
            :options="otherInfo.channel"
            v-decorator="[
              'channel',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择渠道'
                  }
                ]
              }
            ]"
          ></oa-cascader>
        </a-form-item>
        <a-form-item label="经营模式" v-bind="formCol">
          <a-select
            placeholder="请选择经营模式"
            v-decorator="[
              'work_model',
              {
                rules: [{ required: true, message: '请选择经营模式' }]
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
        <a-form-item label="注意事项" v-bind="formCol">
          <a-input
            placeholder="请输入客户注意事项"
            v-decorator="[
              'attention',
              {
                rules: [{ validator: checkMention }]
              }
            ]"
          />
        </a-form-item>
        <div>
          <p>联系人</p>
          <div class="contact">
            <a-form-item
              label="联系人"
              v-bind="formCol"
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
              v-bind="formCol"
              :colon="false"
              required
            >
              <a-input
                placeholder="请输入联系人手机号"
                v-decorator="[
                  'contact.mobile',
                  {
                    rules: [{ validator: checkPhone }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="微信号" v-bind="formCol">
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
            <a-form-item label="职位" v-bind="formCol" :colon="false" required>
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
            <a-form-item label="是否KP" v-bind="formCol">
              <a-switch
                v-model="isTrue"
                v-decorator="['switch', { kp: false }]"
              />
            </a-form-item>
          </div>
        </div>
      </a-form>
    </a-row>
  </oa-modal>
</template>
<script>
import { getWhiteListLeadsData, addWhiteListLeads } from '@/api/leads'
import { phoneReg, wechatReg, normalReg, jobReg, nameReg } from '@/utils/reg.js'
export default {
  name: 'EditCustomer',
  data() {
    const form = this.$stForm.create()
    return {
      show: false,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      isTrue: false, // switch是否选中
      otherInfo: {},
      province_id: '',
      city_id: '',
      area_id: '',
      channel_level1_id: '',
      channel_level2_id: '',
      form
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  created() {
    this.getWhiteListLeadsData()
  },
  async: {
    addWhiteListLeads(data) {
      return addWhiteListLeads(data).then(res => {
        this.$message.success('添加成功')
        if (this.auth) {
          let id = res.id
          this.$modalRouter.push({
            name: 'customer-translate',
            props: {
              customerId: String(id),
              customerName: data.name
            }
          })
        }
        this.show = false
      })
    },
    getWhiteListLeadsData() {
      return getWhiteListLeadsData().then(res => {
        this.otherInfo = res
        this.auth = res.is_can_translate
      })
    }
  },
  methods: {
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
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(fieldsValue => {
        fieldsValue.contact.kp = this.isTrue ? 1 : 2
        fieldsValue.contact.wechat = fieldsValue.contact.wechat || ''
        delete fieldsValue.switch
        delete fieldsValue.proCityArea
        delete fieldsValue.channel
        fieldsValue.province_id = this.province_id
        fieldsValue.city_id = this.city_id
        fieldsValue.area_id = this.area_id
        fieldsValue.channel_level1_id = this.channel_level1_id
        fieldsValue.channel_level2_id = this.channel_level2_id
        this.addWhiteListLeads(fieldsValue)
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
    color: rgba(251, 163, 90, 1);
  }
}
</style>
