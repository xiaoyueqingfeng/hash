<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '修改' : '添加'"
    :confirmLoading="isEdit ? editApp$loading : addApp$loading"
    @ok="handlerSubmit"
  >
    <a-form :form="form">
      <a-form-item label="类型" v-bind="formCol">
        <a-radio-group v-decorator="decorators.os_type">
          <a-radio :value="item.id" v-for="item in osType" :key="item.id">
            {{ item.name }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="版本名称" v-bind="formCol">
        <a-input
          v-decorator="decorators.version_name"
          placeholder="请输入版本名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="版本号" v-bind="formCol">
        <a-input
          v-decorator="decorators.version_no"
          placeholder="请输入版本号"
        ></a-input>
      </a-form-item>
      <a-form-item label="版本code" v-bind="formCol">
        <a-input
          type="number"
          min="0"
          v-decorator="decorators.code"
          placeholder="请输入版本code"
        ></a-input>
      </a-form-item>
      <a-form-item label="系统" v-bind="formCol">
        <oa-select
          :options="systemType"
          v-decorator="decorators.system_type"
        ></oa-select>
      </a-form-item>
      <a-form-item label="链接" v-bind="formCol">
        <a-input
          v-decorator="decorators.url"
          placeholder="请输入版本链接"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './add#config'
import { addApp, editApp, getAppdetail } from '@/api/app-version'
import { get } from 'lodash-es'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: true,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      appInfo: {},
      systemType: this.system_type,
      osType: this.os_type
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true,
      default: false
    },
    id: {
      type: Number
    },
    system_type: {
      type: Array,
      default: () => []
    },
    os_type: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    if (this.isEdit) {
      return getAppdetail({ id: this.id }).then(res => {
        this.systemType = get(res, 'mapping.system_type', [])
        this.osType = get(res, 'mapping.os_type', [])
        this.appInfo = res
        this.form.setFieldsValue({
          os_type: get(this.appInfo, 'os_type'),
          version_name: get(this.appInfo, 'version_name', ''),
          version_no: get(this.appInfo, 'version_no', ''),
          code: String(get(this.appInfo, 'code')),
          system_type: get(this.appInfo, 'system_type'),
          url: get(this.appInfo, 'url', '')
        })
      })
    }
  },
  async: {
    addApp(data) {
      return addApp(data)
    },
    editApp(data) {
      return editApp(data)
    }
  },
  computed: {
    rules
  },
  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          this.editApp({ ...values, id: this.id }).then(res => {
            this.$message.success('修改成功')
            this.show = false
            this.$emit('done')
          })
        } else {
          this.addApp({ ...values }).then(res => {
            this.$message.success('添加成功')
            this.show = false
            this.$emit('done')
          })
        }
      })
    }
  }
}
</script>
