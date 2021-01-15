<template>
  <div class="customer-detail" :class="{ noTag: !brand_tag.length }">
    <detailHeader
      :headerInfo="header"
      :auth_area="headerAuthArea"
      @closePageModal="closePageModal"
    />
    <div class="customer-detail__content">
      <div class="customer-detail__content--left">
        <oa-panel tabs>
          <a-tabs @change="changeLeftComponent">
            <a-tab-pane
              :tab="tab.label"
              v-for="tab in tabsLeft"
              :key="tab.route.name"
            >
              <span slot="tab">{{ tab.label }}</span>
              <!-- <div class="tab-content">
                <span class="circle"></span>
              </div>-->
            </a-tab-pane>
          </a-tabs>
          <component
            v-bind:is="currentViewLeft"
            :headerInfo="header"
          ></component>
        </oa-panel>
      </div>
      <div class="customer-detail__content--right">
        <oa-panel tabs>
          <a-tabs @change="changeRightComponent">
            <a-tab-pane
              :tab="tab.label"
              v-for="tab in tabsRight"
              :key="tab.route.name"
            >
              <span slot="tab">{{ tab.label }}</span>
              <div class="tab-content">
                <!-- <span class="circle"></span> -->
              </div>
            </a-tab-pane>
          </a-tabs>
          <component v-bind:is="currentViewRight"></component>
        </oa-panel>
      </div>
    </div>
  </div>
</template>
<script>
import detailHeader from './header'
import detailVisit from './visit'
import detailServe from './serve'
import detailChange from './change'
import detailMention from './mention'
import detailInfo from './info'
import detailContact from './contact'
import detailPayRecord from './pay-record'
import detailPlugin from './plugin'
import detailBusinessStatus from './business-status'
import { getDetailHeaderInfo } from '@/api/leads'
import { get } from 'lodash-es'
export default {
  name: 'Index',
  data() {
    return {
      currentViewLeft: 'detailInfo',
      currentViewRight: 'detailVisit',
      header: {}, // 头部信息
      headerAuthArea: {}, //头部操作权限
      info: {}, // 基础信息
      tabsLeft: [
        {
          label: '客户资料',
          route: { name: 'detailInfo' }
        },
        {
          label: '联系人',
          route: { name: 'detailContact' }
        },
        {
          label: '付费记录',
          route: { name: 'detailPayRecord' }
        },
        {
          label: '开通服务',
          route: { name: 'detailPlugin' }
        }
        // {
        //   label: '运营状态',
        //   route: {
        //     name: 'detailBusinessStatus'
        //   }
        // }
      ],
      tabsRight: [
        {
          label: '拜访记录',
          route: { name: 'detailVisit' }
        },
        {
          label: '服务记录',
          route: { name: 'detailServe' }
        },
        {
          label: '变动记录',
          route: { name: 'detailChange' }
        },
        {
          label: '注意事项',
          route: {
            name: 'detailMention'
          }
        }
      ]
    }
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    },
    brand_tag() {
      return get(this.header, 'brand_tag', [])
    }
  },
  created() {
    this.getDetailHeaderInfo()
  },
  async: {
    // 头部
    getDetailHeaderInfo() {
      return getDetailHeaderInfo({ leads_id: this.leads_id }).then(res => {
        this.header = get(res, 'list', {})
        this.headerAuthArea = get(res, 'auth_area', {})
      })
    }
  },
  methods: {
    closePageModal() {
      this.$emit('closePageModal')
    },
    // 动态切换tab组件
    changeRightComponent(name) {
      this.currentViewRight = name
    },
    changeLeftComponent(name) {
      this.currentViewLeft = name
    }
  },
  components: {
    detailHeader,
    detailVisit,
    detailServe,
    detailChange,
    detailMention,
    detailInfo,
    detailContact,
    detailPayRecord,
    detailPlugin,
    detailBusinessStatus
  }
}
</script>
<style lang="less" scoped>
.customer-detail {
  &.noTag {
    .customer-detail__content {
      top: 120px;
    }
  }
  &__content {
    .pos-a;
    .w(100%);
    display: flex;
    justify-content: space-between;
    top: 160px;
    .pd-t(16px);
    bottom: 0;
    overflow-y: scroll;

    &--left {
      display: inline-block;
      width: 63%;
      background: #fff;
      min-height: 510px;
      margin-right: 16px;
      padding-bottom: 16px;
    }
    &--right {
      display: inline-block;
      width: 37%;
      background: #fff;
      min-height: 510px;
      .tab-content {
        overflow: auto;
      }
      .oa-panel--tabs {
        padding-bottom: 20px;
        .ant-tabs-tabpane {
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
