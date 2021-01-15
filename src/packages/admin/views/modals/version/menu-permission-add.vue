<template>
  <oa-modal
    v-model="show"
    :title="isGray ? '添加收费（隐藏）权限组' : '添加免费权限组'"
    @ok="handlerSubmit"
    :confirmLoading="editMenuPerm$loading"
  >
    <a-form :form="form">
      <a-form-item label="版本名称" v-bind="formCol">
        <span>{{ version_name }}-{{ shop_type }}</span>
      </a-form-item>
      <a-form-item label="菜单维度" v-bind="formCol">
        <oa-tag type="menu-model" :value="menu_type"></oa-tag>
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="formCol">
        <span>{{ menu_name }}</span>
      </a-form-item>
      <a-form-item
        :label="isGray ? '收费（隐藏）权限组' : '免费权限组'"
        v-bind="formCol"
        :required="isGray ? false : true"
      >
        <oa-select
          v-decorator="decorators.perm_list"
          mode="multiple"
          :placeholder="
            isGray ? '请选择收费（隐藏）权限组' : '请选择免费权限组'
          "
          :options="permGroupList"
          :needFilterOption="false"
          @search="handleSearchPerms"
        ></oa-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  getPermGroupList,
  getMenuPermDetail,
  editMenuPerm,
  getMenuGrayPermDetail,
  editMenuGrayPerm
} from '@/api/version'

import { get, map, debounce, value } from 'lodash-es'
import { menuPermAddRules } from './menu-rules#config'
export default {
  name: '',

  components: {},

  props: {
    version_name: {
      type: String
    },
    shop_type: {
      type: String
    },
    isGray: {
      type: Boolean,
      default: false
    },
    menu_info: {
      type: Object
    },
    menu_type: {
      type: Number,
      default: 1
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(menuPermAddRules)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 8 },
        'wrapper-col': { span: 16 }
      },
      permGroupList: [],
      grayscalePermList: []
    }
  },

  computed: {
    menuPermAddRules,
    version_menu_id() {
      return get(this.menu_info, 'version_menu_id', '')
    },
    menu_name() {
      return get(this.menu_info, 'menu_name', '')
    }
  },

  async: {
    //获取权限组列表
    getPermGroupList(keywords) {
      return getPermGroupList({
        keywords,
        version_menu_id: this.version_menu_id
      })
    },
    menuPermDetail(data) {
      if (this.isGray) {
        return getMenuGrayPermDetail(data)
      } else {
        return getMenuPermDetail(data)
      }
    },
    // 获取详情
    getPermDetail() {
      this.menuPermDetail({
        version_menu_id: this.version_menu_id
      }).then(res => {
        this.permGroupList = get(res, 'perm_list', [])
        this.form.setFieldsValue({
          perm_list: map(this.permGroupList, 'id')
        })
      })
    },
    // 编辑权限组
    editMenuPerm(data) {
      if (this.isGray) {
        return editMenuGrayPerm(data)
      } else {
        return editMenuPerm(data)
      }
    }
  },

  mounted() {
    this.getPermDetail()
  },

  methods: {
    handleSearchPerms: debounce(function(keywords) {
      if (!keywords) return false
      if (!this.getPermGroupList$loading)
        this.getPermGroupList(keywords).then(res => {
          let list = res.list || []
          this.permGroupList = list.map(item => {
            return {
              id: item.perm_group_id,
              // 权限组名称添加备注
              name: `${item.perm_group_name}${
                item.perm_remarks ? '(' + item.perm_remarks + ')' : ''
              }`
            }
          })
        })
    }, 300),
    handlerSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        this.editMenuPerm({
          perm_list: values.perm_list,
          version_menu_id: this.version_menu_id
        }).then(res => {
          this.$message.success('添加成功')
          this.show = false
          this.$emit('done')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
