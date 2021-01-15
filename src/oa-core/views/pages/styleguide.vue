<template>
  <div style="background:white;padding:24px;margin:24px">
    <h2>Styleguide</h2>
    <router-link :to="{ name: 'oa/styleguide-class' }">
      class 全局样式
    </router-link>
    <router-link class="mg-l16" :to="{ name: 'oa/styleguide-component' }">
      component组件
    </router-link>
    <router-link
      v-if="$platform === 'crm'"
      class="mg-l16"
      :to="{ name: 'oa/styleguide-crm' }"
    >
      CRM组件
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.sg-box {
  .s(200px, 120px);
  display: inline-block;
  vertical-align: top;
  .pd(16px);
  border-radius: 2px;
  .c(@white);
  .mg(8px);
  &--primary {
    .bg(@primary-color);
  }
  &--warning {
    .bg(@warning-color);
  }
  &--error {
    .bg(@error-color);
  }
  &--success {
    .bg(@success-color);
  }
  &--border {
    .bg(@border-color);
  }
  &--divider {
    .bg(@divider);
  }
  &--title {
    .bg(@title);
  }
  &--text {
    .bg(@text);
  }
  &--text-light {
    .bg(@text-light);
  }
}
.sg-section {
  .mg-t(24px);
}
.sg-app-content {
  .bg(#f0f2f5);
  .pd(32px);
}

.sg {
  display: flex;
  &__sider {
    flex: 0 0 250px;
  }
  &__main {
    .mg-l(24px);
    flex: 1;
  }
}
</style>
