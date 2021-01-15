<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑菜单' : '添加菜单'"
    :confirmLoading="isEdit ? editMenu$loading : addMenu$loading"
    @ok="handlerSubmit"
  >
    <a-form :form="form">
      <a-form-item label="菜单标识" v-bind="formCol" required>
        <a-input
          v-decorator="decorators.sn"
          placeholder="请输入菜单标识"
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="formCol">
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入菜单名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单URL" v-bind="formCol">
        <a-input
          v-decorator="decorators.url"
          placeholder="请输入菜单URL"
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单icon" v-bind="formCol">
        <a-input
          v-decorator="decorators.icon"
          placeholder="请输入菜单icon"
        ></a-input>
      </a-form-item>
      <a-form-item label="备注" v-bind="formCol">
        <oa-textarea
          v-decorator="decorators.remarks"
          placeholder="请输入备注"
          maxlength="30"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { getMenuInfo, addMenu, editMenu } from '@/api/menu'
import { get } from 'lodash-es'
import { rules } from './add#config'
export default {
  name: '',

  components: {},

  props: {
    menu_id: {
      type: [Number, String]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      parentMenuList: []
    }
  },

  computed: {
    rules
  },

  async: {
    //获取菜单详情
    getMenuInfo(data) {
      return getMenuInfo(data).then(res => {
        this.form.setFieldsValue({
          sn: get(res, 'sn', ''),
          name: get(res, 'name', ''),
          url: get(res, 'url', ''),
          icon: get(res, 'icon', ''),
          remarks: get(res, 'remarks', '')
        })
      })
    },
    //添加菜单
    addMenu(data) {
      return addMenu(data)
    },
    //编辑菜单
    editMenu(data) {
      return editMenu(data)
    }
  },

  mounted() {
    if (this.isEdit) {
      this.getMenuInfo({ menu_id: this.menu_id })
    }
  },

  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!this.isEdit) {
          this.addMenu({
            ...values
          }).then(res => {
            this.$message.success('添加菜单成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.editMenu({
            ...values,
            menu_id: this.menu_id
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
