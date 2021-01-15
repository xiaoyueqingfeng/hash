<template>
  <div :class="b()">
    <oa-tag
      type="work-model"
      :value="headerInfo.work_model"
      class="margin-t3"
    ></oa-tag>
    <div :class="bWrap()">
      <div :class="bWrap('title')">
        <span class="text">{{ headerInfo.brand_name }}</span>
        <oa-tag
          class="mg-r8"
          type="brand-category"
          :value="headerInfo.brand_category"
        />
        <oa-tag
          type="brand-level"
          v-if="headerInfo.brand_level && headerInfo.brand_level > 0"
          :value="headerInfo.brand_level"
          class="mg-r8"
        />
        <oa-tag
          type="serve-level"
          v-if="headerInfo.server_level && headerInfo.server_level > 0"
          :value="headerInfo.server_level"
        />
        <a
          v-modal-link="{
            name: 'customer-unbind-hardware',
            props: {
              type: 'single',
              customerIds: headerInfo.id
            },
            on: { done: onModldone }
          }"
          class="fl-r"
          :class="bOperation()"
          v-if="auth_area['web/pay/unbind_hardware']"
        >
          <a-button type="primary">解绑硬件销售</a-button>
        </a>
        <a
          v-modal-link="{ name: 'contact-edit', props: { info: headerInfo } }"
          class="fl-r mg-r8"
          :class="bOperation()"
          v-if="detail_auth['web/contact/add']"
        >
          <a-button type="primary">新建联系人</a-button>
        </a>
      </div>
      <div :class="bWrap('id')">
        <span>ID:</span>
        <span>{{ headerInfo.id }}</span>
      </div>
      <div :class="bWrap('tag')" v-if="brand_tag && brand_tag.length">
        <div class="brand-tag">
          <crm-color-tag
            :bgColor="tag.color_tip"
            :label="tag.name"
            :key="tag.id"
            v-for="tag in brand_tag"
          ></crm-color-tag>
        </div>
      </div>
      <div :class="bWrap('detail')">
        <div class="views_display">
          <span>地址</span>
          {{
            headerInfo.province_name +
              '-' +
              headerInfo.city_name +
              '-' +
              headerInfo.area_name +
              '-' +
              headerInfo.address
          }}
        </div>
        <div class="views_display">
          <span>渠道来源</span>
          {{
            headerInfo.channel_level1_name +
              '-' +
              headerInfo.channel_level2_name
          }}
          <a-tooltip v-if="headerInfo.channel" placement="top">
            <a-icon type="exclamation-circle"></a-icon>
            <template slot="title">
              <span>
                {{ headerInfo.channel }}
              </span>
            </template>
          </a-tooltip>
        </div>
      </div>
      <div class="loading">
        <a-spin :spinning="isLoading" />
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  name: 'Header',
  bem: {
    b: 'customer-header',
    bWrap: 'customer-header-wrap',
    bOperation: 'customer-header-operation'
  },
  data() {
    return {}
  },
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth_area: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    detail_auth() {
      return this.$store.state.leads.detail_auth
    },
    isLoading() {
      if (!Object.keys(this.headerInfo).length > 0) {
        return true
      }
      return false
    },
    brand_tag() {
      return get(this.headerInfo, 'brand_tag', [])
    }
  },
  components: {},
  methods: {
    onModldone() {
      this.$emit('closePageModal')
      this.$router.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.customer-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  box-shadow: 0px 3px 4px 0px rgba(124, 124, 124, 0.1);
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 24px 24px 16px;
  &-wrap {
    position: relative;
    width: 98%;
    .mg-l(16px);
    &__title {
      margin-bottom: 2px;
      &::after {
        vertical-align: middle;
      }
      span {
        display: inline-block;
        margin-right: 10px;
      }
      .text {
        vertical-align: -4px;
        font-size: 20px;
        color: #000;
      }
      .little-tips {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    &__id {
      height: 20px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 20px;
      margin-bottom: 8px;
    }
    &__tag {
      margin-bottom: 16px;
      height: 22px;
    }
    &__detail {
      display: flex;
      .views_display {
        flex: 1;
        span {
          color: rgba(0, 0, 0, 0.45);
          margin-right: 8px;
        }
      }
    }
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: 14px;
      margin-top: -14px;
    }
  }
}
.brand-tag {
  display: inline-block;
  span {
    margin-right: 8px;
  }
}
</style>
