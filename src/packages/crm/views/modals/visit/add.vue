<template>
  <oa-modal
    title="新建拜访记录"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="addVisit$loading"
  >
    <!-- <VisitRecord :isDetail="false" @addVisitData="submitAddVisit" @close="show=false"/> -->
    <a-form :form="form" @submit="onSubmit">
      <a-form-item
        label="客户名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          :disabled="leads_id_disabled"
          showSearch
          :notFoundContent="fetching ? undefined : null"
          :defaultActiveFirstOption="false"
          :filterOption="false"
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
          <a-select-option
            v-for="item in otherInfos.contact"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="拜访方式"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'model',
            { rules: [{ required: true, message: '请选择拜访方式' }] }
          ]"
          placeholder="请选择拜访方式"
        >
          <a-select-option
            v-for="item in otherInfos.visit_record_model"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="拜访进度"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'schedule',
            { rules: [{ required: true, message: '请选择拜访方式' }] }
          ]"
          placeholder="请选择拜访方式"
        >
          <a-select-option
            v-for="item in otherInfos.visit_record_schedule"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="拜访时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-date-picker
          showTime
          style="width: 100%"
          placeholder="请选择拜访时间"
          format="YYYY-MM-DD HH:mm:ss"
          :disabledDate="disableVisitDate"
          v-decorator="['visit-picker', visitConfig]"
          @change="visitDateChange"
        />
      </a-form-item>
      <!-- 通话记录 -->
      <a-form-item
        label="通话记录"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        v-if="callListShow"
      >
        <oa-select
          v-decorator="['call_id']"
          placeholder="请选择通话记录"
          allowClear
          @dropdownVisibleChange="handleCallVisibleChange"
          :options="visitCallList"
        />
      </a-form-item>
      <a-form-item
        label="拜访详情"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        required
      >
        <a-textarea
          v-decorator="['detail', { rules: [{ validator: checkDetailText }] }]"
          placeholder="请输入不超过500字的拜访详情"
          :rows="4"
        />
      </a-form-item>
      <a-form-item
        label="下次拜访"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-switch
          v-model="isNextVisit"
          v-decorator="['switch', { next_visit: false }]"
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
          format="YYYY-MM-DD HH:mm:ss"
          :disabledDate="disabledDate"
          placeholder="请选择提醒时间"
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
            { rules: [{ validator: checkFollowText }] }
          ]"
          placeholder="请输入不超过30字的跟进内容"
          :rows="4"
        />
        本次提醒会自动同步到工作计划
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import VisitRecord from '../../fragments/visit-record'
import {
  searchCustomeByBrandId,
  getVisitOtherInfo,
  addVisit
} from '@/api/visit'
import { getCallList } from '@/api/udesk'
import { debounce, get } from 'lodash-es'
import moment from 'moment'

export default {
  name: 'AddVisitRecord',
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
    return {
      show: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      isNextVisit: false, // 是否下次拜访
      visitConfig: {
        rules: [{ type: 'object', required: true, message: '请选择拜访时间' }]
      },
      clockConfig: {
        rules: [{ type: 'object', required: true, message: '请选择提醒时间' }]
      },
      brand_name: '',
      keywords: '',
      curBrandId: '',
      form: this.$form.createForm(this),
      searchRes: [],
      otherInfos: {}, // 联系人列表 模式 进度
      value: '',
      fetching: false,
      callListShow: false,
      leads_id_disabled: false,
      contact_id_disabled: false,
      visitCallList: []
    }
  },
  components: {
    VisitRecord
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        'visit-picker': moment()
      })
    })
    if (this.customer_id) {
      this.initServiceRecordData()
    } else {
      this.getAllOptions()
    }
  },
  methods: {
    visitDateChange(visit_time) {
      if (!visit_time) {
        this.callListShow = false
        return false
      }
      this.getCallList({
        service_time: visit_time.format('YYYY-MM-DD HH:mm:ss')
      })
    },
    handleCallVisibleChange(open) {
      if (!open) return false
      let visit_time = this.form.getFieldValue('visit-picker')
      this.getCallList({
        service_time: visit_time.format('YYYY-MM-DD HH:mm:ss')
      })
    },
    async initServiceRecordData() {
      this.leads_id_disabled = !!this.customer_id
      this.contact_id_disabled = !!this.contact_id
      await this.getAllOptions(this.customer_id)
      await this.handleChange(this.customer_id)
      this.form.setFieldsValue({
        leads_id: this.customer_id || undefined,
        contact_id: this.contact_id || undefined,
        'visit-picker': moment()
      })
      this.callListShow = true
    },
    checkDetailText(rule, value, callback) {
      if (!value || value.length > 500) {
        /* eslint-disable */
        callback('请输入不超过500字的拜访详情')
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
    disabledDate(current) {
      return current && current < moment().startOf('day')
    },
    disableVisitDate(current) {
      return current && current > moment()
    },
    getAllOptions(keywords = '') {
      searchCustomeByBrandId({ keywords }).then(res => {
        this.searchRes = res.list
      })
    },
    // 模糊搜索
    searchContact() {
      this.fetching = true
      this.keywords = this.keywords.trim() || ''
      searchCustomeByBrandId({ keywords: this.keywords }).then(res => {
        this.fetching = false
        this.searchRes = res.list
      })
    },
    handleSearch(value) {
      this.keywords = value
      this.searchContact()
    },
    handleChange(value) {
      this.value = value
      this.curBrandId = value
      this.getVisitById(value)
    },
    // 获取联系人 拜访方式 拜访进度列表
    getVisitById(id) {
      const leads_id = id
      getVisitOtherInfo({ leads_id: leads_id }).then(res => {
        this.otherInfos = res
        this.form.setFieldsValue({
          model: res.visit_record_model_default
        })
      })
    },
    cancelSubmit() {
      this.$emit('close')
    },
    onSubmit(e) {
      e.preventDefault()
      // 区分是否是详情页
      // const leads_id = !this.isDetail ? this.curBrandId : this.leads_id
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const params = {
            leads_id: this.curBrandId || this.leads_id,
            contact_id: fieldsValue.contact_id,
            model: fieldsValue.model,
            schedule: fieldsValue.schedule,
            detail: fieldsValue.detail,
            next_visit: this.isNextVisit ? 1 : 2,
            visit_time: fieldsValue['visit-picker'].format(
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
          this.addVisit(params).then(() => {
            this.show = false
            this.$emit('noticeSuccess', 'success')
          })
        }
      })
    }
  },
  async: {
    addVisit(params) {
      return addVisit({ ...params })
    },
    getCallList(params) {
      return getCallList(params)
        .then(res => {
          this.visitCallList = get(res, 'list', [])
          this.callListShow = true
        })
        .catch(err => {
          this.callListShow = true
        })
    }
  }
}
</script>
