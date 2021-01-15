<template>
  <oa-modal :title="`${editText}供应商`" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item label="供应商名称" required v-bind="formCol">
            <a-input v-decorator="decorators.supplier_name"></a-input>
          </a-form-item>
          <a-form-item required label="类型" v-bind="formCol">
            <oa-select
              disabled
              placeholder="请选择类型"
              :options="supplierType"
              v-decorator="decorators.supplier_type"
            ></oa-select>
          </a-form-item>
          <a-form-item required label="绑定手机号" v-bind="formCol">
            <a-input
              placeholder="请输入手机号"
              v-decorator="decorators.mobile"
            />
          </a-form-item>
          <a-form-item required label="账号" v-bind="formCol">
            <a-row :gutter="2">
              <a-col :span="isEdit ? 24 : 18">
                <a-input
                  placeholder="请输入供应商账号"
                  :disabled="isEdit"
                  v-decorator="decorators.supplier_account"
                ></a-input>
              </a-col>
              <a-col v-if="!isEdit" :span="4">
                <a-button type="primary" @click="onCLickRandomAccount">
                  随机
                </a-button>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="备注" v-bind="formCol">
            <a-textarea
              placeholder="请输入备注信息"
              v-decorator="decorators.remark"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { rules } from './add#config'
import { mapValues, values } from 'lodash-es'
import { getRandomAccount } from '@/api/suppliers'
import { mapGetters } from 'vuex'
export default {
  name: 'SuppliersAdd',
  props: {
    supplier: {
      type: Object,
      default: () => {
        return {
          supplier_name: '',
          supplier_type: '',
          mobile: '',
          remark: ''
        }
      }
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false,
      saleList: [],
      organOptions: []
    }
  },
  created() {},
  computed: {
    isEdit() {
      return !!this.supplier.id
    },
    editText() {
      return this.isEdit ? '编辑' : '添加'
    },
    formCol() {
      return {
        'label-col': { span: 5 },
        'wrapper-col': { span: 16 }
      }
    },
    ...mapGetters('dmall', ['supplierType'])
  },
  async: {
    getRandomAccount() {
      return getRandomAccount().then(res => {
        this.form.setFieldsValue({ supplier_account: res.account })
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        values.supplier_type = 1
        this.show = false
        this.$emit('save', values)
      })
    },
    onCLickRandomAccount() {
      this.getRandomAccount()
    }
  }
}
</script>
