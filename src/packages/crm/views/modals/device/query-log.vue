<template>
  <oa-modal
    v-model="show"
    title="日志查询"
    okText="立即导出"
    @ok="onSubmit"
    :confirmLoading="exportLogLoading"
  >
    <a-form :form="form">
      <a-form-item label="日志类型" v-bind="formCol">
        <oa-select
          :options="deviceLogType"
          v-decorator="decorators.device_log_type"
          placeholder="选择日志类型"
        ></oa-select>
      </a-form-item>
      <a-form-item label="日期" v-bind="formCol">
        <oa-date-picker
          placeholder="请选择时间"
          v-decorator="decorators.date"
        ></oa-date-picker>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { getLogType, exportLog } from '@/api/hardware.js'
import { get } from 'lodash-es'
export default {
  name: 'query-log',
  props: {
    device_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true,
      deviceLogType: [],
      form: this.$stForm.create(),
      exportLogLoading: false,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      decorators: {
        date: [
          'date',
          {
            rules: [
              {
                required: true,
                message: '请选择时间'
              }
            ]
          }
        ],
        device_log_type: [
          'device_log_type',
          {
            rules: [
              {
                required: true,
                message: '选择日志类型'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getLogType()
  },
  async: {
    getLogType() {
      return getLogType().then(res => {
        this.deviceLogType = get(res, 'device_log', {})
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate((err, values) => {
        if (!err) {
          this.exportLogLoading = true
          this.exportLog(values).then(res => {
            //回调后5s跳转文件地址
            setTimeout(() => {
              window.open(res.file_url)
              this.exportLogLoading = false
              this.show = false
            }, 5000)
          })
        }
      })
    },
    exportLog({ date, device_log_type }) {
      return exportLog({
        date: date,
        device_log_type: device_log_type,
        device_id: this.device_id
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
