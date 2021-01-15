<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑字段' : '添加字段'"
    :confirmLoading="isEdit ? editField$loading : addField$loading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item label="字段显示名称" required v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入字段显示名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="字段" required v-bind="formCol">
        <a-input
          v-decorator="decorators.fields_key"
          placeholder="请输入字段"
        ></a-input>
      </a-form-item>
      <a-form-item label="字段key" required v-bind="formCol">
        <a-input
          v-decorator="decorators.fields_unique_key"
          placeholder="请输入字段key"
        ></a-input>
      </a-form-item>
      <a-form-item label="选择类型" v-bind="formCol">
        <oa-select
          v-decorator="decorators.type"
          :options="typeOptions"
          placeholder="请选择类型"
        ></oa-select>
      </a-form-item>
      <a-form-item label="排序" v-bind="formCol">
        <a-input-number
          :min="1"
          :max="999"
          v-decorator="decorators.list_order"
          placeholder="请输入排序"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="备注" v-bind="formCol">
        <oa-textarea
          v-decorator="decorators.remark"
          placeholder="请输入备注"
        ></oa-textarea>
      </a-form-item>
      <a-form-item label="是否默认不可编辑" v-bind="formCol">
        <a-switch v-model="isDisabled" />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  editField,
  getAddFormData,
  addField,
  getEditFormData
} from '@/api/listfields'
import { rules } from './field-edit#config'
import { merge, get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String]
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      formCol: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      decorators,
      show: false,
      isDisabled: false,
      typeOptions: []
    }
  },

  computed: {},

  async: {
    addField(data) {
      return addField(data)
    },
    editField(data) {
      return editField(data)
    },
    getAddFormData(data) {
      return getAddFormData(data).then(res => {
        this.typeOptions = res.type_tips
      })
    },
    getEditFormData(data) {
      return getEditFormData(data).then(res => {
        let info = res
        console.log(Boolean(info.is_disabled))
        this.form.setFieldsValue({
          name: info.name,
          fields_key: info.fields_key,
          fields_unique_key: info.fields_unique_key,
          type: info.type,
          list_order: info.list_order,
          remark: info.remark
        })
        this.isDisabled = Boolean(res.is_disabled)
        this.typeOptions = res.type_tips
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getEditFormData({
        id: this.id
      })
    } else {
      this.getAddFormData()
    }
  },

  methods: {
    handleSelectColor() {},
    handleSubmit() {
      this.form.validate().then(values => {
        let queryOptions = {
          name: values.name,
          fields_key: values.fields_key,
          fields_unique_key: values.fields_unique_key,
          type: values.type,
          list_order: values.list_order,
          remark: values.remark,
          is_disabled: Number(this.isDisabled)
        }
        if (this.isEdit) {
          queryOptions = merge(queryOptions, {
            id: this.id
          })
          this.editField(queryOptions).then(res => {
            this.$message.success('编辑字段成功')
            this.show = false
            this.$emit('done')
          })
        } else {
          this.addField(queryOptions).then(res => {
            this.$message.success('添加字段成功')
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
