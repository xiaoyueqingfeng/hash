<template>
  <div class="visit-menu-item">
    <div class="visit-menu-item__head mg-b16">
      <div class="visit-menu-item__head-left">
        <oa-tag
          class="mg-r8"
          type="work-model"
          :value="visitMenuItemInfo.work_model"
        />
        <oa-overflow-text
          class="visit-menu-item__head-name"
          maxWidth="150px"
          :title="visitMenuItemInfo.leads_name"
        >
          {{ visitMenuItemInfo.leads_name }}
        </oa-overflow-text>
        <a-tag
          class="visit-menu-item__head-tag mg-l8"
          v-if="visitMenuItemInfo.role_type === '11'"
        >
          {{ visitMenuItemInfo.sale_type_tip }}
        </a-tag>
      </div>
      <div class="visit-menu-item__head-time">
        {{ visitMenuItemInfo.visit_time }}
      </div>
    </div>
    <div class="visit-menu-item__content">
      <span class="visit-menu-item__content-name">
        {{ visitMenuItemInfo.name }}
      </span>
      <a-tag v-if="visitMenuItemInfo.hardware_tip">
        {{ visitMenuItemInfo.hardware_tip }}
      </a-tag>
      <span>{{ visitMenuItemInfo.model_tip }}</span>
      <span class="divider">|</span>
      <span>{{ visitMenuItemInfo.schedule_tip }}</span>
      <p class="visit-menu-item__content-detail">
        {{ visitMenuItemInfo.detail }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VisitMenuItem',
  data() {
    return {}
  },
  props: {
    visitMenuItemInfo: {
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
.visit-menu-item {
  box-sizing: border-box;
  padding: 24px 24px 24px 28px;
  height: 142px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    &-left {
      display: flex;
      align-items: center;
    }
    &-name {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 28px;
    }
    &-time {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      font-family: HelveticaNeue;
      color: rgba(0, 0, 0, 0.25);
      text-align: left;
    }
  }

  &__content {
    padding: 0;
    .divider {
      display: inline-block;
      margin: 0 4px;
    }
    &-name {
      .mg-r(16px);
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    &-detail {
      .mg-t(8px);
      color: rgba(0, 0, 0, 0.45);
      width: 100%;
      .tov-e;
    }
  }
}
</style>
