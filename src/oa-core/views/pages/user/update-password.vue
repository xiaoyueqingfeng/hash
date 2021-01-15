<template>
  <div>
    <div class="tip">重置密码</div>
    <a-form id="components-mobile-login" @submit="onSubmit" :form="form">
      <a-form-item>
        <a-input
          v-decorator="decorators.mobile"
          placeholder="请输入手机号"
          @change="this.onChange"
          size="large"
        >
          <a-icon slot="prefix" type="mobile" style="color:rgba(0,0,0,.25)" />
          <a-icon
            v-if="isMobile"
            slot="suffix"
            type="close"
            @click="emitEmpty"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="decorators.captcha"
          size="large"
          autocomplete="off"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          <a-button
            type="primary"
            slot="suffix"
            :loading="sendCaptcha$loading"
            :disabled="!!times"
            @click.stop="onGetSmsCaptcha"
          >
            {{ this.SendSmsCaptchaButtonText }}
          </a-button>
        </a-input>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button
          size="large"
          type="primary"
          :loading="checkCaptcha$loading"
          htmlType="submit"
          class="login-form-button"
        >
          下一步
        </a-button>
      </a-form-item>
    </a-form>
    <router-link class="go-login" to="/user/login">去登录</router-link>
  </div>
</template>

<script>
import { decorators } from './user#config'
import { sendCaptcha, checkCaptcha } from 'oa-core/api/sms'

const CAPTCHA_TIME = 60

export default {
  name: 'LoginMobileCaptch',
  data() {
    return {
      decorators,
      form: this.$form.createForm(this),
      times: 0,
      isMobile: false,
      isNext: false
    }
  },
  computed: {
    SendSmsCaptchaButtonText() {
      return this.times ? `${this.times}秒后重新获取` : '发送验证码'
    }
  },
  async: {
    sendCaptcha(mobile) {
      return sendCaptcha({ mobile })
    },
    checkCaptcha(values) {
      return checkCaptcha(values)
    }
  },
  methods: {
    onGetSmsCaptcha() {
      const mobile = this.form.getFieldValue('mobile')
      if (!mobile) {
        return this.form.validateFields()
      }
      this.sendCaptcha(mobile)
        .then(() => {
          this.times = CAPTCHA_TIME
          let clearn = setInterval(() => {
            this.times--
            if (!this.times) {
              clearInterval(clearn)
            }
          }, 1000)
        })
        .catch(() => {
          this.times = 0
        })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.checkCaptcha(values).then(() => {
            this.$router.push({
              name: 'oa/user-update-password-confirm',
              query: {
                mobile: values.mobile,
                captcha: values.captcha
              }
            })
          })
        }
      })
    },
    onChange(value) {
      this.isMobile = !!value.currentTarget.value
    },
    emitEmpty() {
      this.form.setFieldsValue({ mobile: '' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({ mobile: this.$route.query.mobile || '' })
    })
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
.go-login {
  .ta-c;
  .fz(14px);
  font-weight: 400;
  .c(rgba(24, 144, 255, 1));
  .lh(20px);
  .mg-t(56px);
  .d-b;
}
</style>
