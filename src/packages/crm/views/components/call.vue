<template>
  <oa-icon
    class="crm-udesk-icon"
    type="shoujibeifen1"
    @click="handlerCall"
    v-if="callNumber && can_call_udesk && canShowIcon"
  />
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { get, pick } from 'lodash-es'
import container from 'oa-core/container'

export default {
  name: 'crm-udesk-call',

  components: {},

  props: ['leads_id', 'contact_id', 'callNumber', 'customerType'],

  data() {
    return {}
  },
  computed: {
    canShowIcon() {
      let arr = ['1', '7', '13']
      console.log('customerType', this.customerType)
      if (this.isInterNetSale) {
        return arr.includes(this.customerType)
      } else if (this.isService) {
        return this.customerType === '13'
      }
    },
    isInterNetSale() {
      return this.user_role_type === '11'
    },
    isService() {
      let serviceArr = ['5', '6', '7']
      return serviceArr.includes(this.user_role_type)
    },
    ...mapGetters('oa/user', ['can_call_udesk', 'user_role_type'])
  },

  methods: {
    /**
     * @description 通话组件拨号
     */
    async handlerCall() {
      let callCenter = container.get('udeskCallCenter')
      if (!callCenter.registerOk) {
        this.$message.error('通话组件尚未注册成功，请稍后再试')
        return false
      }
      callCenter.setHangupCb(this.hangeUpCb)
      callCenter.makeCall(this.callNumber)
    },
    hangeUpCb(call_id) {
      if (this.isService) {
        this.$modalRouter.push({
          name: 'service-add',
          props: {
            customer_id: this.leads_id,
            contact_id: this.contact_id,
            call_id,
            isCallAdd: true
          },
          on: {
            noticeSuccess: this.noticeSuccess.bind(this)
          }
        })
      } else if (this.isInterNetSale) {
        this.$modalRouter.push({
          name: 'visit-add',
          props: {
            customer_id: this.leads_id,
            contact_id: this.contact_id,
            call_id,
            isCallAdd: true
          },
          on: {
            noticeSuccess: this.noticeSuccess.bind(this)
          }
        })
      }
    },
    noticeSuccess() {
      console.log('服务记录添加成功')
    }
  }
}
</script>

<style lang="less">
.crm-udesk-icon {
  cursor: pointer;
}
.udesk-callcenter-component {
  z-index: 1001;
}
</style>
