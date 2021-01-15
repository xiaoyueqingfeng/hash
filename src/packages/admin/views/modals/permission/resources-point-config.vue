<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑权限点' : '添加权限点'"
    @ok="handlerSubmit"
    :confirmLoading="isEdit ? editPermsAction$loading : addPermsAction$loading"
  >
    <a-form :form="form">
      <a-form-item label="权限点名称" v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入权限点名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="动作" v-bind="formCol">
        <a-input
          v-decorator="decorators.alias"
          placeholder="请输入动作"
        ></a-input>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addPermsAction, editPermsAction } from '@/api/perms'
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
    },
    action_resource_id() {
      return get(this.resource, 'parent_id', '')
    },
    action_id() {
      return get(this.resource, 'id', '')
    }
  },

  async: {
    addPermsAction(data) {
      return addPermsAction(data)
    },
    editPermsAction(data) {
      return editPermsAction(data)
    }
  },

  mounted() {
    if (this.isEdit) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: get(this.resource, 'perm_name', ''),
          alias: get(this.resource, 'action_name', '')
        })
      })
    }
  },

  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!this.isEdit) {
          this.addPermsAction({
            resource_id: this.resource_id,
            ...values
          }).then(res => {
            this.$message.success('权限点添加成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.editPermsAction({
            resource_id: this.action_resource_id,
            action_id: this.action_id,
            ...values
          }).then(res => {
            this.$message.success('权限点编辑成功')
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
