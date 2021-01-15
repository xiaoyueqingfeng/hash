<template>
  <oa-modal v-model="show" title="查看商品" :footer="null">
    <div class="goods-preview">
      <img :src="imageUrl" />
    </div>
  </oa-modal>
</template>

<script>
export default {
  name: 'GoodPreview',
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="less" scoped>
.goods-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
