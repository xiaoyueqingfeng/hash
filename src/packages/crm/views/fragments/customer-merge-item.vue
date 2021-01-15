<template>
  <div class="merge-item">
    <div class="header">
      <div class="title-wrap">
        <oa-tag
          type="work-model"
          class="icon-club"
          :value="mergeInfo.work_model"
        ></oa-tag>
        <span class="title">{{ mergeInfo.brand_name }}</span>
        <oa-tag
          class="margin-t-24"
          type="brand-category"
          :value="mergeInfo.brand_type_tip"
        />
      </div>
      <div class="setting">
        <a-radio
          @click.stop="getSettingVal(mergeInfo.id)"
          v-model="activeRadio"
          :disabled="!active"
        >
          设为主账号
        </a-radio>
      </div>
    </div>
    <div class="content">
      <div class="id">
        <span>ID:</span>
        <span>{{ mergeInfo.id }}</span>
      </div>
      <div class="column">
        <div>
          <span>客户区域:</span>
          <span>{{ mergeInfo.province_name + mergeInfo.city_name }}</span>
        </div>
        <div>
          <span>跟进销售:</span>
          <span>{{ mergeInfo.sale_name }}</span>
        </div>
      </div>
      <div class="column">
        <div>
          <span>详细地址:</span>
          <span>{{ mergeInfo.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerMergeItem',
  data() {
    return {}
  },
  props: {
    mergeInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    activeRadio: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    getSettingVal(para) {
      this.$emit('sendCheckedMain', para)
    }
  }
}
</script>
<style lang="less" scoped>
.merge-item {
  position: relative;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  // border: 1px solid #f5f5f5;
  padding: 24px 16px 24px 24px;
  border-radius: 4px;

  .header {
    padding: 0 40px;
    .title-wrap {
      .title {
        display: inline-block;
        max-width: 200px;
        .tov-e;
        height: 28px;
        margin-right: 16px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
      .icon-club {
        position: absolute;
        left: 24px;
        top: 24px;
      }
    }
    .setting {
      position: absolute;
      right: 16px;
      top: 16px;
    }
  }
  .content {
    padding: 0 40px;
    .id {
      height: 20px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 20px;
    }
  }
  .column {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
}
</style>
