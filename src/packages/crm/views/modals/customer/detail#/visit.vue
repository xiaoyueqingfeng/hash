<template>
  <div class="visit">
    <div class="text-right pointer" v-if="detail_auth['web/visit/add']">
      <p class="light-blue margin-b8" @click="changeAddVisitVisible">
        {{ !isAddVisitVisible ? '添加拜访记录' : '取消添加' }}
      </p>
    </div>
    <!-- <addVisitRecord v-if="isAddVisitVisible" @addVisitData="submitAddVisit" :isDetail="true"/> -->
    <a-form :form="form" v-if="isAddVisitVisible" @submit="onSubmit">
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
          @change="vistDateChange"
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
      <div class="text-right">
        <a-form-item>
          <a-button
            type="primary"
            :loading="addVisit$loading"
            @click="onSubmit"
          >
            发布
          </a-button>
        </a-form-item>
        <!-- <slot name="footer" v-else>
          <a-button type="default" @click="cancelSubmit" class="margin-r8">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </slot>-->
      </div>
    </a-form>
    <detailVisitItem :visitInfo="visitData" @textValue="saveTextValue" />
    <div class="text-right margin-t16" v-if="visitData.length > 0">
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
import detailVisitItem from './visit-item'
import addVisitRecord from '@/views/fragments/visit-record'
import { getDetailVisitInfo } from '@/api/leads'
import {
  addVisit,
  addComment,
  searchCustomeByBrandId,
  getVisitOtherInfo
} from '@/api/visit'
import { getCallList } from '@/api/udesk'
import { addAccompany } from '@/api/accompany'
import { get } from 'lodash-es'

export default {
  name: 'Visit',
  data() {
    return {
      visitData: [],
      isAddVisitVisible: false, // 是否显示添加拜访记录
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      },
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
      visitCallList: [],
      defaultVisitModel: null
    }
  },
  components: {
    detailVisitItem,
    addVisitRecord
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    },
    detail_auth: function() {
      return this.$store.state.leads.detail_auth
    }
  },
  async: {
    addVisit(params) {
      return addVisit(params).then(res => {
        this.isAddVisitVisible = false
        this.getVisitInfo()
      })
    },
    getCallList(params) {
      return getCallList(params)
        .then(res => {
          this.vistCallList = get(res, 'list', [])
          this.callListShow = true
        })
        .catch(err => {
          this.callListShow = true
        })
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.getVisitInfo()
    setTimeout(() => {
      if (this.detail_auth['web/visit/add']) {
        getVisitOtherInfo({ leads_id: this.leads_id }).then(res => {
          this.otherInfos = res instanceof Object && res
          this.defaultVisitModel = res.visit_record_model_default || null
        })
      }
    }, 1000)
  },
  methods: {
    changeAddVisitVisible() {
      this.isAddVisitVisible = !this.isAddVisitVisible
      if (this.isAddVisitVisible) {
        setTimeout(() => {
          this.form.setFieldsValue({
            model: this.defaultVisitModel,
            'visit-picker': moment()
          })
        })
      }
    },
    vistDateChange(visit_time) {
      console.log('vistDateChange', vistDateChange)
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
    disableVisitDate(current) {
      return current && current > moment()
    },
    getVisitInfo() {
      getDetailVisitInfo({
        leads_id: this.leads_id,
        leads_detail: 1,
        p: this.pagination.current,
        ps: this.pagination.pageSize
      }).then(res => {
        this.visitData = res.list instanceof Array && res.list
        this.pagination.total = res.pager.t
      })
    },
    addAccompanyData(para) {
      addAccompany(para).then(res => {
        this.getVisitInfo()
      })
    },
    addCommentData(para) {
      addComment(para).then(res => {
        this.getVisitInfo()
      })
    },
    saveTextValue(para) {
      let params = {
        visit_record_id: para.visit_record_id,
        detail: para.detail
      }
      if (para.curLabel === 'accompany') {
        this.addAccompanyData(params)
      } else {
        this.addCommentData(params)
      }
    },
    // submitAddVisit(params) {
    //   addVisit({ ...params }).then(res => {
    //     this.isAddVisitVisible = false
    //     this.$message.success('添加成功')
    //     this.getVisitInfo()
    //   })
    // },
    pageChange(p) {
      this.pagination.current = p
      this.getVisitInfo()
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
      const leads_id = this.leads_id
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
          if (this.callListShow) {
            params.call_id = fieldsValue.call_id
          }
          this.addVisit({ ...params }).then(() => {
            this.$message.success('添加成功')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.visit {
  padding: 0 16px;
}
</style>
