<template>
  <a-radio-group v-model="checked" v-bind="$attrs" v-on="$listeners">
    <a-radio v-for="item in options" :value="item.id" :key="item.id">
      {{ item.name }}
    </a-radio>
  </a-radio-group>
</template>

<script>
export default {
  name: 'oa-radio-group',

  components: {},

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: null
    }
  },

  data() {
    return {}
  },

  computed: {
    checked: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        // this.$emit('change', newVal)
      }
    }
  },

  async: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped></style>
