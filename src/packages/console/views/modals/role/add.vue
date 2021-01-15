<template>
  <oa-modal
    v-model="show"
    @ok="onOk"
    width="600px"
    :confirmLoading="addRole$loading"
    title="添加角色"
  >
    <a-form :form="form">
      <a-form-item
        label="角色名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.name"
          placeholder="请填写角色名称"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="角色属性"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <!-- <a-select v-decorator="decorators.role_type">
          <a-select-option v-for="(t,tid) in roleTypeMap" :value="tid" :key="tid">{{t}}</a-select-option>
        </a-select> -->
        <oa-cascader
          :options="roleTypeMap"
          change-on-select
          v-decorator="decorators.role_type"
        ></oa-cascader>
      </a-form-item>
      <a-form-item label="可用平台" v-bind="{ labelCol, wrapperCol }">
        <a-select
          mode="multiple"
          v-decorator="decorators.platform_code"
          placeholder="请填写可用平台"
        >
          <a-select-option v-for="p in platforms" :key="p.code" :value="p.code">
            {{ p.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { labelCol, wrapperCol, decorators } from './role#config'
import { addRole, getCreateRoleFormData } from '@/api/role'

export default {
  props: {
    platforms: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      labelCol,
      wrapperCol,
      form: this.$form.createForm(this),
      roleTypeMap: []
    }
  },
  computed: {
    decorators
  },
  created() {
    this.getCreateRoleFormData().then(res => {
      console.log(res)
      this.roleTypeMap = res.role_type
    })
  },
  methods: {
    onOk() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.addRole(values).then(() => {
          this.$message.success('添加角色成功！')
          this.show = false
          this.$emit('done')
        })
      })
    }
  },
  async: {
    addRole,
    getCreateRoleFormData
  }
}
</script>
