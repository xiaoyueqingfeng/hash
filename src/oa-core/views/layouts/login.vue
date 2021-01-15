<template>
  <div class="layout-login">
    <header>
      <img src="//static-s.styd.cn/201809141143/logo.png" alt="logo" />
    </header>
    <main class="login-box">
      <div class="login-left">
        <img src="https://static-s.styd.cn/201809181357/login_lf_bg.png" alt />
      </div>
      <div class="login-right">
        <h3>恒纪元OA系统</h3>
        <router-view></router-view>
      </div>
    </main>
    <footer>三体云动@技术产品中心出品</footer>
  </div>
</template>
<style lang="less" scoped>
.layout-login{
  .h(100vh);
  position: relative;
  min-height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url( https://static-s.styd.cn/201809141133/oa_login_bg.png) left center;
  background-size: cover;
  .login-box{
    .s(960px, 480px);
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(24,144,255,0.2);
    display: flex;
    border-radius:8px;
    overflow: hidden;
    .login-left{
      background:linear-gradient(225deg,rgba(70,210,250,1) 0%,rgba(24,144,255,1) 100%);
      .s(420px, 480px);
      img{
        width: 100%;
      }
    }
    .login-right{
      .s(540px, 480px);
      .ta-c;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      padding: 60px 106px 0;
      h3{
        .ta-c;
        .fz(30px);
        font-weight:500;
        .c(rgba(24,144,255,1));
        .lh(38px);
        .mg-b(24px);
      }
    }
  }
  header{
    position: absolute;
    top: 30px;
    left: 40px;
  }

  footer{
    .fz(14px);
    font-weight:400;
    .c(rgba(24,144,255,1));
    .lh(22px);
    position: absolute;
    bottom: 12px;
    right: auto;
  }
}
@media (max-width: 600px) {
  .login{
    .login-box{
      .s(100%, 60%);
      .login-left{
        display: none
      }
      .login-right{
        width: 100%;
        padding: 10% 6% 0;
      }
    }

  }
}
</style>
