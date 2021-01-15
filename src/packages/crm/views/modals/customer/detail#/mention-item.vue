<template>
  <div class="change-item">
    <div v-for="(item, index) in mentionInfo" :key="index">
      <a-timeline-item>
        <div class="content">
          <p class="column">
            <span class="circle"></span>
            <span class="label">变动时间:</span>
            <span class="value">{{ item.created_time }}</span>
          </p>
          <p class="column">
            <span class="label">操作人:</span>
            <span class="value">{{ item.operator_name }}</span>
          </p>
          <!-- <p class="column">
          <span class="label">变动类型:</span>
          <span class="value">{{item.action_type_tip}}</span>
          </p>-->
          <p class="column">
            <span class="label">注意事项:</span>
            <span class="value">{{ item.remark }}</span>
          </p>
        </div>
      </a-timeline-item>
    </div>
    <div class="loading">
      <a-spin :spinning="isLoading" />
    </div>
    <div class="text-center" v-if="mentionInfo.length === 0">
      <oa-empty></oa-empty>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MentionItem',
  data() {
    return {}
  },
  props: {
    mentionInfo: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isLoading: function() {
      if (this.mentionInfo) {
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
    .column {
      .label {
        display: table-cell;
        width: 70px;
        height: 20px;
        line-height: 20px;
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
