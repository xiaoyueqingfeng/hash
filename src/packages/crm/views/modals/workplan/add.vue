<template>
  <oa-modal title="新建工作" v-model="show" @ok="onSubmit">
    <a-form :form="form">
      <a-form-item
        label="客户名称"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-select
          showSearch
          placeholder="请搜索客户名称"
          :defaultActiveFirstOption="false"
          :filterOption="false"
          @search="handleSearch"
          @change="handleChange"
          :notFoundContent="fetching ? undefined : null"
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
        label="提醒时间："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-date-picker
          @change="onChange"
          showTime
          :disabledDate="disabledDate"
          style="width: 100%"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="[
            'remind_time',
            { rules: [{ required: true, message: '请选择提醒时间' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="跟进内容："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        required
      >
        <a-textarea
          :rows="3"
          placeholder="请输入不超过30字的跟进详情"
          v-decorator="['detail', { rules: [{ validator: checkText }] }]"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { searchCustomerByBrandId } from '@/api/workplan'
import debounce from 'lodash/debounce'
export default {
  name: 'AddWorkplan',
  data() {
    this.handleSearch = debounce(this.handleSearch, 400)
    return {
      show: false,
      keywords: '',
      leads_id: '',
      searchRes: [],
      fetching: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  components: {},
  props: {
    channelLevel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    this.getAllOptions()
  },
  methods: {
    checkText(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30字的跟进详情')
      } else {
        callback()
      }
    },
    disabledDate(current) {
      return current && current < moment().startOf('day')
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          let para = {
            leads_id: this.leads_id,
            remind_time: fieldsValue['remind_time'].format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            detail: fieldsValue.detail
          }
          this.$emit('emitAddWorkPlan', para)
          this.show = false
        }
      })
    },
    onChange() {},
    // 模糊搜索
    searchContact() {
      this.fetching = true
      this.keywords = this.keywords.trim() || ''
      searchCustomerByBrandId({ keywords: this.keywords }).then(res => {
        this.fetching = false
        this.searchRes = res.list instanceof Array && res.list
      })
    },
    // 第一次拿到所有结果
    getAllOptions() {
      searchCustomerByBrandId({ keywords: '' }).then(res => {
        this.searchRes = res.list instanceof Array && res.list
      })
    },
    handleSearch(value) {
      this.keywords = value
      this.searchContact()
    },
    handleChange(value) {
      this.leads_id = value
    }
  }
}
</script>
