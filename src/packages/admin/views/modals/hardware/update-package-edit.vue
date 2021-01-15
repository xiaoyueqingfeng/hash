<template>
  <oa-modal
    @ok="onSubmit"
    v-model="show"
    title="更新包编辑"
    :confirmLoading="editApk$loading"
  >
    <a-form :form="form">
      <a-form-item label="更新包名称" required v-bind="formCol">
        <a-input
          placeholder="请输入更新包名称"
          v-decorator="['apk_name', { rules: rules.apk_name }]"
          :disabled="only_upload_apk"
        ></a-input>
      </a-form-item>
      <a-form-item label="更新包类型" required v-bind="formCol">
        <a-select
          v-decorator="['apk_type', { rules: rules.apk_type }]"
          :disabled="only_upload_apk"
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
          :disabled="only_upload_apk"
        ></a-input>
      </a-form-item>
      <a-form-item label="设备类型" required v-bind="formCol">
        <a-select
          placeholder="请选择设备类型"
          v-decorator="['category_id', { rules: rules.category_id }]"
          :disabled="only_upload_apk"
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
          :disabled="only_upload_apk"
          @change="appIdChange"
        ></a-select>
      </a-form-item>
      <a-form-item label="version_code" required v-bind="formCol">
        <a-input
          placeholder="请输入版本编号"
          v-decorator="['app_ver', { rules: rules.app_ver }]"
          :disabled="only_upload_apk"
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
          :disabled="only_upload_apk"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { editApk, getIotDetail, getCategoryList, getSkuList } from '@/api/iot'
import { rules } from './update-package#config'
import { get } from 'lodash-es'
export default {
  name: 'update-package-edit',

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      form: this.$form.createForm(this),
      show: true,
      detail: {},
      mapping: {},
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      category_list: [],
      sku_list: [],
      category_id: '',
      hardwareSkuId: 0,
      fileUploading: false
    }
  },

  computed: {
    rules,
    // 是否仅可上传硬件包
    only_upload_apk() {
      return get(this.detail, 'only_upload_apk', false)
    },
    // 更新包类型
    apk_type() {
      return get(this.mapping, 'apk_type', {})
    }
  },

  async: {
    init(data) {
      return Promise.all([this.getIotDetail(data), this.getCategoryList()])
    },
    /**
     * @description 获取更新包详情
     */
    getIotDetail(data) {
      return getIotDetail(data).then(res => {
        this.detail = res.app_version_detail || {}
        this.mapping = res.mapping || {}
        ;(this.category_id = this.detail.category_id || undefined),
          (this.hardwareSkuId = this.detail.app_id || undefined),
          (this.app_id_disable = !!this.hardwareSkuId)
      })
    },
    /**
     * @description 获取设备类型列表
     */
    getCategoryList() {
      return getCategoryList().then(res => {
        this.category_list = res.list instanceof Array ? res.list : []
      })
    },
    /**
     * @description 获取硬件sku列表
     */
    getSkuList(data) {
      return getSkuList(data).then(res => {
        let list = res.list instanceof Array ? res.list : []
        this.sku_list = list.map(item => {
          return {
            value: item.app_id,
            label: item.app_name
          }
        })
      })
    },
    /**
     * @description 更新包编辑上传
     * @param {object} data 更新包相关更改内容
     */
    editApk(data) {
      return editApk(data)
    }
  },

  mounted() {
    this.init({
      id: this.id
    }).then(res => {
      this.getSkuList({
        category_id: this.category_id
      })
      this.form.setFieldsValue({
        apk_name: this.detail.apk_name || undefined,
        apk_type: this.detail.apk_type || undefined,
        app_ver: this.detail.app_ver || undefined,
        app_id: this.detail.app_id || undefined,
        version_name: this.detail.version_name || undefined,
        description: this.detail.description || undefined,
        url: this.detail.url || '',
        category_id: this.detail.category_id || undefined
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
     * @description 硬件skuid变化
     * @param {number} app_id skuId
     */
    appIdChange(app_id) {
      this.hardwareSkuId = app_id || 0
    },
    appVerChange(category_id) {
      this.getSkuList({
        category_id
      }).then(res => {
        // 当设备类型变化时，清空硬件sku的值
        this.app_id_disable = !this.sku_list.length
        this.form.setFieldsValue({
          app_id: undefined,
          url: ''
        })
      })
    },
    onSubmit() {
      if (this.fileUploading) {
        this.$message.error('文件正在上传，请稍后')
        return false
      }
      this.form.validateFields((err, values) => {
        if (err) return
        let data = Object.assign(values, {
          url_type: 1,
          id: this.id
        })
        this.editApk(data).then(res => {
          // 硬件包编辑成功
          this.$success({
            title: '提示',
            content: '编辑成功'
          })
          this.$emit('done')
          this.show = false
        })
      })
    }
  }
}
</script>
