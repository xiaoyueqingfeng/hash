<template>
  <div class="comment">
    <img alt="图片" :src="defaultImg" class="comment--avater" />
    <div class="comment__column">
      <span class="comment__column-name">{{ commentInfo.name }}</span>
      <span class="comment__column-time">{{ commentInfo.created_time }}</span>
      <div class="comment__column-detail">{{ commentInfo.detail }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comment',
  data() {
    return {
      defaultImg: require('oa-core/assets/img/avatar_default.png')
    }
  },
  props: {
    commentInfo: {
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
.comment {
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
