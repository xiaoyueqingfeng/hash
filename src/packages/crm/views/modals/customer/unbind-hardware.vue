<template>
  <oa-modal
    title="解绑硬件销售"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="unbindHardware$loading"
  >
    <a-row>
      <div class="text-center text-title">是否解绑硬件销售信息？</div>
      <div class="text-center">解绑后客户跟进硬件销售会被重置清空</div>
    </a-row>
  </oa-modal>
</template>

<script>
import {
  batchUnbindHardware as payBatchUnbindHardware,
  unbindHardware as payUnbindHardware
} from '@/api/pay'
export default {
  props: {
    customerIds: {
      type: null,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  async: {
    unbindHardware(data) {
      switch (this.type) {
        case 'batch':
          return payBatchUnbindHardware(data)
        case 'single':
          return payUnbindHardware(data)
      }
    }
  },
  methods: {
    onSubmit() {
      const sendData = {
        leads_id: this.customerIds
      }
      this.unbindHardware(sendData).then(() => {
        this.show = false
        this.$emit('done')
        this.$success({
          title: '提示',
          content: '解绑成功',
          maskClosable: true
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.text-title {
  font-size: 18px;
  margin: 10px 0;
}
</style>
