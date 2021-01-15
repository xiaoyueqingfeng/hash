<template>
  <div>
    <div class="tip">账号登录</div>
    <a-form
      id="components-form-demo-normal-login"
      @submit.prevent="onSubmit"
      :form="form"
    >
      <a-form-item>
        <a-input
          v-decorator="decorators.mobile"
          placeholder="请输入手机号"
          size="large"
        >
          <a-icon slot="prefix" type="mobile" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="decorators.password"
          size="large"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <div id="no-captcha"></div>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button
          size="large"
          type="primary"
          :loading="signIn$loading"
          htmlType="submit"
          class="login-form-button"
        >
          立即登录
        </a-button>
      </a-form-item>
    </a-form>
    <a class="forget" @click="onForget">忘记密码?</a>
  </div>
</template>

<script>
import { decorators } from './user#config.js'
import { signIn } from 'oa-core/api/user'
import { setAuthToken } from 'oa-core/utils/cookie'
import vefification from 'oa-core/mixins/verification'
export default {
  name: 'UserLogin',
  mixins: [vefification],
  data() {
    const form = this.$stForm.create()
    return {
      form,
      decorators,
      mobile: ''
    }
  },
  created() {
    setTimeout(() => {
      this.form.setFieldsValue({
        mobile: this.$route.query.mobile || ''
      })
    }, 200)
  },
  mounted() {
    this.openNVC()
  },
  async: {
    signIn(data) {
      return signIn(data)
    }
  },
  methods: {
    onForget() {
      const mobile = this.form.getFieldValue('mobile') || ''
      this.$router.push({
        name: 'oa/user-update-password',
        query: { mobile }
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.mobile = values.mobile
        let params = {
          aliyunSessionId: this.nv_csessionid,
          aliyunToken: this.nv_token,
          aliyunSig: this.nv_sig,
          aliyunScene: this.nv_scene,
          ...values
        }
        this.signIn({ ...params }).then(res => {
          if (!this.$platform) {
            console.error('$platform 不存在')
          }
          const href = '/' + this.$platform
          setAuthToken(res.token)
          document.location.href = href
        }, this.loginErrorHandler)
      })
    },
    loginErrorHandler(err) {
      const code = err.code
      this.resetNVC()
      console.log('loginErrorHandler', err)
    }
  }
}
</script>
<style lang="less">
.nc-container .nc_wrapper,
.nc-container .errloading {
  width: 100% !important;
}
.nc-container .nc_scale span {
  height: 34px;
}
</style>
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
  .mg-t(32px);
}
.forget {
  .ta-c;
  .fz(14px);
  font-weight: 400;
  .c(rgba(24, 144, 255, 1));
  .lh(20px);
  .mg-t(16px);
  .d-b;
}
</style>
