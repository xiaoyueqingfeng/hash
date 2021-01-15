<template>
  <oa-select
    class="crm-sale-picker"
    :placeholder="placeholder"
    v-model="model"
    :options="options"
    @focus="handleFoucus"
  ></oa-select>
</template>

<script>
import { getSaleList } from '@/api/user'

export default {
  props: {
    value: {
      type: null,
      required: true
    },
    placeholder: {
      type: String
    },
    type: {
      type: Number
    },
    immediateReq: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        const _value = newVal
        this.$emit('input', _value)
        this.$emit('change', _value)
      }
    }
  },
  async: {
    getSaleList() {
      return getSaleList({
        type: this.type
      }).then(res => {
        this.options = res.list
      })
    }
  },
  mounted() {
    if (this.immediateReq) {
      this.getSaleList()
    }
  },
  methods: {
    handleFoucus() {
      if (this.options && this.options.length) return false
      this.getSaleList()
    }
  }
}
</script>
