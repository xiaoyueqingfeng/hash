<template>
  <oa-modal
    @ok="onSubmit"
    v-model="show"
    :title="isEdit ? '编辑版本' : '新增版本'"
  >
    <a-form :form="form">
      <a-form-item label="系统" v-bind="{ labelCol, wrapperCol }">
        <a-tag color="#1890ff">Saas Pro</a-tag>
      </a-form-item>
      <a-form-item label="版本SN" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="decorators.version_sn"
          placeholder="请输入版本SN"
          :disabled="isEdit"
        ></a-input>
      </a-form-item>
      <a-form-item label="版本名称" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="decorators.version_name"
          placeholder="请输入版本名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="运营模式" required v-bind="{ labelCol, wrapperCol }">
        <oa-select
          :options="mappings.work_model"
          v-decorator="decorators.work_model"
        ></oa-select>
      </a-form-item>
      <a-form-item label="系统版本" required v-bind="{ labelCol, wrapperCol }">
        <oa-select
          :options="mappings.version_level"
          v-decorator="decorators.version_level"
        ></oa-select>
      </a-form-item>
      <a-form-item
        label="是否支持单门店"
        :required="!isEdit"
        v-bind="{ labelCol, wrapperCol }"
      >
        <oa-select
          :options="mappings.is_support_single_shop"
          v-decorator="decorators.is_support_single_shop"
          :disabled="isEdit"
        ></oa-select>
      </a-form-item>
      <a-form-item
        label="是否允许售卖"
        required
        v-bind="{ labelCol, wrapperCol }"
      >
        <oa-select
          :options="mappings.sale_type"
          v-decorator="decorators.is_sale"
        ></oa-select>
      </a-form-item>
      <a-form-item label="版本说明" v-bind="{ labelCol, wrapperCol }">
        <oa-textarea
          maxlength="30"
          v-decorator="decorators.description"
          placehloder="请输入版本说明"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { rules } from './add#config'
import { mapActions } from 'vuex'
import {
  addVersion,
  editVersion,
  versionAddForm,
  versionEditForm
} from '@/api/version'

export default {
  props: {
    version_id: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: true,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      form,
      decorators,
      mappings: {}
    }
  },
  computed: {
    rules
  },
  async: {
    // 添加版本
    addVersion(data) {
      return addVersion(data)
    },
    // 编辑版本
    editVersion(data) {
      return editVersion(data)
    },
    // 新增版本表单
    getAddFormData() {
      return versionAddForm().then(res => {
        this.mappings = res.mappings || {}
      })
    },
    // 编辑版本表单
    getEditFormData() {
      return versionEditForm({ id: this.version_id }).then(res => {
        this.mappings = res.mappings || {}
        this.form.setFieldsValue({
          ...res.info
        })
      })
    }
  },
  created() {
    if (this.isEdit) {
      this.getEditFormData()
    } else {
      this.getAddFormData()
    }
  },
  methods: {
    ...mapActions('admin', ['getVersionList']),
    onSubmit() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          this.editVersion({ ...values, id: this.version_id }).then(res => {
            this.$message.success('修改成功')
            this.show = false
            this.$emit('done')
          })
        } else {
          this.addVersion({ ...values }).then(res => {
            // 成功后更新vuex版本列表
            this.getVersionList()
            this.$message.success('创建成功')
            this.show = false
            this.$emit('done')
          })
        }
      })
    }
  }
}
</script>
