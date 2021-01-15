<template>
  <oa-modal
    v-model="show"
    @ok="onSubmit"
    :title="!isEdit ? '新增供应商' : '编辑供应商'"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="getSupplierInfo$loading">
      <a-form :form="form">
        <a-form-item label="账户ID" required v-bind="formCol" v-if="isEdit">
          {{ info.identifier }}
        </a-form-item>
        <a-form-item label="供应商编号" required v-bind="formCol" v-if="isEdit">
          {{ info.supplier_no }}
        </a-form-item>
        <a-form-item label="供应商名称" required v-bind="formCol">
          <a-input
            placeholder="请输入供应商名称"
            v-decorator="['supplier_name', { rules: rules.supplier_name }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="备注" required v-bind="formCol">
          <oa-textarea
            placeholder="请输入备注"
            v-decorator="['remarks', { rules: rules.remarks }]"
            rows="3"
            maxlength="200"
          ></oa-textarea>
        </a-form-item>
      </a-form>
    </a-spin>
  </oa-modal>
</template>

<script>
import { getSupplierInfo, addSupplier, editSupplier } from '@/api/supplier'
import { rules } from './edit#config'
import { get } from 'lodash-es'
export default {
  name: 'hardware-edit',

  components: {},

  props: {
    id: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const form = this.$stForm.create()
    return {
      form,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      info: {},
      show: true
    }
  },

  computed: {
    rules,
    confirmLoading() {
      return !this.isEdit ? this.addSupplier$loading : this.editSupplier$loading
    }
  },

  async: {
    // 获取供应商详情
    getSupplierInfo(data) {
      return getSupplierInfo(data).then(res => {
        this.info = get(res, 'info', {})
        this.form.setFieldsValue({
          supplier_name: this.info.supplier_name,
          remarks: this.info.remarks
        })
      })
    },
    // 新增供应商
    addSupplier(data) {
      return addSupplier(data).then(() => {
        this.$success({
          title: '提示',
          content: '新增供应商成功'
        })
        this.$emit('success')
        this.show = false
      })
    },
    // 编辑供应商
    editSupplier(data) {
      return editSupplier(data).then(() => {
        this.$success({
          title: '提示',
          content: '编辑应商成功'
        })
        this.$emit('success')
        this.show = false
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getSupplierInfo({
        id: this.id
      })
    }
  },

  methods: {
    /**
     * @description 提交硬件更新或硬件绑定
     */
    onSubmit() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          let params
          params = {
            id: this.id,
            ...values
          }
          this.editSupplier(params)
        } else {
          this.addSupplier(values)
        }
      })
    }
  }
}
</script>
