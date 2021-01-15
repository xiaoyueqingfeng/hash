<template>
  <oa-modal v-model="show" title="查看二维码" :footer="null">
    <div class="checkQrcode">
      <div class="checkQrcode__qrcode">
        <img :src="qrcode" alt="" />
      </div>
      <div class="checkQrcode__tip">扫描查看小程序</div>
    </div>
  </oa-modal>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {
    qrcode: {
      type: String
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.checkQrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  &__qrcode {
    img {
      width: 250px;
      height: 250px;
    }
  }
  &__tip {
    font-size: 18px;
    line-height: 32px;
    margin-top: 16px;
  }
}
</style>
