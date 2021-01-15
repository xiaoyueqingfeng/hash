<template>
  <div class="add">
    <a-form :form="form" @submit="onSubmit">
      <a-form-item
        label="客户名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        v-if="!isDetail"
      >
        <a-select
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
          placeholder="请输入不超过30字的拜访详情"
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
      <a-form-item class="text-right" v-if="isDetail">
        <a-button type="primary" @click="onSubmit">发布</a-button>
      </a-form-item>
      <a-form-item class="text-right " v-else>
        <a-button type="default" @click="cancelSubmit">取消</a-button>
        <a-button
          type="primary"
          html-type="submit"
          class="inline-block margin-l8"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { searchCustomeByBrandId, getVisitOtherInfo } from '@/api/visit'
import debounce from 'lodash/debounce'
export default {
  name: 'VisitRecord',
  data() {
    this.handleSearch = debounce(this.handleSearch, 400)
    return {
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
      fetching: false
    }
  },
  props: {
    isDetail: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  beforeCreate() {},
  created() {
    if (this.isDetail) {
      getVisitOtherInfo({ leads_id: this.leads_id }).then(res => {
        this.otherInfos = res instanceof Object && res
      })
    } else {
      this.getAllOptions()
    }
  },
  methods: {
    disableVisitDate(current) {
      return current && current > moment()
    },
    checkDetailText(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30字的拜访详情')
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
    getAllOptions() {
      searchCustomeByBrandId({ keywords: '' }).then(res => {
        this.searchRes = res.list instanceof Array && res.list
      })
    },
    // 模糊搜索
    searchContact() {
      this.fetching = true
      this.keywords = this.keywords.trim() || ''
      searchCustomeByBrandId({ keywords: this.keywords }).then(res => {
        this.fetching = false
        this.searchRes = res.list instanceof Array && res.list
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
      const leads_id = !this.isDetail ? id : this.leads_id
      getVisitOtherInfo({ leads_id: leads_id }).then(res => {
        this.otherInfos = res instanceof Object && res
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
          this.$emit('addVisitData', params)
        }
      })
    }
  }
}
</script>
