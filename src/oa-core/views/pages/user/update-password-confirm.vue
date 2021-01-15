<template>
  <div>
    <div class="tip">重置密码</div>
    <a-form
      id="components-form-demo-normal-login"
      @submit.prevent="onSubmit"
      :form="form"
    >
      <a-form-item>
        <a-input
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' },
                {
                  required: true,
                  message: '密码必须是8位到16位包含数字与字母',
                  pattern: VALIDATE_PASSWORD
                }
              ]
            }
          ]"
          @change="onChange"
          size="large"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          <a-icon
            v-if="isPassword"
            slot="suffix"
            type="close"
            @click.stop="emitEmptyPassword"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          size="large"
          autocomplete="off"
          @change="onChangeConfirm"
          v-decorator="[
            'password_confirm',
            {
              rules: [
                { required: true, message: '请再次输入密码' },
                { validator: compareToFirstPassword }
              ]
            }
          ]"
          placeholder="请重复确认密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          <a-icon
            v-if="isPasswordComfirm"
            slot="suffix"
            type="close"
            @click.stop="emitEmptyPasswordConfirm"
          />
        </a-input>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button
          size="large"
          type="primary"
          :loading="resetPassword$loading"
          htmlType="submit"
          class="login-form-button"
        >
          保存
        </a-button>
      </a-form-item>
    </a-form>
    <router-link class="go-login" :to="{ name: 'oa/user-login' }">
      去登录
    </router-link>
  </div>
</template>

<script>
import { VALIDATE_PASSWORD } from 'oa-core/constants/regex'
import { resetPassword } from 'oa-core/api/user'

export default {
  name: 'LoginUpdatePassword',
  data() {
    return {
      form: this.$form.createForm(this),
      isPassword: false,
      isPasswordComfirm: false,
      VALIDATE_PASSWORD,

      resetForm: {}
    }
  },
  async: {
    resetPassword(passwords) {
      return resetPassword({
        ...this.resetForm,
        ...passwords
      })
    }
  },
  created() {
    this.resetForm = {
      mobile: this.$route.query.mobile,
      captcha: this.$route.query.captcha
    }
  },
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      let err = '您输入的两个密码不一致!'
      // eslint-disable-line
      if (value && value !== form.getFieldValue('password')) {
        callback(err)
      } else {
        callback()
      }
    },
    onSubmit(e) {
      this.form.validateFields((err, values) => {
        if (err) return
        const passwords = { ...values }
        this.resetPassword(passwords).then(() => {
          this.$message.success('恭喜您！ 修改密码成功', 1, () => {
            this.$router.replace({
              name: 'oa/user-login',
              query: { mobile: this.resetForm.mobile }
            })
          })
        })
      })
    },
    onChange(value) {
      this.isPassword = !!this.form.getFieldValue('password')
    },
    onChangeConfirm(value) {
      this.isPasswordComfirm = !!this.form.getFieldValue('password_confirm')
    },
    emitEmptyPassword() {
      this.form.setFieldsValue({ password: '' })
    },
    emitEmptyPasswordConfirm() {
      this.form.setFieldsValue({ password_confirm: '' })
    }
  }
}
</script>

<style lang="less" scoped>
.login-form-button {
  width: 100%;
}
.tip {
  .mg-b(34px);
  .fz(20px);
  font-weight: 400;
  .c(rgba(0, 0, 0, 0.6));
  .lh(28px);
}
.submit-btn {
  .mg-t(40px);
}
.forget {
  .ta-c;
  .fz(14px);
  font-weight: 400;
  .c(rgba(24, 144, 255, 1));
  .lh(20px);
  .mg-t(56px);
  .d-b;
}
</style>
