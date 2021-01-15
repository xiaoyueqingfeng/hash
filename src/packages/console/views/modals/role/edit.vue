<template>
  <oa-modal
    v-model="show"
    @ok="onOk"
    width="600px"
    :confirmLoading="updateRole$loading"
    title="编辑角色"
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
import { updateRole, getEditRoleFormData } from '@/api/role'
import { pick } from 'lodash'

export default {
  props: {
    role: {
      type: Object,
      required: true
    },
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
    console.log('role', this.role)
    this.getEditRoleFormData().then(res => {
      this.roleTypeMap = res.role_type
    })
  },
  methods: {
    onOk() {
      this.form.validateFields((err, values) => {
        if (err) return
        const sendData = {
          id: this.role.id,
          ...values
        }
        this.updateRole(sendData).then(() => {
          this.$message.success('更新角色成功！')
          this.$emit('done')
          this.show = false
        })
      })
    }
  },
  mounted() {
    const rolePlatforms = (this.role.platform_info || []).map(r => r.code)
    console.log(pick(this.role, ['name', 'role_type']))
    this.$nextTick(() => {
      this.form.setFieldsValue({
        name: this.role['name'],
        role_type: +this.role['role_type'],
        platform_code: rolePlatforms
      })
    })
  },
  async: {
    updateRole,
    getEditRoleFormData
  }
}
</script>
