<script>
import { merge } from 'lodash-es'
export default {
  props: {
    value: {
      type: Number
    }
  },
  computed: {
    checked: {
      get() {
        return !!this.value
      }
    }
  },
  render(h) {
    const props = merge(
      {
        checked: this.checked
      },
      this.$attrs
    )
    const listeners = merge(this.$listeners, {
      change: newChecked => {
        const newVal = newChecked ? 1 : 0
        console.log(newVal)
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    })
    return h(
      'a-switch',
      {
        props,
        on: listeners,
        scopedSlots: this.$scopedSlots,
        slot: this.$slots
      },
      this.$slots
    )
  }
}
</script>
