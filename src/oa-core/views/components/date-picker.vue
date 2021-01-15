<template>
  <a-date-picker
    v-model="model"
    v-bind="$attrs"
    :disabledDate="disabledDate"
  ></a-date-picker>
</template>

<script>
import moment from 'moment'
const statForamteFn = current => {
  return current && current > moment().subtract(1, 'days')
}
export default {
  props: {
    value: {
      type: null,
      required: true
    },
    needStatFormate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        if (!this.value) {
          return undefined
        } else {
          return moment(this.value)
        }
      },
      set(newVal) {
        let _v

        if (newVal) {
          _v = moment(newVal).format('YYYY-MM-DD')
        }
        this.$emit('input', _v)
        this.$emit('change', _v)
      }
    }
  },
  methods: {
    disabledDate(current) {
      // use users disabled Date
      if (this.$attrs.disabledDate) {
        return this.$attrs.disabledDate(current)
      }
      if (this.needStatFormate) return statForamteFn(current)
      return current && current > moment()
    }
  }
}
</script>
