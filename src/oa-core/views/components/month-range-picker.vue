<template>
  <div class="oa-month-range-picker">
    <a-month-picker
      class="oa-month-range-picker__start"
      :placeholder="placeholder[0]"
      v-model="startModel"
      :disabledDate="startDisabled"
      @change="onStartChange"
    ></a-month-picker>
    <a-month-picker
      :open="endOpen"
      :allowClear="false"
      @openChange="onEndOpenChange"
      :disabled="!start"
      :disabledDate="endDisabled"
      class="oa-month-range-picker__end"
      :placeholder="placeholder[1]"
      v-model="endModel"
    >
      <span slot="suffixIcon"></span>
    </a-month-picker>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    start: {
      type: null,
      required: true
    },
    end: {
      type: null,
      required: true
    },
    placeholder: {
      type: Array,
      default: () => ['开始月份', '结束月份']
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data() {
    return {
      endOpen: false
    }
  },
  computed: {
    startModel: {
      get() {
        if (!this.start) {
          return undefined
        }
        return moment(this.start)
      },
      set(newVal) {
        let _v
        if (newVal) {
          _v = moment(newVal)
            .startOf('month')
            .format(this.format)
        }
        if (_v) {
          this.endOpen = true
        }
        this.$emit('change:start', _v)
        this.$emit('update:start', _v)
      }
    },
    endModel: {
      get() {
        if (!this.end) {
          return undefined
        } else {
          return moment(this.end)
        }
      },
      set(newVal) {
        let _v

        if (newVal) {
          _v = moment(newVal)
            .endOf('month')
            .format(this.format)
        }

        this.$emit('change:end', _v)
        this.$emit('update:end', _v)
      }
    }
  },
  methods: {
    onStartChange() {
      this.$emit('update:end', undefined)
    },
    startDisabled(current) {
      return current && current > moment().endOf('month')
    },
    endDisabled(current) {
      return (
        (current && current > moment().endOf('month')) ||
        current < moment(this.start)
      )
    },
    onEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>
<style lang="less">
.oa-month-range-picker {
  &__start {
    .ant-input {
      // border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &__end {
    .ant-input {
      // border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
