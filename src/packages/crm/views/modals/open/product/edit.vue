<template>
  <oa-modal
    v-model="show"
    @ok="onSubmit"
    :title="!isEdit ? '新增产品' : '编辑产品'"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="getProductInfo$loading">
      <a-form :form="form">
        <a-form-item label="产品名称" required v-bind="formCol">
          <a-input
            placeholder="请输入自定义产品名称"
            v-decorator="['product_name', { rules: rules.product_name }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="设备类型" required v-bind="formCol">
          <a-select
            placeholder="请选择设备类型"
            v-decorator="['type', { rules: rules.type }]"
            @change="onTypeChange"
          >
            <a-select-option
              v-for="type in mapping.type"
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择供应商" required v-bind="formCol">
          <a-select
            placeholder="请选择供应商"
            v-decorator="['supplier_id', { rules: rules.supplier_id }]"
            :disabled="isEdit"
            @change="onSupplierChange"
          >
            <a-select-option
              v-for="supplier in supplierList"
              :key="supplier.id"
              :value="supplier.id"
            >
              {{ supplier.supplier_no }}&nbsp;{{ supplier.supplier_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="供应商名称"
          required
          v-bind="formCol"
          v-if="supplier_name"
        >
          {{ supplier_name }}
        </a-form-item>
        <a-form-item
          label="供应商型号"
          required
          v-bind="formCol"
          v-if="modelList.length"
        >
          <a-select
            placeholder="请选择供应商型号"
            v-decorator="['model', { rules: rules.model }]"
          >
            <a-select-option
              v-for="model in modelList"
              :key="model.model_id"
              :value="model.model_id"
            >
              {{ model.model_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </oa-modal>
</template>

<script>
import {
  getProductInfo,
  getProductSupplierList,
  getProductModelType,
  addProduct,
  editProduct
} from '@/api/product'
import { rules } from './edit#config'
import { get } from 'lodash-es'
export default {
  name: 'hardware-edit',

  components: {},

  props: {
    id: {
      type: Number
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    mapping: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    const form = this.$stForm.create()
    return {
      form,
      info: {},
      supplierList: [],
      modelList: [],
      show: true, // 弹窗是否显示
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      supplier: {},
      type: ''
    }
  },

  computed: {
    rules,
    confirmLoading() {
      return this.isEdit ? this.editProduct$loading : this.addProduct$loading
    },
    supplier_id() {
      return get(this.supplier, 'id', '')
    },
    supplier_name() {
      return get(this.supplier, 'supplier_name', '')
    }
  },
  watch: {},

  async: {
    // 获取硬件详情
    getProductInfo() {
      return getProductInfo({
        id: this.id
      }).then(res => {
        this.info = get(res, 'info', {})
        this.form.setFieldsValue({
          product_name: this.info.product_name,
          supplier_id: this.info.supplier_id,
          type: this.info.type
        })
        this.type = this.info.type
        this.onSupplierChange(this.info.supplier_id)
      })
    },
    getProductSupplierList() {
      return getProductSupplierList().then(res => {
        this.supplierList = get(res, 'list', [])
      })
    },
    getProductModelType(data) {
      return getProductModelType(data).then(res => {
        this.modelList = get(res, 'list', [])
      })
    },
    addProduct(data) {
      return addProduct(data).then(res => {
        this.$success({
          title: '提示',
          content: '新增产品成功'
        })
        this.$emit('success')
        this.show = false
      })
    },
    editProduct(data) {
      return editProduct(data).then(res => {
        this.$success({
          title: '提示',
          content: '编辑产品成功'
        })
        this.$emit('success')
        this.show = false
      })
    }
  },

  mounted() {
    this.getProductSupplierList().then(async res => {
      if (this.isEdit) {
        await this.getProductInfo()
        await this.getProductModelType({
          supplier_id: this.supplier_id,
          type: this.type
        })
        this.form.setFieldsValue({
          model: this.info.model
        })
      }
    })
  },

  methods: {
    onTypeChange(type) {
      this.type = type
      if (!this.supplier_id) return false
      this.getProductModelType({
        supplier_id: this.supplier_id,
        type: this.type
      })
    },
    onSupplierChange(supplier) {
      let supplierObjs = this.supplierList.filter(i => i.id === supplier)
      this.supplier = supplierObjs.length ? supplierObjs[0] : {}
      if (!this.type) return false
      this.getProductModelType({
        supplier_id: this.supplier_id,
        type: this.type
      })
    },
    onSubmit() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          this.editProduct({
            ...values,
            product_id: this.id,
            supplier_id: undefined
          })
        } else {
          this.addProduct(values)
        }
      })
    }
  }
}
</script>
