<template>
  <oa-modal
    v-model="show"
    @ok="onSubmit"
    :title="!isEdit ? '注册设备' : '编辑设备'"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="getDeviceInfo$loading">
      <a-form :form="form">
        <a-form-item label="设备ID" required v-bind="formCol">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-input
                placeholder="请输入设备ID"
                v-decorator="['device_id', { rules: rules.device_id }]"
              ></a-input>
            </a-col>
            <a-col>
              <a-button type="primary" @click="onCreateDeviceId">
                生成设备ID
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="设备类型" required v-bind="formCol">
          <a-select
            placeholder="请选择设备类型"
            v-decorator="['device_type', { rules: rules.device_type }]"
            @change="onDeviceTypeChange"
          >
            <a-select-option
              v-for="device_type in mapping.type"
              :key="device_type.id"
              :value="device_type.id"
            >
              {{ device_type.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择产品" required v-bind="formCol">
          <a-select
            placeholder="请选择产品"
            v-decorator="['product_id', { rules: rules.product_id }]"
            @change="onProductChange"
          >
            <a-select-option
              v-for="product in productList"
              :key="product.product_id"
              :value="product.product_id"
            >
              {{ product.product_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="产品名称"
          required
          v-bind="formCol"
          v-if="product_name"
        >
          {{ product_name }}
        </a-form-item>
      </a-form>
    </a-spin>
  </oa-modal>
</template>

<script>
import {
  getDeviceInfo,
  getDeviceTypeProductList,
  addDevice,
  editDevice,
  createDeviceId
} from '@/api/device'
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
      productList: [],
      show: true, // 弹窗是否显示
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      product_name: ''
    }
  },

  computed: {
    rules,
    confirmLoading() {
      return this.isEdit ? this.editDevice$loading : this.addDevice$loading
    }
  },

  async: {
    // 获取供应商详情
    getDeviceInfo(data) {
      return getDeviceInfo(data).then(res => {
        this.info = get(res, 'info', {})
      })
    },
    getDeviceTypeProductList(data) {
      return getDeviceTypeProductList(data).then(res => {
        this.productList = get(res, 'list', [])
      })
    },
    // 新增供应商
    addDevice(data) {
      return addDevice(data).then(() => {
        this.$success({
          title: '提示',
          content: '新增设备成功'
        })
        this.$emit('success')
        this.show = false
      })
    },
    // 编辑供应商
    editDevice(data) {
      return editDevice(data).then(() => {
        this.$success({
          title: '提示',
          content: '编辑设备成功'
        })
        this.$emit('success')
        this.show = false
      })
    },
    createDeviceId(data) {
      return createDeviceId(data).then(res => {
        return get(res.info, 'device_id', {})
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getDeviceInfo({ device_id: this.id }).then(res => {
        this.getDeviceTypeProductList({
          device_type: this.info.device_type
        }).then(res => {
          this.form.setFieldsValue({
            device_id: this.info.device_id,
            device_type: this.info.device_type,
            product_id: this.info.product_id
          })
          this.product_name = this.info.product_name
        })
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
          this.editDevice({ ...values, id: this.info.id })
        } else {
          this.addDevice({
            ...values
          })
        }
      })
    },
    onCreateDeviceId() {
      this.createDeviceId().then(res => {
        this.form.setFieldsValue({
          device_id: res
        })
      })
    },
    onDeviceTypeChange(device_type) {
      this.getDeviceTypeProductList({
        device_type
      })
    },
    onProductChange(product_id) {
      let product = this.productList.filter(i => i.product_id === product_id)[0]
      this.product_name = get(product, 'product_name', '')
    }
  }
}
</script>
