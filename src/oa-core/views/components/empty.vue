<template>
  <div class="oa-empty" :style="{ width }">
    <img
      width="100%"
      class="oa-empty__img"
      src="~oa-core/assets/img/empty.png"
      alt
    />
    <!-- <p class="oa-empty__placeholder">{{placeholder}}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '暂无数据'
    },
    width: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style lang="less">
.oa-empty {
  display: inline-block;
  vertical-align: top;
  .ta-c;
  &__placeholder {
    .mg-t(12%);
    .mg-b(0);
    .c(@text-light);
  }
}
</style>
