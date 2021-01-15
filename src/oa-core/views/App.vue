<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>
      <div class="git-commit">
        [git_commit:{{ gitCommit }}] [local_api:{{ localApiEnv }}]
      </div>
      <!-- 非生产域名下 -->
      <div class="app-env" v-if="canShowBranchSwitch">
        分支:{{ gitBranch }}
        <a href="/_branch">切换</a>
      </div>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import container from 'oa-core/container'

export default {
  name: 'OaApp',
  data() {
    return {
      locale: zhCN
    }
  },
  computed: {
    gitCommit() {
      return process.env.GIT_COMMIT
    },
    localApiEnv() {
      return process.env.LOCAL_API_ENV
    },
    gitBranch() {
      return process.env.GIT_BRANCH
    },
    canShowBranchSwitch() {
      return /dev|test|pre/.test(location.hostname)
    },
    layoutName() {
      return this.$route.meta.layout || 'loading'
    },
    layoutComponent() {
      const layouts = container.get('layouts')
      return layouts[this.layoutName]
    }
  }
}
</script>

<style lang="less">
.git-commit {
  .pos-f;
  right: 0;
  bottom: 0;
  .bg(@primary-color);
  .c(@white);
  .pd-lr(4px);
  .cur-p;
  .fz(12px);
  opacity: 0;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
}
.app-env {
  .pos-f;
  right: 0px;
  bottom: 18px;
  z-index: 200;
  opacity: 0.8;
  border-radius: 2px;
  .c(white);
  .pd(4px 8px);
  .fz(18px);
  .bg(@primary-color);
  a {
    .fz(16px);
    .c(white);
    text-decoration: underline;
  }
}
</style>
