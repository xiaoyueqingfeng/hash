<template>
  <oa-modal
    title="新建服务记录"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="addServe$loading"
  >
    <!-- <ServeRecord :isDetail="false" @addServeData="submitAddServe" @close="show=false"/> -->
    <a-form :form="form" @submit="onSubmit">
      <a-form-item
        label="客户名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          showSearch
          :defaultActiveFirstOption="false"
          :filterOption="false"
          :notFoundContent="fetching ? undefined : null"
          :disabled="leads_id_disabled"
          placeholder="请搜索客户名称"
          @search="handleSearch"
          @change="handleChange"
          v-decorator="[
            'leads_id',
            { rules: [{ required: true, message: '请搜索客户名称' }] }
          ]"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="item in searchRes" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="联系人"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          :disabled="contact_id_disabled"
          v-decorator="[
            'contact_id',
            { rules: [{ required: true, message: '请选择联系人' }] }
          ]"
          placeholder="请选择联系人"
        >
          <a-select-option v-for="item in otherInfos.contact" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="服务时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-date-picker
          placeholder="请选择服务时间"
          showTime
          style="width: 100%"
          format="YYYY-MM-DD HH:mm:ss"
          :disabledDate="disableServiceDate"
          v-decorator="['serve-picker', serveConfig]"
          @change="serviceDateChange"
          :disabled="isCallAdd"
        />
      </a-form-item>
      <a-form-item
        label="服务方式"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'service_type_id',
            { rules: [{ required: true, message: '请选择服务方式' }] }
          ]"
          placeholder="请选择服务方式"
        >
          <a-select-option
            v-for="item in otherInfos.service_record_model"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 通话记录 -->
      <a-form-item
        label="通话记录"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        v-if="callListShow"
      >
        <a-select
          v-decorator="['call_id']"
          placeholder="请选择通话记录"
          allowClear
          @dropdownVisibleChange="handleCallVisibleChange"
        >
          <a-select-option v-for="item in serviceCallList" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="点选结果"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        required
      >
        <a-cascader
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          :options="otherInfos.service_category"
          placeholder="请选择点选结果"
          v-decorator="[
            'service_category_id',
            { rules: [{ required: true, message: '请选择点选结果' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="服务详情"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        required
      >
        <a-textarea
          v-decorator="['detail', { rules: [{ validator: checkDetailText }] }]"
          placeholder="请输入不超过500字的服务详情"
          :rows="4"
        />
      </a-form-item>
      <a-form-item
        label="上传附件"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <upload @upload="getFileKey"></upload>
      </a-form-item>
      <a-form-item
        label="下次服务"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-switch
          v-model="isNextVisit"
          disabled
          v-decorator="['switch', { next_service: false }]"
        />
      </a-form-item>
      <a-form-item
        v-if="isNextVisit"
        label="提醒时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-date-picker
          showTime
          placeholder="请选择提醒时间"
          :disabledDate="disabledDate"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['clock-picker', clockConfig]"
        />
      </a-form-item>
      <a-form-item
        v-if="isNextVisit"
        label="跟进内容"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        required
      >
        <a-textarea
          v-decorator="[
            'work_plan_detail',
            { rules: [, { validator: checkFollowText }] }
          ]"
          placeholder="请输入不超过30字的跟进内容"
          :rows="4"
        />
      </a-form-item>
      <div class="text-right">
        <!-- <a-form-item v-if="isDetail">
          <a-button type="primary" @click="onSubmit">发布</a-button>
        </a-form-item>-->
        <!-- <slot name="footer">
          <a-button type="default" @click="cancelSubmit">取消</a-button>
          <a-button type="primary" @click="onSubmit" class="inline-block margin-l8">确定</a-button>
        </slot>-->
      </div>
    </a-form>
  </oa-modal>
</template>
<script>
import ServeRecord from '../../fragments/serve-record'
import {
  searchServeCustomeByBrandId,
  getServeOtherInfo,
  addServe
} from '@/api/service'
import { getCallList } from '@/api/udesk'
import upload from 'oa-core/views/components/file-upload'
import { get, debounce } from 'lodash-es'
import moment from 'moment'
export default {
  name: 'AddServeRecord',
  components: {
    ServeRecord,
    upload
  },
  props: {
    customer_id: {
      type: String,
      default: ''
    },
    contact_id: {
      type: String,
      default: ''
    },
    call_id: {
      type: String,
      default: ''
    },
    isCallAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.handleSearch = debounce(this.handleSearch, 400)
    const form = this.$stForm.create()
    return {
      show: false,
      form,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      serveConfig: {
        rules: [{ type: 'object', required: true, message: '请选择服务时间' }]
      },
      clockConfig: {
        rules: [{ type: 'object', required: true, message: '请选择提醒时间' }]
      },
      isNextVisit: true,
      brand_name: '',
      keywords: '',
      curBrandId: '',
      searchRes: [],
      serviceCallList: [],
      otherInfos: {}, // 联系人列表 模式 进度
      config: {
        rules: [
          { type: 'object', required: true, message: 'Please select time!' }
        ]
      },
      fileKey: '',
      fileName: '',
      value: '',
      serviceId: '',
      fetching: false,
      callListShow: false,
      leads_id_disabled: false,
      contact_id_disabled: false
    }
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  async: {
    addServe(params) {
      return addServe({ ...params })
    },
    getCallList(params) {
      return getCallList(params)
        .then(res => {
          this.serviceCallList = get(res, 'list', [])
          this.callListShow = true
        })
        .catch(err => {
          this.callListShow = true
        })
    }
  },
  created() {
    if (this.customer_id) {
      this.initServiceRecordData()
    } else {
      this.getAllOptions()
    }
  },
  methods: {
    async initServiceRecordData() {
      this.leads_id_disabled = !!this.customer_id
      this.contact_id_disabled = !!this.contact_id
      await this.getAllOptions(this.customer_id)
      await this.handleChange(this.customer_id)
      this.form.setFieldsValue({
        leads_id: this.customer_id || undefined,
        contact_id: this.contact_id || undefined,
        'serve-picker': moment()
      })
      this.callListShow = true
    },
    handleCallVisibleChange(open) {
      if (!open) return false
      let service_time = this.form.getFieldValue('serve-picker')
      this.getCallList({
        service_time: service_time.format('YYYY-MM-DD HH:mm:ss')
      })
    },
    serviceDateChange(service_time) {
      if (!service_time) {
        this.callListShow = false
        return false
      }
      return this.getCallList({
        service_time: service_time.format('YYYY-MM-DD HH:mm:ss')
      })
    },
    checkDetailText(rule, value, callback) {
      if (!value || value.length > 500) {
        /* eslint-disable */
        callback('请输入不超过500字的服务详情')
      } else {
        callback()
      }
    },
    checkFollowText(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30字的跟进内容')
      } else {
        callback()
      }
    },
    disableServiceDate(current) {
      return current && current > moment()
    },
    disabledDate(current) {
      return current && current < moment().startOf('day')
    },
    getAllOptions(keywords = '') {
      searchServeCustomeByBrandId({ keywords }).then(res => {
        this.searchRes = res.list
      })
    },
    // 模糊搜索
    searchContact() {
      this.fetching = true
      this.keywords = this.keywords.trim() || ''
      searchServeCustomeByBrandId({ keywords: this.keywords }).then(res => {
        this.fetching = false
        this.searchRes = res.list
      })
    },
    handleSearch(value) {
      this.keywords = value
      this.searchContact()
    },
    handleChange(value) {
      this.curBrandId = value
      this.value = value
      this.getVisitById(value)
    },
    cancelSubmit() {
      this.$emit('close')
    },
    // 获取联系人 拜访方式 拜访进度列表
    getVisitById(id) {
      // 区分是否是详情页
      const leads_id = id
      getServeOtherInfo({ leads_id: leads_id }).then(res => {
        this.otherInfos = res
      })
    },
    getFileKey(key) {
      this.fileKey = key
    },
    onSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const params = {
            leads_id: this.curBrandId || this.leads_id,
            contact_id: fieldsValue.contact_id,
            service_type_id: fieldsValue.service_type_id,
            service_category_id:
              fieldsValue.service_category_id[
                fieldsValue.service_category_id.length - 1
              ],
            detail: fieldsValue.detail,
            next_service: this.isNextVisit ? 1 : 2,
            enclosure: this.fileKey,
            service_time: fieldsValue['serve-picker'].format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
          if (this.isNextVisit) {
            params.work_plan_remind_time = fieldsValue['clock-picker'].format(
              'YYYY-MM-DD HH:mm:ss'
            )
            params.work_plan_detail = fieldsValue.work_plan_detail
          }
          if (this.callListShow) {
            params.call_id = fieldsValue.call_id
          }
          this.addServe(params).then(res => {
            this.show = false
            this.$emit('noticeSuccess', 'success')
          })
        }
      })
    }
  }
}
</script>
