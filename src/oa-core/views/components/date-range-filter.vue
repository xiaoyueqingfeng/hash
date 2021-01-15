<template>
  <a-range-picker
    class="oa-date-range-filter"
    v-model="model"
    :placeholder="placeholder"
    :disabledDate="disabledDate"
    :ranges="ranges"
    :format="formateFn"
    v-bind="$attrs"
  ></a-range-picker>
</template>

<script>
import moment from 'moment'
const statForamteFn = current => {
  return current && current > moment().subtract(1, 'days')
}
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
      default: () => ['开始时间', '结束时间']
    },
    formateFn: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    needStatFormate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ranges: {
        本月: [moment().startOf('month'), moment()],
        上月: [
          moment()
            .add(-1, 'months')
            .startOf('month'),
          moment()
            .add(-1, 'months')
            .endOf('month')
        ],
        本周: [moment().startOf('week'), moment()],
        昨日: [moment().add(-1, 'days'), moment()]
      }
    }
  },
  methods: {
    moment,
    disabledDate(current) {
      // use users disabled Date
      if (this.$attrs.disabledDate) {
        return this.$attrs.disabledDate(current)
      }
      if (this.needStatFormate) return statForamteFn(current)
      return current && current > moment()
    }
  },
  computed: {
    model: {
      get() {
        const start = this.start
        const end = this.end
        if (!start || !end) {
          return []
        }
        const model = [moment(start), moment(end)]
        return model
      },
      set(times) {
        let _start
        let _end

        if (!times[0]) {
          _start = undefined
        } else {
          _start = moment(times[0]).format(this.formateFn)
        }
        if (!times[1]) {
          _end = undefined
        } else {
          _end = moment(times[1]).format(this.formateFn)
        }
        this.$emit('update:start', _start)
        this.$emit('update:end', _end)

        this.$emit('change', {
          start: _start,
          end: _end
        })
      }
    }
  }
}
</script>

<style lang="less">
.oa-date-range-filter {
  .w(300px);
}
</style>
