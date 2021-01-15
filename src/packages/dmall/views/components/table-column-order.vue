<template>
  <div class="listDetail">
    <oa-overflow-text maxWidth="300px" :title="record.order_sn.toString()">
      <a
        v-modal-link="{
          name,
          props: { order_sn: record.order_sn, visible: true }
        }"
      >
        {{ record.order_sn }}
      </a>
    </oa-overflow-text>
  </div>
</template>

<script>
export default {
  name: 'table-column-order',

  props: {
    name: {
      type: String,
      default: 'order-detail'
    },
    record: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.listDetail {
  display: flex;
  justify-content: space-between;
}
</style>
