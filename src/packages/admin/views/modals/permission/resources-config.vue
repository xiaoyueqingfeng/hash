<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑资源' : '添加资源'"
    @ok="handlerSubmit"
    :confirmLoading="isEdit ? editResource$loading : addResource$loading"
  >
    <a-form :form="form">
      <a-form-item label="资源名称" v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入资源名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="资源标识" v-bind="formCol">
        <a-input
          v-decorator="decorators.alias"
          placeholder="请输入资源标识"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addResource, editResource } from '@/api/perms'
import { get } from 'lodash-es'
import { resourcesRules } from './rules#config'
export default {
  name: '',

  components: {},

  props: {
    resource: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(resourcesRules)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      }
    }
  },

  computed: {
    resourcesRules,
    resource_id() {
      return get(this.resource, 'id', '')
    }
  },

  async: {
    addResource(data) {
      return addResource(data)
    },
    editResource(data) {
      return editResource(data)
    }
  },

  mounted() {
    if (this.isEdit) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: get(this.resource, 'name', ''),
          alias: get(this.resource, 'alias', '')
        })
      })
    }
  },

  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!this.isEdit) {
          this.addResource(values).then(res => {
            this.$message.success('资源添加成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.editResource({
            resource_id: this.resource_id,
            ...values
          }).then(res => {
            this.$message.success('资源编辑成功')
            this.$emit('done')
            this.show = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
