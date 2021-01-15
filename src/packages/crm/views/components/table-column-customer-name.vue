<template>
  <div class="listDetail">
    <oa-overflow-text maxWidth="10em" :title="record.brand_name">
      <a
        v-modal-link="{
          name: 'customer-detail',
          props: { leadsId: record.id, leadsSn: record.sn, visible: true }
        }"
      >
        {{ record.brand_name }}
      </a>
    </oa-overflow-text>
    <crm-table-column-phone
      :record="record"
      v-if="hasPhoneCall && (!auth || record.auth_area['web/pay/contact_list'])"
    ></crm-table-column-phone>
  </div>
</template>

<script>
export default {
  name: 'table-column-customer-name',

  components: {},

  props: {
    record: {
      type: Object,
      default: () => {}
    },
    auth: {
      type: Boolean,
      default: false
    },
    hasPhoneCall: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {},

  async: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.listDetail {
  display: flex;
  justify-content: space-between;
}
</style>
