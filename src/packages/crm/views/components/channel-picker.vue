<template>
  <oa-cascader
    class="crm-channel-picker"
    @cascaderFocus="handleFocus"
    multiple-model
    change-on-select
    placeholder="选择渠道"
    :level1.sync="level1Model"
    :level2.sync="level2Model"
    :options="options"
  ></oa-cascader>
</template>

<script>
import { getChannelList } from '@/api/channel'
export default {
  props: {
    level1: {
      type: String
    },
    level2: {
      type: String
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
    level1Model: {
      get() {
        return this.level1
      },
      set(id) {
        this.$emit('update:level1', id)
        this.$emit('change:level1', id)
        this.$emit('change')
      }
    },
    level2Model: {
      get() {
        return this.level2
      },
      set(id) {
        this.$emit('update:level2', id)
        this.$emit('change:level2', id)
        this.$emit('change')
      }
    }
  },
  async: {
    getChannelList() {
      return getChannelList().then(res => {
        this.options = res.list
      })
    }
  },
  created() {
    if (this.immediateReq) {
      getChannelList().then(res => {
        this.options = res.list
      })
    }
  },
  methods: {
    handleFocus() {
      console.log('handleFocus')
      if (this.options && this.options.length) return false
      this.getChannelList()
    }
  }
}
</script>

<style lang="less">
.crm-channel-picker {
}
</style>
