<template>
  <oa-modal v-model="show" title="提示" @ok="onSubmit">
    <p>确认取消关联？取消关联后柜号释放，可用于下次绑定。</p>
  </oa-modal>
</template>

<script>
import { unbindCabinet } from '@/api/cabinet'
export default {
  name: 'hardware-locker-unrelevance',

  components: {},

  props: {
    group_id: {
      type: Number,
      required: true
    },
    cabinets_sn: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      show: true
    }
  },

  computed: {},

  async: {
    unbindCabinet(data) {
      return unbindCabinet(data)
    }
  },

  mounted() {},

  methods: {
    onSubmit() {
      this.unbindCabinet({
        group_id: this.group_id,
        cabinet_sn: this.cabinets_sn
      }).then(() => {
        this.show = false
        this.$message.success('取消关联成功')
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
