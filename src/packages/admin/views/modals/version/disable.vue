<template>
  <oa-confirm
    v-model="show"
    @ok="onOk"
    title="是否禁用该版本：基础版本-俱乐部？"
  >
    禁用后，用户开通新版本时不能选择该版本。
  </oa-confirm>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    onOk() {
      console.log('ok')
      this.show = false
    }
  },
  async: {}
}
</script>
