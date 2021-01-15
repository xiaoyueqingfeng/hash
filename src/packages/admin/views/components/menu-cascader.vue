<template>
  <oa-cascader
    :options="menuCascaderTree"
    changeOnSelect
    v-model="model"
  ></oa-cascader>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    value: {
      type: [String, Number]
    }
  },
  computed: {
    menuCascaderTree() {
      return [
        {
          id: '0',
          name: 'root',
          children: this.options
        }
      ]
    },
    model: {
      set(id) {
        this.$emit('input', id)
        this.$emit('change', id)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>
