<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑标签' : '新建标签'"
    :confirmLoading="isEdit ? editTag$loading : addTag$loading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item label="标签类目:" required v-bind="formCol">
        <oa-select
          :options="categoryOptions"
          v-decorator="decorators.category"
          placeholder="请选择客户服务"
        ></oa-select>
      </a-form-item>
      <a-form-item label="标签名称:" required v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入标签名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="标签颜色:" required v-bind="formCol">
        <a-radio-group
          @change="handleSelectColor"
          v-decorator="decorators.color_type"
        >
          <a-radio v-for="item in colorOptions" :key="item.id" :value="item.id">
            <crm-color-tag :bgColor="item.name"></crm-color-tag>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注:" v-bind="formCol">
        <oa-textarea
          v-decorator="decorators.remarks"
          placeholder="请输入不超过50字的备注信息"
          maxlength="50"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addTag, getAddFormData, editTag, getEditFormData } from '@/api/tag'
import { rules } from './tag-edit#config'
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
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      decorators,
      show: false,
      categoryOptions: [],
      colorOptions: []
    }
  },

  computed: {},

  async: {
    addTag(data) {
      return addTag(data)
    },
    editTag(data) {
      return editTag(data)
    },
    getAddFormData(data) {
      return getAddFormData(data).then(res => {
        this.categoryOptions = res.category
        this.colorOptions = res.color_type
      })
    },
    getEditFormData(data) {
      return getEditFormData(data).then(res => {
        let info = res.info
        this.form.setFieldsValue({
          category: info.category,
          name: info.name,
          color_type: info.color_type,
          remarks: info.remarks
        })
        this.categoryOptions = res.category
        this.colorOptions = res.color_type
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getEditFormData({
        tag_id: this.id
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
          category: values.category,
          name: values.name,
          color_type: values.color_type,
          remarks: values.remarks
        }
        if (this.isEdit) {
          queryOptions = merge(queryOptions, {
            tag_id: this.id
          })
          this.editTag(queryOptions).then(res => {
            this.$message.success('编辑标签成功')
            this.show = false
            this.$emit('done')
          })
        } else {
          this.addTag(queryOptions).then(res => {
            this.$message.success('添加标签成功')
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
