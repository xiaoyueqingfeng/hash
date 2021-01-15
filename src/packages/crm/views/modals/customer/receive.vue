<template>
  <oa-modal
    title="领取客户"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="receive$loading"
  >
    <a-row>
      <div class="con">
        确定领取
        <span class="customerName">{{ customerName }}</span>
        客户？
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { receive as leadsReceive } from '@/api/leads'
import { receive as potentialReceive } from '@/api/potential'

export default {
  props: {
    customerId: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      required: true
    },

    // leads | potential
    from: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      this.receive().then(() => {
        this.$message.success('领取客户操作成功!', 2)
        this.show = false
        this.$emit('done')
      })
    }
  },
  async: {
    receive() {
      const sendData = {
        leads_id: [this.customerId]
      }
      switch (this.from) {
        case 'leads':
          return leadsReceive(sendData)
        case 'potential':
          return potentialReceive(sendData)
      }
    }
  }
}
</script>

<style lang="less">
.con {
  text-align: center;
  height: 100px;
  line-height: 100px;
  .customerName {
    display: inline-block;
    margin: 0 3px;
    font-weight: 600;
  }
}
</style>
