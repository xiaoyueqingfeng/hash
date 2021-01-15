<template>
  <div class="cabinet">
    <h2>储物柜数据导入</h2>
    <p class="cabinet-intro">
      <em class="em">*</em>
      注：该功能为储物柜升级专用，谨慎操作
    </p>
    <a-form
      class="cabinet-form"
      :form="form"
      labelAlign="left"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 8 }"
      @submit.prevent="onSubmit"
    >
      <a-form-item label="品牌Id">
        <a-input
          required
          v-decorator="[
            'brand_id',
            { rules: [{ required: true, message: '请输入品牌Id' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="门店Id">
        <a-input
          required
          v-decorator="[
            'shop_id',
            { rules: [{ required: true, message: '请输入门店Id' }] }
          ]"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 2 }" label="数据文件" required>
        <oa-file-upload
          @upload="getFileKey"
          fileType="xls,xlsx"
          :isPrivate="false"
          v-decorator="[
            'data_url',
            {
              rules: [
                {
                  validator: uploadValidate
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 10 }">
        <a-button
          class="cabinet-form__submit"
          type="primary"
          html-type="submit"
          :disabled="isSubmitDisabled"
        >
          导入
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { setCabinetMigration } from '@/api/migration'
import { notification } from 'ant-design-vue'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      brand_id: '',
      shop_id: '',
      data_url: '',
      isSubmitDisabled: false
    }
  },
  async: {
    setCabinetMigration(data) {
      return setCabinetMigration(data)
    }
  },
  methods: {
    getFileKey(key) {
      this.data_url = key
    },
    uploadValidate(rule, value, callback) {
      if (!value) {
        callback('请上传文件')
      } else {
        callback()
      }
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.isSubmitDisabled = true
        this.setCabinetMigration({
          ...values,
          data_url: this.data_url
        })
          .then(res => {
            console.log('导入成功:', res)
            notification.success({
              message: '成功',
              description: res.count_text
            })
            this.isSubmitDisabled = false
          })
          .catch(err => {
            this.isSubmitDisabled = false
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cabinet {
  height: 100%;
  padding: 30px;
  background: #fff;
  h2 {
    font-weight: 700;
  }
  &-intro {
    padding-top: 10px;
  }
  .em {
    color: red;
  }
  &-form {
    margin-top: 50px;
    &__submit {
      width: 100%;
    }
  }
}
</style>
