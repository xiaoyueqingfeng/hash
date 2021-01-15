<template>
  <a-layout
    class="layout-default"
    :class="{ 'layout-default--collapsed': collapsed }"
  >
    <slot name="prepend"></slot>
    <a-layout-header class="layout-default__header">
      <router-link :to="{ name: 'oa/index' }" class="layout-default__logo">
        <img width="122" src="~oa-core/assets/img/oa_logo.png" alt="oa-logo" />
      </router-link>
      <ul class="layout-default__menu">
        <li
          v-for="p in platform_list"
          :key="p.code"
          :class="{ active: $platform === p.code }"
        >
          <a :href="`/${p.code}`">{{ p.name }}</a>
        </li>
      </ul>
      <div class="layout-default__header-actions">
        <img
          class="user-avatar"
          :src="user_info.avatar_url | avatarFilter({ w: 48, h: 48 })"
        />
        <a-dropdown placement="bottomRight">
          <a class="user-name">{{ user_info.name }}</a>
          <a-menu slot="overlay">
            <a-menu-item @click="onUpdatePassword">修改密码</a-menu-item>
            <a-menu-item @click="onLogout">退出登录</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <SiderBar />
      <TabBar />
      <div class="layout-default__main">
        <div class="layout-default__content">
          <router-view></router-view>
          <oa-watermark v-if="hasShowWaterMarks"></oa-watermark>
          <div class="layout-default__footer">
            copyright &#169; 2019 三体云智能科技有限公司
          </div>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>
<script>
import TabBar from './default#tabBar'
import SiderBar from './default#siderBar'
import { mapGetters, mapMutations } from 'vuex'
import { removeAuthToken } from 'oa-core/utils/cookie'
import { loginout } from 'oa-core/api/user'
import container from 'oa-core/container'

export default {
  components: {
    TabBar,
    SiderBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('oa/user', ['user_info', 'platform_list']),
    ...mapGetters('oa/base', ['collapsed', 'hasShowWaterMarks'])
  },
  watch: {
    $route: {
      handler(newRoute) {
        let routeName = newRoute.name
        let watermarkRouteList = container.get('watermarkRouteList')
        let status = watermarkRouteList.includes(routeName)
        this.SET_WATERMARK_STATUS(status)
      },
      immediate: true
    }
  },
  methods: {
    onUpdatePassword() {
      this.$router.push({
        name: 'oa/user-update-password',
        query: {
          mobile: this.user_info.mobile
        }
      })
    },
    onLogout() {
      loginout().then(res => {
        removeAuthToken()
        this.$router.push({
          name: 'oa/user-login'
        })
      })
    },
    ...mapMutations('oa/base', ['SET_WATERMARK_STATUS'])
  }
}
</script>

<style lang="less">
.layout-default {
  min-height: 100%;

  &__header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 0;
    height: 56px;
    .lh(56px);

    background-image: linear-gradient(
      90deg,
      rgba(60, 152, 252, 1) 0%,
      rgba(28, 136, 253, 1) 100%
    );
  }
  &__logo {
    .mg-l(24px);
    display: inline-block;
    .w(160px);
    transition: width 0.2s;
    overflow: hidden;
  }
  &__menu {
    flex: 1;
    li:first-child {
      margin-left: 10px;
    }
    li {
      font-size: 16px;
      margin-top: 8px;
      float: left;
      list-style: none;
      width: 148px;
      // margin-left: 10px;
      line-height: 48px;
      text-align: center;
      a {
        .c(@white);
      }
    }
    li:hover,
    .active {
      background: url(~oa-core/assets/img/oa_menu_bg.png) no-repeat;
      background-size: 100%;
      a {
        display: block;
        .c(@text);
        font-weight: 500;
      }
    }
  }

  &__header-actions {
    display: flex;
    align-items: center;
    .mg-r(24px);
    .user-avatar {
      .s(24px, 24px);
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.45);
    }
    .user-name {
      display: inline-block;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .mg-l(8px);
      .c(@white);
    }
  }
  &__main {
    .pos-a;
    top: 96px;
    left: 201px;
    right: 0;
    bottom: 0;
    display: flex;
    transition: all 0.2s;
    min-width: 1000px;
    flex-direction: column;
  }
  &__content {
    position: relative;
    margin: 16px;
    flex: 1;
  }
  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    .ta-c;
    .fz(12px);
    .lh(20px);
    .c(@text-light);
    .pd-tb(16px);
  }
}
.layout-default--collapsed {
  .layout-default-tabs {
    left: 80px;
  }
  .layout-default__main {
    left: 80px;
  }
  .layout-default__logo {
    .w(40px);
  }
}
</style>
