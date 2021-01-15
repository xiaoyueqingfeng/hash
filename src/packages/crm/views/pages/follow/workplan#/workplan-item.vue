<template>
  <div class="plan-item" :class="'plan-item-' + workPlanInfo.status">
    <div class="plan-item__left">
      <div class="plan-item__left--time">
        {{ workPlanInfo.remind_time && workPlanInfo.remind_time.split(' ')[1] }}
      </div>
      <div class="plan-item__left--foot">
        <span>h</span>
        <span>min</span>
      </div>
    </div>
    <div class="plan-item__right">
      <div
        class="plan-item__right--title"
        v-modal-link="{
          name: 'customer-detail',
          props: {
            leadsId: workPlanInfo.leads_id,
            leadsSn: workPlanInfo.leads_sn,
            visible: true
          }
        }"
      >
        {{ workPlanInfo.leads_name }}
      </div>
      <div>
        <span class="plan-item__right--name">{{ workPlanInfo.name }}</span>
        <a class="margin-l8" @click="goRecord(workPlanInfo.type_tip)">
          {{ workPlanInfo.type_tip }}
        </a>
        <div class="plan-item__right--text">{{ workPlanInfo.detail }}</div>
      </div>
    </div>
    <div v-if="workPlanInfo.status_tip == '未完成'">
      <a-dropdown class="dropdown" :trigger="['click']">
        <span
          class="ant-dropdown-link"
          :class="'dropdown-' + workPlanInfo.status"
          href="#"
        >
          未完成
          <a-icon class="icon" type="check" />
        </span>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item v-for="item in statusList" :key="item.id">
            <a href="javascript:;">{{ item.name }}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-date-picker
        showTime
        :disabledDate="disabledDate"
        @change="onDateChange"
        format="YYYY-MM-DD HH:mm:ss"
        v-if="isShowDatePicker"
        placeholder="延期时间"
      />
    </div>
    <div class="tag" :class="'tag-' + workPlanInfo.status" v-else>
      {{ workPlanInfo.status_tip }}
    </div>
    <oa-modal
      title="取消工作计划"
      v-model="visible"
      @ok="cancelPlan"
      okText="确认"
      cancelText="取消"
    >
      <p>是否将该工作计划标记为取消状态？</p>
      <p>状态变更后无法修改</p>
    </oa-modal>
  </div>
</template>
<script>
export default {
  nama: 'WorkplanItem',
  data() {
    return {
      status: 1,
      isShowDatePicker: false,
      remind_time: '',
      // selectList: [],
      visible: false
    }
  },
  created() {},
  props: {
    workPlanInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    statusList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onChange(val) {
      this.status = val
      this.isShowDatePicker = false
    },
    onDateChange(val, string) {
      this.remind_time = string
      let para = {
        id: this.workPlanInfo.id,
        status: 3,
        remind_time: this.remind_time
      }
      this.$emit('emitEditPlan', para)
      this.isShowDatePicker = false
    },

    cancelPlan(id) {
      let para = {
        id: this.workPlanInfo.id,
        status: 4
      }
      this.$emit('emitEditPlan', para)
      this.visible = false
    },
    goRecord(para) {
      if (para === '拜访记录') {
        this.$router.push({
          path: '/follow/visit',
          query: {
            id: this.workPlanInfo.object_id
          }
        })
      } else {
        this.$router.push({
          path: '/follow/service',
          query: {
            id: this.workPlanInfo.object_id
          }
        })
      }
    },
    handleMenuClick(e) {
      /* eslint-disable */
      if (e.key == 2) {
        let para = {
          id: this.workPlanInfo.id,
          status: 2
        }
        this.$emit('emitEditPlan', para)
      }
      /* eslint-disable */
      if (e.key == 3) {
        this.isShowDatePicker = true
        return
      }
      /* eslint-disable */
      if (e.key == 4) {
        this.visible = true
      }
      this.isShowDatePicker = false
    },
    disabledDate(current) {
      return current && current < moment().startOf('day')
    }
  }
}
</script>
<style lang="less" scoped>
.plan-item {
  position: relative;
  height: 142px;
  border: 1px solid rgba(217, 217, 217, 1);
  padding: 28px 24px;
  display: flex;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  // 未完成
  &-1 {
    border-left: 4px solid @primary-color;
  }
  // 已完成
  &-2 {
    border-left: 4px solid @success-color;
  }
  // 已延期
  &-3 {
    border-left: 4px solid @warning-color;
  }
  // 已取消
  &-4 {
    border-left: 4px solid #d6d6d6;
  }
  &__left {
    position: relative;
    width: 140px;
    height: 86px;
    line-height: 86px;
    display: inline-block;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(252, 252, 252, 1) 100%,
      rgba(232, 232, 232, 1) 100%
    );
    border-radius: 4px;
    border: 1px solid rgba(232, 232, 232, 1);
    &--time {
      font-size: 38px;
      font-family: Impact;
      color: rgba(0, 0, 0, 0.65);
      letter-spacing: 5px;
    }
    &--foot {
      display: flex;
      justify-content: space-around;
      padding: 0 10px;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.25);
      margin-top: -22px;
    }
  }
  &__right {
    display: inline-block;
    .mg-l(32px);
    &--title {
      font-size: 20px;
      font-weight: 400;
      color: #1890ff;
      cursor: pointer;
      line-height: 28px;
    }
    &--name {
      display: inline-block;
      margin: 16px 0 6px 0;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
    }
    &--text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }
  }
  .dropdown {
    position: absolute;
    right: -1px;
    top: -1px;
    height: 32px;
    width: 82px;
    box-sizing: border-box;
    line-height: 32px;
    padding: 0 28px 0 8px;
    text-align: center;
    border-radius: 0px 2px 0px 2px;
    border: 1px solid rgba(59, 160, 255, 1);
    cursor: pointer;
    &-1 {
    }
    &-4 {
      background: red;
    }
  }
  .ant-dropdown-link {
    margin-right: 0 !important;
    background: rgba(230, 247, 255, 1);
    color: #3ba0ff;
    .icon {
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      color: white;
      width: 22px;
      height: 30px;
      line-height: 30px;
      background: rgba(59, 160, 255, 1);
      border-radius: 0px 2px 0px 0px;
    }
  }
  .tag {
    position: absolute;
    right: -1px;
    top: -1px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 0px 0px 0px 2px;
    &-1 {
      background: #d9d9d9;
    }
    &-2 {
      background: rgba(226, 255, 255, 1);
      border: 1px solid rgba(54, 203, 203, 1);
      color: rgba(54, 203, 203, 1);
    }
    &-3 {
      background: rgba(255, 246, 230, 1);
      border: 1px solid #fcb642;
      color: rgba(252, 182, 66, 1);
    }
    &-4 {
      border: 1px solid rgba(217, 217, 217, 1);
      background: rgba(245, 245, 245, 1);
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .ant-calendar-picker {
    position: absolute;
    right: 80px;
    top: 0;
    cursor: pointer;
  }
}
</style>
