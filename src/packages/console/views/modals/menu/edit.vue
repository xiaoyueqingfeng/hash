<template>
  <oa-modal
    v-model="show"
    @ok="onOk"
    width="600px"
    :confirmLoading="updateMenu$loading"
    title="添加子权限"
  >
    <a-form :form="form">
      <a-form-item label="平台" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select :defaultValue="platform_code" disabled>
          <a-select-option
            v-for="platform in platforms"
            :key="platform.code"
            :value="platform.code"
          >
            {{ platform.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="父级菜单"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
      >
        <console-menu-cascader
          v-decorator="decorators.parent_id"
          :options="options"
        />
      </a-form-item>

      <a-form-item
        label="名称"
        hasFeedback
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.name"
          placeholder="请填写名称"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="auth_key"
        hasFeedback
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.auth_key"
          placeholder="请填写auth_key"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="route_name"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.route_name"
          placeholder="请填写route_name"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="侧边栏状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-decorator="decorators.status">
          <a-radio-button :value="1">显示</a-radio-button>
          <a-radio-button :value="0">隐藏</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-show="values.status"
        label="侧边栏图标"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.icon"
          placeholder="请填写侧边栏图标类名（如使用ant图标，请输入anticon:name)"
        ></a-input>
      </a-form-item>

      <a-form-item
        v-show="values.status"
        label="打开方式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-decorator="decorators.type">
          <a-radio-button :value="0">默认</a-radio-button>
          <a-radio-button :value="1">新窗口打开</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number
          v-decorator="decorators.list_order"
          placeholder="请输入排序数字"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { pick } from 'lodash-es'
import { updateMenu } from '@/api/menu'
import { decorators, labelCol, wrapperCol } from './menu#config'

export default {
  props: {
    /**
     * 编辑的菜单对象
     */
    menu: {
      type: Object,
      defualt: () => ({})
    },
    /**
     * 平台号
     */
    platform_code: {
      type: String,
      required: true
    },
    /**
     * 可选平台数组
     */
    platforms: {
      type: Array,
      required: true
    },
    /**
     * 菜单tree 数组
     */
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        onValuesChange: this.onValuesChange
      }),
      decorators,
      labelCol,
      wrapperCol,
      show: false,

      values: {
        status: 1
      }
    }
  },
  methods: {
    onValuesChange(props, values) {
      if ('status' in values) {
        this.values.status = values.status
      }
    },
    onOk() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.updateMenu({
          platform_code: this.platform_code,
          id: this.menu.id,
          ...values
        }).then(() => {
          this.$message.success('更新子菜单成功！')
          this.show = false
          this.$emit('done')
        })
      })
    }
  },
  mounted() {
    // 没有找到更好的方法设定初始值
    this.$nextTick(() => {
      this.form.setFieldsValue({
        parent_id: this.menu.parent_id,
        ...pick(this.menu, [
          'status',
          'type',
          'list_order',
          'name',
          'icon',
          'route_name',
          'auth_key'
        ])
      })
    })
  },
  async: {
    updateMenu(values) {
      return updateMenu(values)
    }
  }
}
</script>
