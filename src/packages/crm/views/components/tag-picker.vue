<template>
  <oa-select
    class="crm-tag-picker"
    placeholder="选择客户标签"
    mode="multiple"
    v-model="model"
    :options="tagList"
    :maxTagCount="maxTagCount"
  ></oa-select>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      maxTagCount: 1
    }
  },
  computed: {
    model: {
      get() {
        let _value = !this.value ? undefined : this.value.split(',')
        return _value
      },
      set(newVal) {
        const _value = newVal.join(',')
        this.$emit('input', _value)
        this.$emit('change', _value)
      }
    },
    tagList() {
      return this.options
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.oa-filter-box .ant-select {
  &.crm-tag-picker {
    min-width: 230px;
  }
}
</style>
