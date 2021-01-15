<template>
  <oa-modal title="添加合伙人" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item
            label="类型"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            required
          >
            外部合伙人
          </a-form-item>
          <a-form-item
            label="合伙人名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            required
          >
            <a-input
              placeholder="请输入合伙人名称"
              v-decorator="decorators.brand_name"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="绑定手机号"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            required
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
import { rules } from './add#config'
import { add } from '@/api/brand'
import { mapGetters } from 'vuex'
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
    add(data) {
      return add(data).then(res => {
        this.$message.success('添加成功')
        this.$emit('success')
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        console.log('fasdfasd')
        values.brand_dealer_id = this.brand.id
        this.show = false
        this.add(values)
      })
    }
  }
}
</script>
