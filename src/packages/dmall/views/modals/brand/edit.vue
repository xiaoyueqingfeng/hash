<template>
  <oa-modal title="编辑品牌商" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item
            label="品牌商名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            {{ brand.brand_name }}
          </a-form-item>
          <a-form-item
            label="leadsID"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            {{ brand.leads_id }}
          </a-form-item>
          <a-form-item
            label="绑定手机号"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              placeholder="请输入手机号"
              v-decorator="decorators.mobile"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="备注"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
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
import { rules } from './edit#config'
import { bindPhone } from '@/api/brand'
export default {
  name: 'BrandMobileEdit',
  props: {
    brand: {
      type: Object,
      default: () => {
        return {
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
      show: false
    }
  },
  async: {
    bindPhone(data) {
      return bindPhone(data).then(res => {
        this.$message.success('编辑成功')
        this.$emit('success')
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        values.brand_dealer_id = this.brand.id
        this.show = false
        this.bindPhone(values)
      })
    }
  }
}
</script>
