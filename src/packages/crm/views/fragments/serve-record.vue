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
          :defaultActiveFirstOption="false"
          :filterOption="false"
          :notFoundContent="fetching ? undefined : null"
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
          <a-select-option v-for="item in otherInfos.contact" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="服务类别"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        required
      >
        <a-cascader
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          :options="otherInfos.service_category"
          @change="onChange"
          placeholder="请选择服务类别"
          v-decorator="[
            'service_category_id',
            { rules: [{ required: true, message: '请选择服务类别' }] }
          ]"
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
          placeholder="请输入不超过30字的服务详情"
          :rows="4"
        />
      </a-form-item>
      <a-form-item
        label="上传附件"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <upload @upload="getFileKey" :fileName="fileName"></upload>
      </a-form-item>
      <a-form-item
        label="下次服务"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-switch
          v-model="isNextVisit"
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

      <a-form-item class="text-right" v-if="isDetail">
        <a-button type="primary" @click="onSubmit">发布</a-button>
      </a-form-item>
      <a-form-item class="text-right" v-else>
        <a-button type="default" @click="cancelSubmit">取消</a-button>
        <a-button
          type="primary"
          @click="onSubmit"
          class="inline-block margin-l8"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { searchServeCustomeByBrandId, getServeOtherInfo } from '@/api/service'
import upload from 'oa-core/views/components/file-upload'
import debounce from 'lodash/debounce'
export default {
  name: 'ServeRecord',
  data() {
    this.handleSearch = debounce(this.handleSearch, 400)
    return {
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
      isNextVisit: false,
      brand_name: '',
      keywords: '',
      curBrandId: '',
      searchRes: [],
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
      fetching: false
    }
  },
  components: { upload },
  props: {
    isDetail: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    if (this.isDetail) {
      getServeOtherInfo({ leads_id: this.leads_id }).then(res => {
        this.otherInfos = res instanceof Object && res
      })
    } else {
      this.getAllOptions()
    }
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  methods: {
    disableServiceDate(current) {
      return current && current > moment()
    },
    checkDetailText(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30字的服务详情')
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
      searchServeCustomeByBrandId({ keywords: '' }).then(res => {
        this.searchRes = res.list instanceof Array && res.list
      })
    },
    // 模糊搜索
    searchContact() {
      this.fetching = true
      this.keywords = this.keywords.trim() || ''
      searchServeCustomeByBrandId({ keywords: this.keywords }).then(res => {
        this.fetching = false
        this.searchRes = res.list instanceof Array && res.list
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
      const leads_id = !this.isDetail ? id : this.leads_id
      getServeOtherInfo({ leads_id: leads_id }).then(res => {
        this.otherInfos = res instanceof Object && res
      })
    },
    getFileKey(key) {
      this.fileKey = key
      // this.fileName = key.split('&')[1]
      let i  = key.replace(/___.*___/,'').split('/').length
      this.fileName = key.replace(/___.*___/,'').split('/')[i-1]
    },
    onChange(value) {
      // this.serviceId = value[value.length - 1]
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
          this.$emit('addServeData', params)
        }
      })
    }
  }
}
</script>
