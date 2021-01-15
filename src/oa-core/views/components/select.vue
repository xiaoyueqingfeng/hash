<template>
  <a-select
    class="oa-select"
    :value="cModel"
    :placeholder="placeholder"
    :options="optionsModel"
    :filterOption="needFilterOption ? filterOption : false"
    showSearch
    :allowClear="allowClear"
    v-bind="$attrs"
    v-on="$listeners"
  ></a-select>
</template>
<script>
export default {
  model: {
    value: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    value: {
      type: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    needFilterOption: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    optionsModel() {
      return this.options.map(item => {
        item.value = item.id
        item.label = item.name
        item.text = item.name
        item.key = item.id
        return item
      })
    },
    cModel: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    }
  },
  methods: {
    filterOption(keyword, option) {
      const text = option.data.props.text || ''
      return text.includes(keyword.trim())
    }
  }
}
</script>

<style lang="less">
.oa-select {
  .w(200px);
}
</style>
