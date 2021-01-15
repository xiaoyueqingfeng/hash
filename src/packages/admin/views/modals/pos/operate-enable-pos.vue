<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑POS机' : '查看POS机'"
    :confirmLoading="isEdit ? editPosName$loading : false"
    @ok="handlerSubmit"
  >
    <a-form :form="form">
      <a-form-item label="门店" v-bind="formCol" required>
        <div v-if="isEdit">
          <a-select placehoder="请选择门店" v-decorator="decorators.shop_id">
            <a-select-option
              v-for="item in shopList"
              :key="item.shop_id"
              :value="item.shop_id"
            >
              {{ item.shop_name }}
            </a-select-option>
          </a-select>
        </div>
        <div v-else>{{ info.shop_name }}</div>
      </a-form-item>
      <a-form-item label="自定义设备名称" v-bind="formCol">
        <div v-if="isEdit">
          <a-input
            v-decorator="decorators.terminal_name"
            size="large"
            autocomplete="off"
            placeholder="请输入自定义设备名称"
          ></a-input>
        </div>
        <div v-else>{{ info.terminal_name }}</div>
      </a-form-item>
      <a-form-item label="设备号" v-bind="formCol">
        <div v-if="isEdit">
          <a-select
            placehoder="请选择设备"
            v-decorator="decorators.terminal_id"
          >
            <a-select-option
              v-for="item in deviceList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.terminal_no }}
            </a-select-option>
          </a-select>
        </div>
        <div v-else>{{ info.terminal_no }}</div>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import {
  getPosDetail,
  editPosName,
  posShopList,
  posDeviceList
} from '@/api/pos'
import { get } from 'lodash-es'
import { ruleOptions } from './operate-enable-pos#config'
export default {
  name: 'operate-enable-pos',

  components: {},

  props: {
    leads_id: {
      type: [Number, String]
    },
    terminal_id: {
      type: [Number, String]
    },
    isEdit: {}
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      info: {},
      shopList: [],
      deviceList: []
    }
  },

  computed: {
    ruleOptions
  },

  async: {
    getPosDetail() {
      return getPosDetail({
        leads_id: this.leads_id,
        terminal_id: this.terminal_id
      }).then(res => {
        this.info = res.info
      })
    },
    editPosName(data) {
      return editPosName(data)
    },
    posShopList() {
      return posShopList({
        leads_id: this.leads_id
      }).then(res => {
        this.shopList = res.list
      })
    },
    posDeviceList() {
      return posDeviceList({
        leads_id: this.leads_id
      }).then(res => {
        this.deviceList = res.list
      })
    }
  },

  mounted() {
    if (this.isEdit) {
      Promise.all([this.posShopList(), this.posDeviceList()]).then(res => {
        this.getPosDetail().then(res => {
          this.form.setFieldsValue({
            shop_id: this.info.shop_id,
            terminal_id: this.info.terminal_id,
            terminal_name: this.info.terminal_name
          })
        })
      })
    } else {
      this.getPosDetail()
    }
  },

  methods: {
    handlerSubmit() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          this.editPosName({
            leads_id: this.leads_id,
            shop_id: values.shop_id,
            terminal_id: values.terminal_id,
            terminal_name: values.terminal_name
          }).then(res => {
            this.$message.success('编辑成功')
            this.$emit('done')
            this.show = false
          })
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
