<template>
  <oa-select
    placeholder="请选择版本"
    :options="versionList"
    v-model="model"
    :allowClear="false"
  ></oa-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['value'],
  computed: {
    ...mapGetters('admin', ['versionList']),
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    }
  }
}
</script>
