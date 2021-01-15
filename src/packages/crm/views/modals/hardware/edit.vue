<template>
  <oa-modal
    v-model="show"
    @ok="onSubmit"
    :title="!isEdit ? '添加硬件设备' : '编辑硬件设备'"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="reqLoading">
      <a-form :form="form">
        <a-form-item label="leadsID" required v-bind="formCol">
          <a-input
            placeholder="请输入leadsID"
            v-decorator="['leads_id', { rules: rules.leads_id }]"
            :disabled="isEdit"
            @blur="leadsIdChange"
          ></a-input>
        </a-form-item>
        <a-form-item label="场馆名称" required v-bind="formCol">
          <a-select
            placeholder="请选择场馆"
            v-decorator="['shop_id', { rules: rules.shop_id }]"
            :disabled="shop_id_disable"
            @change="shopIdChange"
          >
            <a-select-option
              v-for="shop in shopList"
              :key="shop.id"
              :value="shop.id"
            >
              {{ shop.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="设备ID" required v-bind="formCol">
          <a-input
            placeholder="请输入设备ID"
            v-decorator="['device_id', { rules: rules.device_id }]"
            @blur="deviceCodeChange"
            :disabled="isEdit || device_code_disable"
          ></a-input>
        </a-form-item>
        <a-form-item label="设备名称" required v-bind="formCol">
          <a-input
            placeholder="设备名称"
            v-decorator="['device_name', { rules: rules.device_name }]"
            disabled
          ></a-input>
        </a-form-item>
        <a-form-item label="自定义名称" required v-bind="formCol">
          <a-input
            placeholder="请输入自定义名称"
            v-decorator="['custom_name', { rules: rules.custom_name }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="场地区域"
          v-bind="formCol"
          v-if="shop_area_status"
          required
        >
          <a-select
            placeholder="请选择场地区域"
            v-decorator="['shop_area_id', { rules: rules.shop_area_id }]"
          >
            <a-select-option
              v-for="shop in shopArea"
              :key="shop.id"
              :value="shop.id"
            >
              {{ shop.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          required
          label="储物柜区域"
          v-bind="formCol"
          v-if="cabinet_status"
        >
          <a-select
            placeholder="请选择储物柜区域"
            v-decorator="['cabinet_area_id', { rules: rules.cabinet_area_id }]"
          >
            <a-select-option
              v-for="cabinent in cabinetArea"
              :key="cabinent.id"
              :value="cabinent.id"
            >
              {{ cabinent.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="进出门方式"
          v-bind="formCol"
          v-show="ins_and_out_status"
        >
          <a-radio-group
            name="radioGroup"
            v-decorator="['ins_and_out', { rules: rules.ins_and_out }]"
          >
            <a-radio
              :key="tip.id"
              :value="tip.id"
              v-for="tip in hardware_ins_tip"
            >
              {{ tip.name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          required
          label="鉴权方式"
          v-bind="formCol"
          v-if="odd_even_status"
        >
          <a-radio-group
            name="radioGroup"
            v-decorator="['odd_even', { rules: rules.odd_even }]"
          >
            <a-radio
              :key="tip.id"
              :value="tip.id"
              v-for="tip in hardware_auth_tip"
            >
              {{ tip.name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </oa-modal>
</template>

<script>
import {
  hardwareDetail,
  hardwareBind,
  hardwareEdit,
  hardwareGetShops,
  hardwareGetArea,
  hardwareGetCabinetArea,
  hardwareGetDevice,
  hardwareGetReader
} from '@/api/hardware'
import { rules } from './edit#config'
import { get } from 'lodash-es'
export default {
  name: 'hardware-edit',

  components: {},

  props: {
    id: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const form = this.$stForm.create()
    return {
      form,
      info: {},
      shopList: [], // 门店列表
      shopArea: [], // 场地区域列表
      cabinetArea: [], // 储物柜区域列表
      deviceList: [], // 设备列表
      shop_id_disable: true, // 门店列表是否可选
      device_code_disable: true,
      show: true, // 弹窗是否显示
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      mapping: {},
      odd_even_status: 0,
      ins_and_out_status: 0,
      shop_area_status: 0,
      cabinet_status: 0,
      confirmLoading: false
    }
  },

  computed: {
    rules,
    hardware_auth_tip() {
      return get(this.mapping, 'hardware_auth_tip', [])
    },
    hardware_ins_tip() {
      return get(this.mapping, 'hardware_ins_tip', [])
    },
    reqLoading() {
      return (
        this.hardwareDetail$loading ||
        this.hardwareGetShops$loading ||
        this.hardwareGetArea$loading ||
        this.hardwareGetCabinetArea$loading ||
        this.hardwareGetDevice$loading ||
        this.hardwareGetReader$loading
      )
    }
  },

  async: {
    // 获取硬件详情
    hardwareDetail(data) {
      return hardwareDetail(data).then(res => {
        let info = get(res, 'info', {})
        this.odd_even_status = get(info, 'odd_even_status', 0)
        this.ins_and_out_status = get(info, 'ins_and_out_status', 0)
        this.shop_area_status = get(info, 'shop_area_status', 0)
        this.cabinet_status = get(info, 'cabinet_status', 0)
        return info
      })
    },
    // 硬件绑定
    hardwareBind(data) {
      return hardwareBind(data)
        .then(() => {
          this.$success({
            title: '提示',
            content: '绑定成功'
          })
          this.$emit('done')
          this.show = false
          this.confirmLoading = false
        })
        .catch(() => {
          this.confirmLoading = false
        })
    },
    // 硬件编辑
    hardwareEdit(data) {
      return hardwareEdit(data)
        .then(() => {
          this.$success({
            title: '提示',
            content: '编辑成功'
          })
          this.$emit('done')
          this.show = false
          this.confirmLoading = false
        })
        .catch(() => {
          this.confirmLoading = false
        })
    },
    // 获取品牌下门店列表
    hardwareGetShops(data) {
      return hardwareGetShops(data).then(res => {
        this.shopList = get(res, 'list', [])
      })
    },
    // 获取门店下场地区域
    hardwareGetArea(data) {
      return hardwareGetArea(data).then(res => {
        this.shopArea = get(res, 'list', [])
      })
    },
    // 获取储物柜区域
    hardwareGetCabinetArea(data) {
      return hardwareGetCabinetArea(data).then(res => {
        this.cabinetArea = get(res, 'list', [])
      })
    },
    // 根据设备ID获取设备列表
    hardwareGetDevice(data) {
      return hardwareGetDevice(data).then(res => {
        let info = get(res, 'info', {})
        this.odd_even_status = get(info, 'odd_even_status', 0)
        this.ins_and_out_status = get(info, 'ins_and_out_status', 0)
        this.shop_area_status = get(info, 'shop_area_status', 0)
        this.cabinet_status = get(info, 'cabinet_status', 0)
        return info
      })
    },
    // 获取鉴权方式的列表
    hardwareGetReader() {
      return hardwareGetReader()
    }
  },

  async mounted() {
    this.hardwareGetReader().then(res => {
      this.mapping = res
    })
    if (this.isEdit) {
      // 获取硬件详情
      let info = await this.hardwareDetail({ device_id: this.id })
      // 获取门店列表
      await this.hardwareGetShops({ leads_id: info.leads_id })
      // 取消门店表单项禁用
      this.shop_id_disable = false
      // 初始化表单项
      this.form.setFieldsValue({
        leads_id: get(info, 'leads_id'),
        shop_id: get(info, 'shop_id'),
        device_id: get(info, 'device_id'),
        device_name: get(info, 'device_name'),
        custom_name: get(info, 'custom_name')
      })
      // 场地区域是否展示
      if (this.shop_area_status) {
        await this.hardwareGetArea({ shop_id: info.shop_id })
        this.form.setFieldsValue({
          shop_area_id: get(info, 'shop_area_id')
        })
      }
      // 储物柜区域是否展示
      if (this.cabinet_status) {
        await this.hardwareGetCabinetArea({ shop_id: info.shop_id })
        this.form.setFieldsValue({
          cabinet_area_id: get(info, 'cabinet_area_id')
        })
      }
      // 单双鉴权是否展示
      if (this.odd_even_status) {
        this.form.setFieldsValue({
          odd_even: get(info, 'odd_even')
        })
      }
      // 进出门方式是否展示
      if (this.ins_and_out_status) {
        this.form.setFieldsValue({
          ins_and_out: get(info, 'ins_and_out')
        })
      }
    }
  },

  methods: {
    /**
     * @description 当输入的品牌id变化时，请求门店列表接口
     */
    leadsIdChange() {
      let leads_id = this.form.getFieldValue('leads_id')
      if (!leads_id) return false
      this.hardwareGetShops({
        leads_id
      }).then(
        () => {
          this.formReset()
          this.shop_id_disable = false
        },
        () => {
          this.formReset()
        }
      )
    },
    /**
     * @description 当选择的门店id变化时，请求场地区域列表接口
     * @param {number} shop_id 门店id
     */
    shopIdChange(shop_id) {
      this.hardwareGetArea({
        shop_id
      }).then(res => {
        this.form.setFieldsValue({
          shop_area_id: undefined
        })
        this.device_code_disable = false
      })
    },
    /**
     * @description 当输入的device_id变化时，请求设备列表接口
     * @param {number} device_id 设备id
     */
    deviceCodeChange() {
      this.deviceSpecialityReset()
      let device_id = this.form.getFieldValue('device_id')
      if (!device_id) return false
      this.hardwareGetDevice({
        device_id
      }).then(info => {
        this.form.setFieldsValue({
          device_name: info.device_name || ''
        })

        if (!info.shop_area_status) {
          this.form.setFieldsValue({
            shop_area_id: undefined
          })
        }

        if (!info.cabinet_status) {
          this.form.setFieldsValue({
            cabinet_area_id: undefined
          })
        } else {
          let shop_id = this.form.getFieldValue('shop_id')
          this.hardwareGetCabinetArea({ shop_id })
        }
      })
    },
    /**
     * @description 设备非必填项（进出门，单双鉴权，场地区域，储物柜区域）的数据与状态重置
     */
    deviceSpecialityReset() {
      this.form.setFieldsValue({
        device_name: '',
        custom_name: '',
        shop_area_id: undefined,
        cabinet_area_id: undefined,
        odd_even: undefined,
        ins_and_out: undefined
      })

      this.odd_even_status = 0
      this.ins_and_out_status = 0
      this.shop_area_status = 0
      this.cabinet_status = 0
    },
    /**
     * @description 表单项所有数据重置
     */
    formReset() {
      this.form.setFieldsValue({
        shop_id: undefined,
        device_id: '',
        device_name: '',
        custom_name: '',
        odd_even: undefined,
        ins_and_out: undefined,
        cabinet_area_id: undefined,
        shop_area_id: undefined
      })

      this.odd_even_status = 0
      this.ins_and_out_status = 0
      this.shop_area_status = 0
      this.cabinet_status = 0

      this.shop_id_disable = true
      this.device_code_disable = true
    },
    /**
     * @description 提交硬件更新或硬件绑定
     */
    onSubmit() {
      if (this.confirmLoading) return
      let validateFields = [
        'leads_id',
        'shop_id',
        'shop_area_id',
        'device_id',
        'device_name',
        'custom_name',
        'odd_even',
        'ins_and_out'
      ]
      if (this.cabinet_status) {
        validateFields.push('cabinet_area_id')
      }
      this.form.validate(validateFields).then(values => {
        this.confirmLoading = true
        this.$confirm(
          {
            title: '提示',
            content: '已完成设备的功能设置,确认后功能将在设备重启后生效',
            confirmLoading: this.confirmLoading,
            onOk: () => {
              if (this.isEdit) {
                return this.hardwareEdit(values)
              } else {
                return this.hardwareBind(values)
              }
            },
            onCancel: () => {
              this.confirmLoading = false
            }
          },
          err => {
            console.log(err)
          }
        )
      })
    }
  }
}
</script>
