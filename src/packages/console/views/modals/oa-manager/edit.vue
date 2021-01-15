<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑版本' : '新建版本'"
    :confirmLoading="isEdit ? editAppVersion$loading : addAppVersion$loading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item label="设备类型" required v-bind="formCol">
        <oa-select
          v-decorator="decorators.device_id"
          :options="deviceOptions"
          placeholder="请选择设备类型"
        ></oa-select>
      </a-form-item>
      <a-form-item label="版本号" required v-bind="formCol">
        <a-input
          v-decorator="decorators.version"
          placeholder="请输入版本号"
        ></a-input>
      </a-form-item>
      <a-form-item label="版本名称" required v-bind="formCol">
        <a-input
          v-decorator="decorators.version_name"
          placeholder="请输入版本名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="CODE" required v-bind="formCol">
        <a-input
          v-decorator="decorators.code"
          placeholder="请输入CODE"
        ></a-input>
      </a-form-item>
      <a-form-item label="URL" v-bind="formCol">
        <a-input v-decorator="decorators.url" placeholder="请输入URL"></a-input>
      </a-form-item>
      <a-form-item label="备注" v-bind="formCol">
        <oa-textarea
          maxlength="100"
          v-decorator="decorators.remarks"
          placehloder="请输入版本说明"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { ruleOptions } from './edit#config'
import {
  getAddFormData,
  getEditFormData,
  addAppVersion,
  editAppVersion
} from '@/api/appversion'
import { get, merge } from 'lodash-es'
export default {
  name: 'oa-manager-edit',

  components: {},

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    versionId: {
      type: [Number, String]
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      decorators,
      show: false,
      deviceOptions: []
    }
  },

  computed: {},

  async: {
    editAppVersion(editInfo) {
      return editAppVersion(editInfo)
    },
    addAppVersion(info) {
      return addAppVersion(info)
    },
    getAddFormData() {
      return getAddFormData().then(res => {
        this.deviceOptions = res.device_id
      })
    },
    getEditFormData(version_id) {
      return getEditFormData({ version_id }).then(res => {
        let info = res.info
        this.form.setFieldsValue({
          device_id: get(info, 'device_id', ''),
          version: get(info, 'version', ''),
          version_name: get(info, 'version_name', ''),
          code: get(info, 'code', ''),
          url: get(info, 'url', ''),
          remarks: get(info, 'remarks', '')
        })
        this.pushStatusOptions = res.push_status
        this.deviceOptions = res.device_id
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getEditFormData(this.versionId)
    } else {
      this.getAddFormData()
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        let queryOptions = {
          device_id: values.device_id,
          version: values.version,
          version_name: values.version_name,
          remarks: values.remarks,
          url: values.url,
          code: values.code
        }
        if (this.isEdit) {
          queryOptions = merge(queryOptions, {
            id: this.versionId
          })
          this.editAppVersion(queryOptions).then(res => {
            this.$message.success('修改版本信息成功')
            this.show = false
            this.$emit('done')
          })
        } else {
          this.addAppVersion(queryOptions).then(res => {
            this.$message.success('添加版本成功')
            this.show = false
            this.$emit('done')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
