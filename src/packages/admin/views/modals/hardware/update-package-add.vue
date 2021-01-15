<template>
  <oa-modal
    @ok="onSubmit"
    v-model="show"
    title="更新包新增"
    :confirmLoading="addApk$loading"
  >
    <a-form :form="form">
      <a-form-item label="更新包名称" required v-bind="formCol">
        <a-input
          placeholder="请输入更新包名称"
          v-decorator="['apk_name', { rules: rules.apk_name }]"
        ></a-input>
      </a-form-item>
      <a-form-item label="更新包类型" required v-bind="formCol">
        <a-select
          placeholder="请选择更新包类型"
          v-decorator="['apk_type', { rules: rules.apk_type }]"
        >
          <a-select-option
            v-for="(type, key) in apk_type"
            :key="key"
            :value="+key"
          >
            {{ type }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="应用版本号" required v-bind="formCol">
        <a-input
          placeholder="请输入应用版本号"
          v-decorator="['version_name', { rules: rules.version_name }]"
        ></a-input>
      </a-form-item>
      <a-form-item label="设备类型" required v-bind="formCol">
        <a-select
          placeholder="请选择设备类型"
          v-decorator="['category_id', { rules: rules.category_id }]"
          @change="appVerChange"
        >
          <a-select-option
            v-for="category in category_list"
            :key="category.category_id"
            :value="category.category_id"
          >
            {{ category.category_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="产品名称" required v-bind="formCol">
        <a-select
          placeholder="请选择产品名称"
          :options="sku_list"
          v-decorator="['app_id', { rules: rules.app_id }]"
          :disabled="app_id_disable"
          @change="appIdChange"
        ></a-select>
      </a-form-item>
      <a-form-item label="version_code" required v-bind="formCol">
        <a-input
          placeholder="请输入版本编号"
          v-decorator="['app_ver', { rules: rules.app_ver }]"
        ></a-input>
      </a-form-item>
      <a-form-item label="更新包上传" required v-bind="formCol">
        <oa-hardware-file-upload
          fileType="apk"
          :disabled="!hardwareSkuId"
          :hardwareSkuId="hardwareSkuId"
          v-decorator="['url', { rules: [{ validator: uploadValidate }] }]"
          @loadingChange="loadingChange"
        ></oa-hardware-file-upload>
      </a-form-item>
      <a-form-item label="更新包说明" required v-bind="formCol">
        <a-input
          placeholder="请输入更新包说明"
          v-decorator="['description', { rules: rules.description }]"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addApk, getMapping, getCategoryList, getSkuList } from '@/api/iot'
import { rules } from './update-package#config'
import { get } from 'lodash-es'

export default {
  name: 'update-package-add',

  components: {},

  props: {},

  data() {
    return {
      form: this.$form.createForm(this),
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      show: true,
      mapping: {},
      category_list: [],
      sku_list: [],
      hardwareSkuId: 0,
      app_id_disable: true,
      fileUploading: false
    }
  },

  computed: {
    rules,
    // 更新包类型
    apk_type() {
      return get(this.mapping, 'apk_type', {})
    }
  },

  async: {
    // 初始化请求mapping和设备类型
    init() {
      return Promise.all([this.getMapping(), this.getCategoryList()])
    },
    // 获取硬件更新包类型等的映射
    getMapping() {
      return getMapping().then(res => {
        this.mapping = res
      })
    },
    // 新增硬件包
    addApk(data) {
      return addApk(data)
    },
    // 获取设备类型列表
    getCategoryList() {
      return getCategoryList().then(res => {
        this.category_list = res.list instanceof Array ? res.list : []
      })
    },
    // 获取硬件sku列表
    getSkuList(data) {
      return getSkuList(data)
    }
  },

  mounted() {
    this.init().then(() => {
      this.form.setFieldsValue({
        apk_name: undefined,
        apk_type: undefined,
        app_ver: undefined,
        app_id: undefined,
        version_name: undefined,
        description: undefined,
        url: ''
      })
    })
  },

  methods: {
    loadingChange(val) {
      console.log('fileUploading', val)
      this.fileUploading = val
    },
    /**
     * @description 文件上传验证
     */
    uploadValidate(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请上传文件')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    /**
     * @description 新增硬件包
     */
    onSubmit() {
      if (this.fileUploading) {
        this.$message.error('文件正在上传，请稍后')
        return false
      }
      this.form.validateFields((err, values) => {
        if (err) return
        let data = {
          ...values
        }
        data = Object.assign(data, {
          url_type: 1
        })
        this.addApk(data).then(res => {
          // 硬件包添加成功
          this.$success({
            title: '提示',
            content: '添加成功'
          })
          this.$emit('done')
          this.show = false
        })
      })
    },
    /**
     * @description 设备版本号改变
     * @param {number} category_id 设备类型id
     */
    appVerChange(category_id) {
      this.getSkuList({
        category_id
      }).then(res => {
        let list = res.list instanceof Array ? res.list : []
        this.sku_list = list.map(item => {
          return {
            value: item.app_id,
            label: item.app_name
          }
        })
        // 当设备类型变化时，清空硬件sku的值
        this.app_id_disable = !this.sku_list.length
        this.hardwareSkuId = undefined
        this.form.setFieldsValue({
          app_id: undefined,
          url: ''
        })
      })
    },
    /**
     * @description skuId改变
     * @param {number} app_id 硬件skuId
     */
    appIdChange(app_id) {
      this.hardwareSkuId = app_id
    }
  }
}
</script>
