<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑权限组' : '添加权限组'"
    @ok="handlerSubmit"
    :confirmLoading="isEdit ? editPermGroups$loading : addPermGroups$loading"
  >
    <a-form :form="form">
      <a-form-item label="权限组名称" v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入权限组名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="备注" v-bind="formCol">
        <a-textarea
          v-decorator="['remarks']"
          placeholder="请输入备注信息"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addPermGroups, editPermGroups } from '@/api/perm-groups'
import { get } from 'lodash-es'
import { permRules } from './rules#config'
export default {
  name: '',

  components: {},

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    permission: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(permRules)
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
    permRules,
    gid() {
      return get(this.permission, 'id', '')
    }
  },

  async: {
    addPermGroups(data) {
      return addPermGroups(data)
    },
    editPermGroups(data) {
      return editPermGroups(data)
    }
  },

  mounted() {
    if (this.isEdit) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: get(this.permission, 'name', ''),
          remarks: get(this.permission, 'remarks', '')
        })
      })
    }
  },

  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!this.isEdit) {
          this.addPermGroups(values).then(res => {
            this.$message.success('权限添加成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.editPermGroups({
            gid: this.gid,
            ...values
          }).then(res => {
            this.$message.success('权限编辑成功')
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
