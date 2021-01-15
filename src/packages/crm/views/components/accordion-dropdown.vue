<template>
  <img :src="imgSrc" alt="" @click="handleChangeShow" class="accordion" />
</template>

<script>
export default {
  name: '',

  components: {},

  props: {
    show: {
      type: Boolean
    }
  },

  data() {
    return {}
  },

  computed: {
    imgSrc() {
      let srcs = {
        top: require('@/assets/images/arrow_top@2x.png'),
        bottom: require('@/assets/images/arrow_bottom@2x.png')
      }
      if (this.show) return srcs['top']
      else return srcs['bottom']
    }
  },

  async: {},

  mounted() {},

  methods: {
    handleChangeShow() {
      this.$emit('update:show', !this.show)
    }
  }
}
</script>

<style lang="less" scoped>
.accordion {
  width: 14px;
  height: 14px;
}
</style>
