<template>
  <oa-modal
    v-model="show"
    title="添加权限点"
    @ok="handlerSubmit"
    :confirmLoading="setPermGroupsPerms$loading"
  >
    <a-form :form="form">
      <a-form-item label="权限名称" v-bind="formCol">
        <a-input :defaultValue="permName" disabled></a-input>
      </a-form-item>
      <a-form-item label="权限点" v-bind="formCol" required>
        <oa-select
          v-decorator="['perm_ids']"
          mode="multiple"
          placeholder="请选择权限"
          :options="premissionList"
          :needFilterOption="false"
          @search="handleSearchPermission"
        ></oa-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  getPermGroupPerms,
  getSinglePermGroupsPerms,
  setPermGroupsPerms
} from '@/api/perm-groups'
import { get, map, debounce } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    permission: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    const form = this.$stForm.create()
    return {
      show: false,
      form,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      defaultPremissionPointSelectIds: [],
      premissionList: []
    }
  },

  computed: {
    gid() {
      return get(this.permission, 'id', '')
    },
    permName() {
      return get(this.permission, 'name', '')
    }
  },

  async: {
    //查询所有可用权限点
    getPermGroupPerms(keyword) {
      return getPermGroupPerms({ keyword }).then(res => {
        this.premissionList = Array.isArray(res) ? res : []
        // if (this.gid) this.getSinglePermGroupsPerms({ gid: this.gid })
      })
    },
    //查询单个权限组已经选择的权限点
    getSinglePermGroupsPerms(id) {
      return getSinglePermGroupsPerms(id).then(res => {
        let permissionDefaultList = res
        this.defaultPremissionPointSelectIds = map(permissionDefaultList, 'id')
        this.premissionList = Array.isArray(res) ? res : []
        this.form.setFieldsValue({
          perm_ids: this.defaultPremissionPointSelectIds
        })
      })
    },
    setPermGroupsPerms(data) {
      return setPermGroupsPerms(data)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.getSinglePermGroupsPerms({
        gid: this.gid
      })
    },
    handleSearchPermission: debounce(function(keyword) {
      if (!keyword) return false
      if (!this.getPermGroupPerms$loading) this.getPermGroupPerms(keyword)
    }, 300),
    handlerSubmit() {
      this.form.validate().then(values => {
        this.setPermGroupsPerms({
          gid: this.gid,
          ...values
        }).then(res => {
          this.$message.success('权限点添加成功')
          this.$emit('done')
          this.show = false
        })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
