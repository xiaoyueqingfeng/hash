<template>
  <div class="serve">
    <div class="text-right pointer" v-if="detail_auth['web/service/add']">
      <p
        class="light-blue margin-b8"
        @click="isAddServeVisible = !isAddServeVisible"
      >
        {{ !isAddServeVisible ? '添加服务记录' : '取消添加' }}
      </p>
    </div>
    <a-form :form="form" @submit="onSubmit" v-if="isAddServeVisible">
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
          @change="onChange"
          placeholder="请选择请选择点选结果"
          v-decorator="[
            'service_category_id',
            { rules: [{ required: true, message: '请选择请选择点选结果' }] }
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
        <upload @upload="getFileKey" :fileName="fileName"></upload>
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
        <a-form-item>
          <a-button
            type="primary"
            @click="onSubmit"
            :loading="addServe$loading"
          >
            发布
          </a-button>
        </a-form-item>
        <!-- <slot name="footer" v-else>
          <a-button type="default" @click="cancelSubmit">取消</a-button>
          <a-button type="primary" @click="onSubmit" class="inline-block margin-l8">确定</a-button>
        </slot>-->
      </div>
    </a-form>
    <detailServeItem :serveInfo="serveData" @textValue="saveTextValue" />
    <div class="text-right margin-t16" v-if="serveData.length > 0">
      <a-pagination
        simple
        :defaultCurrent="pagination.current"
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        @change="pageChange"
      />
    </div>
  </div>
</template>
<script>
import detailServeItem from './serve-item'
import addServeRecord from '@/views/fragments/serve-record'
import {
  addServe,
  addServeComment,
  searchServeCustomeByBrandId,
  getServeOtherInfo
} from '@/api/service'
import { getDetailDetailServeInfo } from '@/api/leads'
import { getCallList } from '@/api/udesk'
import upload from 'oa-core/views/components/file-upload'
import debounce from 'lodash/debounce'
import { get } from 'lodash-es'
export default {
  name: 'Serve',
  data() {
    this.handleSearch = debounce(this.handleSearch, 400)
    return {
      serveData: [],
      isAddServeVisible: false, // 是否显示添加服务记录
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      },
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
      serviceCallList: []
    }
  },
  components: {
    detailServeItem,
    addServeRecord,
    upload
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    },
    detail_auth: function() {
      return this.$store.state.leads.detail_auth
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.getServeInfo()
    setTimeout(() => {
      if (this.detail_auth['web/service/add']) {
        getServeOtherInfo({ leads_id: this.leads_id }).then(res => {
          this.otherInfos = res
        })
      }
    }, 1000)
  },
  methods: {
    serviceDateChange(service_time) {
      if (!service_time) {
        this.callListShow = false
        return false
      }
      this.getCallList({
        service_time: service_time.format('YYYY-MM-DD HH:mm:ss')
      })
    },
    disableServiceDate(current) {
      return current && current > moment()
    },
    getServeInfo() {
      getDetailDetailServeInfo({
        leads_id: this.leads_id,
        p: this.pagination.current,
        ps: this.pagination.pageSize
      }).then(res => {
        this.serveData = res.list
        this.pagination.total = res.pager.t
      })
    },
    addCommentData(para) {
      addServeComment({ ...para }).then(res => {
        this.getServeInfo()
      })
    },
    saveTextValue(para) {
      let params = {
        service_record_id: para.id,
        detail: para.detail
      }
      this.addCommentData(params)
    },
    pageChange(p) {
      this.pagination.current = p
      this.getServeInfo()
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
    disabledDate(current) {
      return current && current < moment().startOf('day')
    },
    getAllOptions() {
      searchServeCustomeByBrandId({ keywords: '' }).then(res => {
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
      const leads_id = this.leads_id
      getServeOtherInfo({ leads_id: leads_id }).then(res => {
        this.otherInfos = res
      })
    },
    getFileKey(key) {
      this.fileKey = key
      // this.fileName = key.split('&')[1]
      let i = key.replace(/___.*___/, '').split('/').length
      this.fileName = key.replace(/___.*___/, '').split('/')[i - 1]
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
          if (this.callListShow) {
            params.call_id = fieldsValue.call_id
          }
          this.addServe(params).then(res => {
            this.isAddServeVisible = false
            this.$message.success('添加成功')
            this.getServeInfo()
          })
        }
      })
    }
  },
  async: {
    addServe(params) {
      return addServe(params)
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
  }
}
</script>
<style lang="less" scoped>
.serve {
  padding: 0 16px;
}
</style>
