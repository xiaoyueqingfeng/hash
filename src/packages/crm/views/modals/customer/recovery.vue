<template>
  <oa-modal
    title="还原客户"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="recovery$loading"
  >
    <a-row>
      <div class="restore_customer_con">
        是否还原客户
        <span class="customerName" v-html="names"></span>
        ？
      </div>
      <div class="restore_tips">还原后该客户将进入公海</div>
    </a-row>
  </oa-modal>
</template>

<script>
import { recovery as leadsRecovery } from '@/api/leads'
import { recovery as potentialRecovery } from '@/api/potential'
export default {
  props: {
    customerIds: {
      type: Array,
      required: true
    },
    customerNames: {
      type: Array,
      required: true
    },
    from: {
      type: String,
      required: true
    }
  },
  computed: {
    names() {
      const len = this.customerIds.length
      return len < 5 ? this.customerNames.toString() : `<a>${len}</a>个客户`
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      this.recovery().then(() => {
        this.$message.success('操作成功', 2)
        this.$emit('done')
        this.show = false
      })
    }
  },
  async: {
    recovery() {
      const sendData = {
        leads_id: this.customerIds
      }
      switch (this.from) {
        case 'leads':
          return leadsRecovery(sendData)
        case 'potential':
          return potentialRecovery(sendData)
      }
    }
  }
}
</script>

<style lang="less">
.restore_customer_con {
  text-align: center;
  padding-top: 40px;
  .customerName {
    display: inline-block;
    margin: 0 3px;
    font-weight: 600;
  }
}
.restore_tips {
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  margin: 24px 0;
}
</style>
