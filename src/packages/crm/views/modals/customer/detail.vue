<template>
  <oa-page-modal v-model="show">
    <detail @closePageModal="closePageModal" />
  </oa-page-modal>
</template>
<script>
import detail from './detail#/index'
export default {
  name: 'CustomerDetail',
  data() {
    return {
      show: false
    }
  },
  components: {
    detail
  },
  props: {
    leadsId: {
      type: [String, Number],
      default: ''
    },
    leadsSn: {
      type: String,
      default: ''
    }
  },
  created() {
    this.$store.commit('leads/SET_LEADS_ID', this.leadsId)
    this.$store.commit('leads/SET_LEADS_SN', this.leadsSn)
  },
  methods: {
    closePageModal() {
      this.show = false
    }
  }
}
</script>
