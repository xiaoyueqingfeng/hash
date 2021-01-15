<template>
  <oa-modal
    v-model="show"
    :title="modalTitle"
    :confirmLoading="isEdit ? editMenu$loading : addMenu$loading"
    @ok="handlerSubmit"
  >
    <a-form :form="form">
      <a-form-item label="版本名称" v-bind="formCol">
        <span>{{ version_name }}-{{ shop_type }}</span>
      </a-form-item>
      <a-form-item label="菜单维度" v-bind="formCol">
        <oa-tag type="menu-model" :value="menu_type"></oa-tag>
      </a-form-item>
      <a-form-item v-if="showParent" label="父菜单名称" v-bind="formCol">
        {{ parent_menu_name }}
      </a-form-item>
      <a-form-item
        :label="showParent ? '子菜单名称' : '菜单名称'"
        v-bind="formCol"
        required
      >
        <oa-select
          v-decorator="decorators.menu_id"
          placeholder="请选择菜单"
          :options="versionMenuList"
          :needFilterOption="false"
          @change="onSelectMenu"
          @search="handleSearchMenu"
        ></oa-select>
      </a-form-item>
      <a-form-item label="自定义名称" v-bind="formCol" required>
        <a-input
          v-decorator="decorators.aliases"
          placeholder="请输入自定义菜单名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="侧边栏状态" v-bind="formCol">
        <a-radio-group v-decorator="decorators.is_hidden">
          <a-radio-button :value="0">显示</a-radio-button>
          <a-radio-button :value="1">隐藏</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="排序" v-bind="formCol" required>
        <a-input-number
          v-decorator="decorators.menu_weight"
          placeholder="请输入排序"
          style="width: 320px"
          :max="999"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="是否升级提示" v-bind="formCol">
        <oa-select
          :options="alertOptions"
          v-decorator="decorators.upgrade_hints"
        ></oa-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  getVersionMenuList,
  getVersionMenuInfo,
  versionAddMenu,
  editVersionMenu
} from '@/api/version'
import { get, debounce } from 'lodash-es'
import { menuRules } from './menu-rules#config'
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
    version_id: {
      type: [Number, String]
    },
    parent_menu_id: {
      type: [Number, String]
    },
    version_menu_id: {
      type: [Number, String]
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    menu_type: {
      type: Number,
      default: 1
    },
    is_multi: {
      type: [Number, String]
    },
    modalTitle: {
      type: String,
      default: '添加菜单'
    },
    showParent: {
      type: Boolean,
      default: false
    },
    parent_menu_name: {
      type: String
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(menuRules)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      aliasMenuList: [],
      versionMenuList: [],
      alertOptions: [
        {
          id: 0,
          name: '无提示'
        },
        {
          id: 1,
          name: '有提示'
        }
      ]
    }
  },

  computed: {
    menuRules
  },

  async: {
    //获取菜单列表（中心化）
    getMenuList(keywords) {
      return getVersionMenuList({ keywords }).then(res => {
        let list = res.list || []
        this.aliasMenuList = res.list || []
        this.versionMenuList = list.map(item => {
          return {
            id: item.id,
            name: item.remarks
              ? `${item.menu_name}（${item.remarks}/${item.menu_sn}）`
              : `${item.menu_name}（${item.menu_sn}）`
          }
        })
      })
    },
    //获取(子)菜单详情
    versionMenuInfo(data) {
      return getVersionMenuInfo(data)
    },
    getMenuInfo() {
      this.versionMenuInfo({ version_menu_id: this.version_menu_id }).then(
        res => {
          this.versionMenuList = [
            {
              id: get(res.info, 'menu_id', null),
              name:
                get(res.info, 'menu_name', '') +
                '（' +
                get(res.info, 'remarks', '') +
                '）'
            }
          ]
          this.form.setFieldsValue({
            menu_id: get(res.info, 'menu_id', null),
            aliases: get(res.info, 'aliases', ''),
            menu_weight: get(res.info, 'menu_weight', ''),
            upgrade_hints: get(res.info, 'upgrade_hints', ''),
            is_hidden: get(res.info, 'is_hidden')
          })
        }
      )
    },
    //添加(子)菜单
    addMenu(data) {
      return versionAddMenu(data)
    },
    //编辑(子)菜单
    editMenu(data) {
      return editVersionMenu(data)
    },
    // 编辑初始化
    initData() {
      if (this.isEdit) {
        this.getMenuInfo()
      }
    }
  },

  created() {
    this.initData()
  },
  mounted() {},

  methods: {
    handleSearchMenu: debounce(function(keywords) {
      if (!keywords) return false
      if (!this.getMenuList$loading) this.getMenuList(keywords)
    }, 300),
    onSelectMenu(id) {
      if (id) {
        let name = this.aliasMenuList.find(item => item.id === id).menu_name
        this.form.setFieldsValue({
          aliases: name
        })
      } else {
        this.form.setFieldsValue({
          aliases: ''
        })
      }
    },
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!this.isEdit) {
          this.addMenu({
            ...values,
            parent_id: this.parent_menu_id,
            menu_type: this.menu_type,
            version_id: this.version_id,
            is_multi: this.is_multi
          }).then(res => {
            this.$message.success('添加菜单成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.editMenu({
            version_menu_id: this.version_menu_id,
            ...values,
            menu_type: this.menu_type,
            version_id: this.version_id,
            parent_id: this.parent_menu_id,
            is_multi: this.is_multi
          }).then(res => {
            this.$message.success('编辑菜单成功')
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
