<template>
  <div class="module-add">
    <oa-panel app>
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="唯一标识" required v-bind="formCol">
              <a-input v-decorator="decorators.module_sn"></a-input>
            </a-form-item>
            <a-form-item label="模块名称" required v-bind="formCol">
              <a-input v-decorator="decorators.module_name"></a-input>
            </a-form-item>
            <a-form-item label="支持版本" required v-bind="formCol">
              <div v-show="!versionCheckBoxVisible">
                <span
                  class="mg-r8"
                  v-for="item in selectVersionList"
                  :key="item.id"
                >
                  {{ item.name }}
                </span>
                <oa-button @click="editVersionHandler">编辑</oa-button>
              </div>
              <div v-show="versionCheckBoxVisible">
                <admin-version-checkbox
                  @getVersionList="getVersionList"
                  v-decorator="decorators.support_version"
                ></admin-version-checkbox>
                <oa-button @click="onSubmitVersion">确定</oa-button>
              </div>
            </a-form-item>
            <a-form-item label="权限组" required v-bind="formCol">
              <oa-select
                v-decorator="decorators.support_permission_group"
                mode="multiple"
                placeholder="请选择权限组"
                :options="premissionList"
                :needFilterOption="false"
                @search="handleSearchPermission"
              ></oa-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row :gutter="24">
        <a-col :span="12" :offset="2">
          <a-form-item>
            <a-button
              type="primary"
              :loading="isEdit ? edit$loading : add$loading"
              @click="onSubmit"
            >
              保存
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </oa-panel>
  </div>
</template>
<script>
import { get, debounce, value, map, isEqual } from 'lodash-es'
import { rules } from './add#config'
import { getPermissionGroup, editForm, add, edit } from '@/api/module'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      formCol: {
        'label-col': { span: 4 },
        'wrapper-col': { span: 20 }
      },
      isEdit: false,
      premissionList: [],
      versionCheckBoxVisible: true,
      versionList: [],
      selectVersionList: []
    }
  },
  mounted() {
    if (this.$route.query.id != 0) {
      this.isEdit = true
      this.getEditForm()
    }
  },
  computed: {
    rules
  },
  async: {
    getPermissionGroup(query) {
      return getPermissionGroup(query).then(res => {
        let premissionList = get(res, 'list', [])
        this.premissionList = premissionList.map(item => {
          return {
            id: item.permission_group_id,
            name: item.permission_group_name,
            disabled: Boolean(item.is_disabled)
          }
        })
      })
    },
    getEditForm() {
      return editForm({ module_id: this.$route.query.id }).then(res => {
        this.versionCheckBoxVisible = false
        let premissionList = get(res, 'permission_group', [])
        this.premissionList = premissionList.map(item => {
          return {
            id: item.permission_group_id,
            name: item.permission_group_name
          }
        })
        let selectVersionList = get(res, 'version', [])
        this.selectVersionList = selectVersionList.map(item => {
          return {
            id: item.version_id,
            name: item.version_name
          }
        })
        let versionId = map(res.version, 'version_id')
        let permId = map(this.premissionList, 'id')
        this.form.setFieldsValue({
          module_sn: get(res, 'module_sn', ''),
          module_name: get(res, 'module_name', ''),
          support_version: versionId,
          support_permission_group: permId
        })
      })
    },
    add(data) {
      return add(data)
    },
    edit(data) {
      return edit(data)
    }
  },
  methods: {
    handleSearchPermission: debounce(function(keywords) {
      if (!this.selectVersionList.length || this.versionCheckBoxVisible) {
        return this.$message.error('请先选择确认版本')
      }
      if (!keywords) return false
      let params = {
        keywords: keywords,
        module_id: this.isEdit ? this.$route.query.id : undefined,
        version_id: map(this.selectVersionList, 'id')
      }
      if (!this.getPermissionGroup$loading) this.getPermissionGroup(params)
    }, 300),
    getVersionList(list) {
      this.versionList = list
    },
    editVersionHandler() {
      this.versionCheckBoxVisible = true
      this.form.validateFields(['support_version'])
    },
    onSubmitVersion() {
      this.versionCheckBoxVisible = false
      let versionIds = this.form.getFieldValue('support_version')
      this.form.setFieldsValue({
        support_version: versionIds,
        support_permission_group: []
      })
      this.premissionList = []
      this.selectVersionList = []
      this.versionList.forEach(item => {
        versionIds.forEach(id => {
          if (id === item.id) {
            this.selectVersionList.push(item)
          }
        })
      })
    },
    onSubmit() {
      this.form
        .validate()
        .then(values => {
          if (this.isEdit) {
            values.id = this.$route.query.id
            this.edit(values).then(res => {
              this.$message.success('编辑成功')
              this.$router.push({
                path: '/module/list'
              })
            })
          } else {
            this.add(values).then(res => {
              this.$message.success('添加成功')
              this.$router.push({
                path: '/module/list'
              })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.module-add {
  height: 100%;
}
</style>
