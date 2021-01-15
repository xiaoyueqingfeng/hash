<template>
  <oa-modal
    v-model="show"
    :confirmLoading="addBusinesscase$loading || editBusinesscase$loading"
    :title="isEdit ? '编辑案例' : '新增案例'"
    @ok="onSubmit"
  >
    <a-form :form="form">
      <a-form-item label="唯一标识" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="[
            'sn_code',
            { rules: [], initialValue: isEdit ? editInfo.sn_code : '' }
          ]"
          placeholder="请输入唯一标识"
        />
      </a-form-item>
      <a-form-item label="案例标题" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{ validator: checkTitle }],
              initialValue: isEdit ? editInfo.title : ''
            }
          ]"
          placeholder="请输入案例标题"
        />
      </a-form-item>
      <a-form-item label="类型" required v-bind="{ labelCol, wrapperCol }">
        <oa-select
          :options="fromData.mapping.type"
          v-decorator="[
            'type',
            {
              rules: [{ required: true, message: '请选择类型' }],
              initialValue: isEdit ? editInfo.type : []
            }
          ]"
          placeholder="请选择类型"
        ></oa-select>
      </a-form-item>
      <a-form-item label="推送版本" v-bind="{ labelCol, wrapperCol }">
        <admin-version-checkbox
          v-decorator="[
            'version_id',
            {
              rules: [{ required: true, message: '请选择版本' }],
              initialValue: isEdit ? editInfo.version_id : []
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="案例简介" v-bind="{ labelCol, wrapperCol }">
        <a-textarea
          placeholder="请输入案例简介"
          v-decorator="[
            'description',
            {
              rules: [{ validator: checkDescription }],
              initialValue: isEdit ? editInfo.description : ''
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="案例链接" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="[
            'link_url',
            {
              rules: [{ validator: checkURL }],
              initialValue: isEdit ? editInfo.link_url : ''
            }
          ]"
          placeholder="请输入案例链接"
        />
      </a-form-item>
      <a-form-item label="案例图片" required v-bind="{ labelCol, wrapperCol }">
        <oa-image-upload
          isSaas
          v-decorator="[
            'picture',
            { rules: [], initialValue: isEdit ? editInfo.picture : [] }
          ]"
        ></oa-image-upload>
      </a-form-item>
      <a-form-item label="排序" v-bind="{ labelCol, wrapperCol }">
        <a-input
          type="number"
          v-decorator="[
            'list_order',
            {
              rules: [
                {
                  validator: function(rule, value, callback) {
                    if (value < 0) {
                      callback('排序不能小于0')
                    }
                    callback()
                  }
                }
              ],
              initialValue: isEdit ? editInfo.list_order : ''
            }
          ]"
          placeholder="请输入排序"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  getBusinesscaseAddFormData,
  addBusinesscase,
  editBusinesscase,
  getBusinesscaseEditFormData
} from '@/api/businesscase'
import { URL } from 'oa-core/constants/regex'
export default {
  name: 'BusinesscaseEdit',
  data() {
    return {
      show: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
      value: '',
      fromData: {
        type: [],
        mapping: { send_type: [] }
      },
      version: [],
      editInfo: {},
      isEdit: false
    }
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  created() {
    if (this.id !== -1) {
      this.isEdit = true
      this.getBusinesscaseEditFormData()
    } else {
      this.getBusinesscaseAddFormData()
    }
  },
  async: {},
  methods: {
    checkTitle(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30个字符的标题')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkDescription(rule, value, callback) {
      if (value && value.length > 15) {
        /* eslint-disable */
        callback('请输入不超过15个字符的案例简介')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkURL(rule, value, callback) {
      if (value && !URL.test(value)) {
        callback('请输入正确格式的链接')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    getBusinesscaseAddFormData() {
      return getBusinesscaseAddFormData().then(res => {
        this.fromData = res instanceof Object && res
        let obj = {}
        let arr = []
        res.version instanceof Array &&
          res.version.map(item => {
            obj.label = item.name
            obj.value = item.id
            arr.push(obj)
          })
        this.version = arr
      })
    },
    getBusinesscaseEditFormData() {
      return getBusinesscaseEditFormData({ id: this.id }).then(res => {
        this.fromData = res instanceof Object && res
        let arr = []
        res.version instanceof Array &&
          res.version.map(item => {
            let obj = {}
            obj.label = item.name
            obj.value = item.id
            arr.push(obj)
          })
        this.version = arr
        this.editInfo = res.info instanceof Object && res.info
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
        } else {
          if (this.isEdit) {
            fieldsValue.id = this.id
            this.editBusinesscase({ ...fieldsValue }).then(res => {
              this.$message.success('编辑成功')
              this.show = false
              this.$emit('success')
            })
          } else {
            this.addBusinesscase({ ...fieldsValue }).then(res => {
              this.$message.success('添加成功')
              this.show = false
              this.$emit('success')
            })
          }
        }
      })
    }
  },
  async: {
    addBusinesscase(values) {
      return addBusinesscase(values)
    },
    editBusinesscase(values) {
      return editBusinesscase(values)
    }
  }
}
</script>
