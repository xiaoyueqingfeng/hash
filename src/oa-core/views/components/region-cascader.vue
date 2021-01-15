<template>
  <a-cascader
    :fieldNames="{ value: 'id', label: 'name', children: 'children' }"
    :placeholder="placeholder"
    :options="regionOptions"
    v-model="model"
    :changeOnSelect="changeOnSelect"
  ></a-cascader>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Array
    },
    /**
     * 开发者传入的城市数据选项，如不传则使用全量城市数据
     */
    options: {
      type: Array
    },
    placeholder: {
      type: String,
      default: '请选择城市'
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      regionOptions: [],
      regionMap: {}
    }
  },
  computed: {
    ...mapGetters('oa/base', ['regionTree']),
    model: {
      get() {
        if (!this.value) {
          return []
        }
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    }
  },
  mounted() {
    if (!this.options) {
      this.regionOptions = this.regionTree
    } else {
      this.regionOptions = this.options
    }
  }
}
</script>
