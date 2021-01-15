<template>
  <div class="accompany">
    <img :src="defaultImg" alt="图片" class="accompany--avater" />
    <div class="accompany__column">
      <span class="accompany__column-name">{{ accompanyInfo.name }}</span>
      <span class="accompany__column-time">
        {{ accompanyInfo.created_time }}
      </span>
      <div class="accompany__column-detail">{{ accompanyInfo.detail }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Accompany',
  data() {
    return {
      defaultImg: require('oa-core/assets/img/avatar_default.png')
    }
  },
  props: {
    accompanyInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.accompany {
  display: flex;
  &--avater {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  &__column {
    margin-left: 16px;
    &-name {
      margin-right: 8px;
      font-weight: 500;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      color: rgba(0, 0, 0, 0.65);
    }
    &-time {
      color: rgba(0, 0, 0, 0.25);
    }
    &-detail {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
