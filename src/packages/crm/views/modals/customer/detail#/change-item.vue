<template>
  <div class="change-item">
    <div v-for="(item, index) in changeInfo" :key="index">
      <a-timeline-item>
        <div class="content">
          <div class="column">
            <span class="circle"></span>
            <span class="label">变动时间:</span>
            <span class="value">{{ item.created_time }}</span>
          </div>
          <div class="column">
            <span class="label">操作人:</span>
            <span class="value">{{ item.operator_name }}</span>
          </div>
          <div class="column">
            <span class="label">变动类型:</span>
            <span class="value">{{ item.action_type_name }}</span>
          </div>
          <div class="column">
            <span class="label">变动详情:</span>
            <span class="value">{{ item.detail }}</span>
          </div>
        </div>
      </a-timeline-item>
    </div>
    <div class="loading">
      <a-spin :spinning="isLoading" />
    </div>
    <div class="text-center" v-if="changeInfo.length === 0">
      <oa-empty></oa-empty>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChangeItem',
  data() {
    return {}
  },
  props: {
    changeInfo: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isLoading: function() {
      if (this.changeInfo) {
        return false
      }
      return true
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.change-item {
  .content {
    // padding-bottom: 16px;
    overflow: hidden;
    .column {
      line-height: 22px;
      margin-bottom: 7px;
      font-size: 14px;
      .label {
        display: table-cell;
        width: 70px;
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.65);
      }
      .value {
        display: table-cell;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
}
</style>
