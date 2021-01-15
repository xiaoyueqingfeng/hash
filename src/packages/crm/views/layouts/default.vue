<template>
  <oa-layout-default>
    <section slot="prepend">
      <ul class="channel">
        <li class="channel__item" v-if="auth_area['web/leads/add']">
          <a
            class="channel__item-icon channel__item-icon--create-customer"
            v-modal-link="{ name: 'customer-edit' }"
          >
            <oa-icon class="channel__item-icon--color" type="user"></oa-icon>
            <oa-icon class="channel__item-icon--white" type="user1"></oa-icon>
          </a>
          <span class="channel__item-tip">创建leads</span>
        </li>
        <li
          class="channel__item margin-b8"
          v-if="auth_area['web/leads/add_whitelist']"
        >
          <a
            class="channel__item-icon channel__item-icon--create-whitelist-customer"
            v-modal-link="{ name: 'customer-whitelist-edit' }"
          >
            <oa-icon
              class="channel__item-icon--color"
              type="whiteuser"
            ></oa-icon>
            <oa-icon
              class="channel__item-icon--white"
              type="whiteuser1"
            ></oa-icon>
          </a>
          <span class="channel__item-tip">创建白名单leads</span>
        </li>
        <li class="channel__item" v-if="auth_area['web/pay/merge']">
          <a
            class="channel__item-icon channel__item-icon--merge-customer"
            v-modal-link="{ name: 'customer-merge' }"
          >
            <oa-icon class="channel__item-icon--color" type="merge"></oa-icon>
            <oa-icon class="channel__item-icon--white" type="merge1"></oa-icon>
          </a>
          <span class="channel__item-tip">客户合并</span>
        </li>
        <li
          class="channel__item"
          v-if="auth_area['web/leads/check_duplicate_list']"
        >
          <a
            class="channel__item-icon channel__item-icon--search-conflict"
            v-modal-link="{ name: 'customer-search-conflict' }"
          >
            <oa-icon class="channel__item-icon--color" type="search"></oa-icon>
            <oa-icon class="channel__item-icon--white" type="search1"></oa-icon>
          </a>
          <span class="channel__item-tip">客户查重</span>
        </li>
        <li
          class="channel__item"
          v-if="auth_area['web/software/system_service']"
        >
          <a
            class="channel__item-icon channel__item-icon--system-service"
            v-modal-link="{ name: 'customer-system-service' }"
          >
            <oa-icon class="channel__item-icon--color" type="system"></oa-icon>
            <oa-icon class="channel__item-icon--white" type="system1"></oa-icon>
          </a>
          <span class="channel__item-tip">系统服务</span>
        </li>
      </ul>
    </section>
  </oa-layout-default>
</template>

<script>
import { mapGetters } from 'vuex'
import OaLayoutDefault from 'oa-core/views/layouts/default.vue'
import CallCenter from '@/utils/callCenter'

export default {
  components: {
    OaLayoutDefault
  },
  computed: {
    ...mapGetters('oa/user', ['auth_area'])
  },
  watch: {
    call_show: {
      handler(val) {},
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  position: fixed;
  right: 0px;
  top: 112px;
  z-index: 10;
  background: #fff;
  padding: 6px;
  transition: all 0.2s;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px 0px 0px 4px;
  &__item {
    position: relative;
    list-style: none;
    user-select: none;
    &:not(:last-child) {
      .mg-b(8px);
    }
    &-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      background: #f0f2f5;
      transition: all 0.5s;
      &--color {
        display: inline-block;
        width: 14px;
        height: 14px;
      }
      &--white {
        width: 14px;
        height: 14px;
        display: none;
      }
      &--create-customer:hover {
        background: #ff6c7e;
        box-shadow: 0px 2px 4px 0px rgba(255, 108, 126, 0.25);
      }
      &--create-whitelist-customer:hover {
        background: #ffc000;
        box-shadow: 0px 2px 4px 0px rgba(255, 192, 0, 0.25);
      }
      &--merge-customer:hover {
        background: #3ba0ff;
        box-shadow: 0px 2px 4px 0px rgba(24, 144, 255, 0.25);
      }
      &--search-conflict:hover {
        background: #36cbcb;
        box-shadow: 0px 2px 4px 0px rgba(54, 203, 203, 0.25);
      }
      &--system-service:hover {
        background: #ab7bfe;
        box-shadow: 0px 2px 4px 0px rgba(171, 123, 254, 0.25);
      }
    }
    &-tip {
      position: absolute;
      right: 36px;
      top: 0;
      padding: 7px;
      white-space: nowrap;
      font-size: 12px;
      line-height: 1.5;
      background: #fff;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
      display: none;
      color: rgba(0, 0, 0, 0.65);
      &:after {
        position: absolute;
        top: 11px;
        z-index: 0;
        right: -4px;
        content: '';
        width: 6px;
        height: 6px;
        transform: rotate(45deg);
        background: #fff;
        border-right: 2px solid transparent;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
      }
    }

    &:hover {
      transition: all 0.5s;
      .channel__item-icon--color {
        display: none;
      }
      .channel__item-icon--white {
        display: inline-block;
      }
      .channel__item-tip {
        display: inline-block;
      }
    }
  }
}
</style>
