<template>
  <div class="serve-menu-item">
    <div class="serve-menu-item__head">
      <div class="serve-menu-item__head-title">
        <oa-tag type="work-model" :value="serveMenuItem.work_model" />
        <span class="serve-menu-item__head-title-name">
          {{ serveMenuItem.leads_name }}
        </span>
      </div>
      <span class="serve-menu-item__head-title-time">
        {{ serveMenuItem.service_time }}
      </span>
    </div>
    <div class="serve-menu-item__content">
      <span class="serve-menu-item__content-name">
        {{ serveMenuItem.name }}
      </span>
      <a-tag v-if="serveMenuItem.role_type_tip">
        {{ serveMenuItem.role_type_tip }}
      </a-tag>
      <a-tag>{{ serveMenuItem.service_type_tip }}</a-tag>
      <p class="serve-menu-item__content-detail">{{ serveMenuItem.detail }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServeMenuItem',
  data() {
    return {}
  },
  props: {
    serveMenuItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  created() {}
}
</script>
<style lang="less" scoped>
.serve-menu-item {
  box-sizing: border-box;
  padding: 24px;
  height: 142px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  &__head {
    display: flex;
    padding: 0;
    justify-content: space-between;
    &-title {
      display: inline-flex;
      margin-bottom: 16px;
      &-name {
        .mg-l(6px);
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 20px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
      &-time {
        font-size: 14px;
        font-family: HelveticaNeue;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }

  &__content {
    &-name {
      .mg-r(14px);
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    &-detail {
      .mg-t(6px);
      color: rgba(0, 0, 0, 0.45);
      width: 100%;
      .tov-e;
    }
  }
}
</style>
