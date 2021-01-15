<template>
  <div class="hardware-product">
    <div class="add-store">
      <span class="close" @click="closeCurrentProduct(addId)">
        <a-icon type="close-circle" />
      </span>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="选择类型"
      >
        <a-select
          v-decorator="[
            'hardware[' + addId + '].type_id',
            { rules: [{ required: true, message: '请选择类型' }] }
          ]"
          placeholder="请选择类型"
          @change="selectProductType"
        >
          <a-select-option
            v-for="item in currentSysInfo"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="选择产品"
      >
        <a-select
          v-decorator="[
            'hardware[' + addId + '].product_id',
            { rules: [{ required: true, message: '请选择产品' }] }
          ]"
          placeholder="请选择产品"
        >
          <a-select-option
            v-for="item in childrenList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="数量">
        <a-input-number
          placeholder="请输入"
          id="success"
          addonAfter="个"
          type="number"
          :max="999"
          :min="0"
          v-decorator="[
            'hardware[' + addId + '].qty',
            {
              rules: [{ required: true, message: '请输入数量' }],
              initialValue: 1
            }
          ]"
        />
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="金额">
        <a-input
          placeholder="请输入价格"
          id="success"
          addonAfter="元"
          v-decorator="[
            'hardware[' + addId + '].amount',
            { rules: [{ required: true, message: '请输入金额' }] }
          ]"
        />
      </a-form-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductItem',
  props: {
    currentSysInfo: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    },
    addId: {
      type: Number
    }
  },
  data() {
    return {
      childrenList: [],
      typeIndex: -1,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
  },
  computed: {},
  methods: {
    selectProductType(e) {
      let currentSysInfo = this.$props.currentSysInfo
      this.childrenList = currentSysInfo.filter(
        item => item.id === e
      )[0].product
      let hardware = this.form.getFieldValue('hardware')
      hardware[this.addId]['product_id'] = undefined
      this.form.setFieldsValue({
        hardware
      })
      console.log('hardware', hardware, this.addId)
    },
    closeCurrentProduct() {
      this.$emit('delete', this.addId)
    }
  }
}
</script>
<style lang="less" scoped>
.hardware-product {
  .close {
    .d-b;
    .pos-a;
    right: 0;
    top: -4px;
    color: #d9d9d9;
    .cur-p;
  }
  .add-store {
    width: 76%;
    background: rgba(245, 245, 245, 0.5);
    position: relative;
    left: 142px;
    padding: 24px;
    padding-left: 83px;
    .mg-b(8px);
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
    .ant-input-number {
      width: 100%;
    }
  }
}
</style>
