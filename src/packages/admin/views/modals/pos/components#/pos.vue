<template>
  <div class="">
    <a-form-item :label="`POS机${k}号`" v-bind="formCol"></a-form-item>
    <a-form-item label="门店" required v-bind="formCol">
      <a-select
        placehoder="请选择门店"
        v-decorator="decorators[`terminal_list[${this.k}][shop_id]`]"
      >
        <a-select-option
          v-for="item in shopList"
          :key="item.shop_id"
          :value="item.shop_id"
        >
          {{ item.shop_name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="终端号" required v-bind="formCol">
      <a-input
        v-decorator="decorators[`terminal_list[${this.k}][terminal_no]`]"
        placeholder="请填写通联提供的终端号"
      />
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: '',

  bem: {},

  components: {},

  props: {
    k: {},
    shopList: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object
    }
  },

  data() {
    return {
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      }
    }
  },

  async: {},

  computed: {
    decorators() {
      return this.form.addDecorators({
        [`terminal_list[${this.k}][shop_id]`]: {
          rules: [{ required: true, message: '请选择门店' }]
        },
        [`terminal_list[${this.k}][terminal_no]`]: {
          rules: [
            { required: true, message: '请输入设备号' },
            {
              validator: (field, value, values) => {
                let reg = /[\u4E00-\u9FA5]+/
                if (reg.test(value)) {
                  return '请输入非中文字符'
                }
              }
            }
          ]
        }
      })
    }
  },

  mounted() {},

  methods: {
    handleRemove() {
      this.$emit('removeDevice', this.k)
    }
  }
}
</script>

<style lang="less" scoped></style>
