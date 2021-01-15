<template>
  <div :class="b()">
    <div :class="b('locker')">
      <div class="top">
        <img src="~@/assets/images/wired_locker.png" alt="" />
      </div>
      <div class="bottom">
        <div class="name">有线柜组</div>
        <div class="operate">
          <oa-button type="primary" disabled>绑定</oa-button>
        </div>
      </div>
    </div>
    <div :class="b('locker')">
      <div class="top">
        <img src="~@/assets/images/wireless_locker.png" alt="" />
      </div>
      <div class="bottom">
        <div class="name">无线柜组</div>
        <div class="operate">
          <oa-button type="primary" @click="bindLocker">绑定</oa-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addCabinetGroup } from '@/api/cabinet'
export default {
  name: 'locker-entry',

  bem: {
    b: 'locker-entry'
  },
  components: {},

  props: {},

  data() {
    return {
      searchQuery: this.$route.meta.query
    }
  },

  computed: {},

  async: {
    addCabinetGroup(data) {
      return addCabinetGroup(data)
    }
  },

  mounted() {},

  methods: {
    bindLocker() {
      this.addCabinetGroup({
        device_id: this.searchQuery.device_id
      }).then(res => {
        this.$router.push({
          name: 'product-locker-bind',
          query: {
            device_id: this.searchQuery.device_id
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.locker-entry {
  height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
  &__locker {
    width: 260px;
    border-radius: 2px;
    border: 1px solid rgba(233, 233, 233, 1);
    .top {
      width: 258px;
      height: 161px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bottom {
      background-color: #fff;
      .name {
        padding: 16px 16px 28px 16px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
      }
      .operate {
        display: flex;
        justify-content: flex-end;
        padding: 0 24px 24px 24px;
      }
    }
  }
  &__locker:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
  }
  &__locker:nth-of-type(1) {
    margin-right: 90px;
  }
}
</style>
