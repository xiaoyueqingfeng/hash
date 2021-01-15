<template>
  <oa-modal v-model="show" title="提示" @ok="onSubmit">
    <p>
      开锁仅物理开柜，不影响用户使用关系，您确认开锁
      {{ checkedSortListSerialNum }} 吗？
    </p>
  </oa-modal>
</template>

<script>
export default {
  name: 'hardware-locker-unlock',

  components: {},

  props: {
    checkedSortListSerialNum: String
  },

  data() {
    return {
      show: true
    }
  },

  computed: {},

  async: {},

  mounted() {},

  methods: {
    onSubmit() {
      this.show = false
      this.$emit('done')
    }
  }
}
</script>

<style lang="less" scoped></style>
