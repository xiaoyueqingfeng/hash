<template>
  <div :class="b()">
    <div :class="b('content')" v-show="!getDetailInfo$loading">
      <div :class="bSection()">
        <h4 class="mg-t8">
          <span class="mg-r8">基本信息</span>
          <crm-accordion-dropdown :show.sync="baseShow" />
        </h4>
        <div :class="bSection('content')" v-show="baseShow">
          <p>
            <span>所属行业</span>
            <span>{{ infoRes.model_type_tip || '--' }}</span>
          </p>
          <p>
            <span>VIP分类</span>
            <span>{{ infoRes.vip_type_tip || '--' }}</span>
          </p>
          <p>
            <span>系统到期时间</span>
            <span>{{ infoRes.system_expired_time || '--' }}</span>
          </p>
          <p>
            <span>系统原到期时间</span>
            <span>{{ infoRes.old_expired_time || '--' }}</span>
          </p>
          <p>
            <span>新签门店数量</span>
            <span>{{ infoRes.shop_num }}</span>
          </p>
          <p>
            <span>已使用门店数量</span>
            <span>{{ infoRes.shop_use_num }}</span>
          </p>
          <p>
            <span>员工账号数量</span>
            <span>{{ infoRes.staff_num }}</span>
          </p>
          <p>
            <span>超管手机号</span>
            <span>
              {{ infoRes.admin_mobile || '--' }}
              <crm-call
                :leads_id="infoRes.id"
                :callNumber="infoRes.admin_mobile"
                :customerType="customerType"
              ></crm-call>
            </span>
          </p>
          <p>
            <span>申请人</span>
            <span>{{ infoRes.apply_username || '--' }}</span>
          </p>
          <p>
            <span>申请人手机号</span>
            <span>
              {{ infoRes.apply_mobile || '--' }}
              <crm-call
                :leads_id="infoRes.id"
                :callNumber="infoRes.apply_mobile"
                :customerType="customerType"
              ></crm-call>
            </span>
          </p>
          <p>
            <span>申请时间</span>
            <span>{{ infoRes.apply_time || '--' }}</span>
          </p>
          <p>
            <span>创建时间</span>
            <span>{{ infoRes.created_time || '--' }}</span>
          </p>
        </div>
      </div>
      <div :class="bSection()">
        <h4>
          <span class="mg-r8">跟进信息</span>
          <crm-accordion-dropdown :show.sync="followShow" />
        </h4>
        <div :class="bSection('content')" v-show="followShow">
          <div :class="bSection('display')">
            <p>
              <span>目前销售</span>
              <span>{{ infoRes.sale_name || '--' }}</span>
            </p>
            <p>
              <span>前任销售</span>
              <span>{{ infoRes.pre_sale_name || '--' }}</span>
            </p>
          </div>
          <!-- 隐藏字段显示 TPAD storyID = 1003565 -->
          <!-- <div :class="bSection('display')">
            <p>
              <span>目前客运</span>
              <span>{{ infoRes.custom_operate_name || '--' }}</span>
            </p>
            <p>
              <span>前任客运</span>
              <span>{{ infoRes.pre_custom_operate_name || '--' }}</span>
            </p>
          </div> -->
          <div :class="bSection('display')">
            <p>
              <span>目前客续</span>
              <span>{{ infoRes.custom_renewal_name || '--' }}</span>
            </p>
            <p>
              <span>前任客续</span>
              <span>{{ infoRes.pre_custom_renewal_name || '--' }}</span>
            </p>
          </div>
          <!-- <div :class="bSection('display')">
            <p>
              <span>目前硬件销售</span>
              <span>{{ infoRes.hardware_sale_name || '--' }}</span>
            </p>
            <p>
              <span>前任硬件销售</span>
              <span>{{ infoRes.pre_hardware_sale_name || '--' }}</span>
            </p>
          </div>
          <div :class="bSection('display')">
            <p>
              <span>目前电销</span>
              <span>{{ infoRes.tel_sale_name || '--' }}</span>
            </p>
            <p>
              <span>前任电销</span>
              <span>{{ infoRes.pre_tel_sale_name || '--' }}</span>
            </p>
          </div> -->
        </div>
      </div>
      <div :class="bSection()">
        <h4>
          <span class="mg-r8">门店信息</span>
          <crm-accordion-dropdown :show.sync="tableShow" />
        </h4>
        <oa-table
          :loading="getShopInfo$loading"
          :columns="tableOptions.columns"
          :rowKey="shopInfo.id"
          :dataSource="shopInfo"
          @change="onTableChange"
          :pager="pager"
          :showFullScreen="false"
          v-show="tableShow"
        >
          <div slot="shop_mobile" slot-scope="record">
            {{ record.shop_mobile }}
            <crm-call
              :leads_id="infoRes.id"
              :callNumber="record.shop_mobile"
              :customerType="customerType"
            ></crm-call>
          </div>
          <div slot="shop_status" slot-scope="record">
            <span class="circle" :class="'circle-' + record.shop_status"></span>
            <span>{{ record.status_desc }}</span>
          </div>
        </oa-table>
      </div>
    </div>
    <div class="loading">
      <a-spin :spinning="getDetailInfo$loading" />
    </div>
  </div>
</template>
<script>
import { getDetailInfo, getDetailShopInfo } from '@/api/leads'
import { get } from 'lodash-es'
import { tableOptions } from './info#config'
import { mapGetters } from 'vuex'
export default {
  name: 'Info',
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  bem: {
    b: 'info',
    bSection: 'info-section'
  },
  data() {
    return {
      infoRes: {}, // 后端数据
      shopInfo: [], // 表格数据
      pager: {
        p: 1, // 分页当前页
        ps: 10 // 每页数量
      },
      baseShow: true,
      followShow: true,
      tableShow: true
    }
  },
  created() {
    // 基础信息
    this.getDetailInfo()
    this.getShopInfo()
  },
  computed: {
    tableOptions,
    customerType() {
      return get(this.headerInfo, 'type')
    },
    ...mapGetters('leads', ['leads_id', 'leads_sn'])
  },
  async: {
    getDetailInfo() {
      return getDetailInfo({ leads_sn: this.leads_sn }).then(res => {
        this.infoRes = get(res, 'list', {})
        let auth = get(res, 'auth_area', [])
        this.$store.commit('leads/SET_DETAIL_AUTH', auth)
      })
    },
    getShopInfo() {
      return getDetailShopInfo({
        leads_id: this.leads_id,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.shopInfo = get(res, 'list', [])
        this.pager = res.pager
      })
    }
  },
  methods: {
    onTableChange(pagination, filter, sorter) {
      this.pager.p = pagination.current
      this.getShopInfo()
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.info {
  position: relative;
  padding: 0 24px;
  margin-top: -24px;
  .loading {
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -14px;
    margin-top: -14px;
  }
}
.info-section {
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 24px;
  h4 {
    margin: 24px 0 16px;
    display: flex;
    align-items: center;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -16px;
    p {
      width: 33.3%;
      text-align: left;
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      span {
        display: table-cell;
        word-break: break-word;
        font-size: 14px;
        height: 22px;
        color: rgba(0, 0, 0, 0.85);
      }
      span:first-child {
        white-space: nowrap;
        word-wrap: none;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }
    }
  }
  &__display {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    p {
      width: 100%;
    }
  }
  .circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 8px;
    border-radius: 50%;
    &-2,
    &-3,
    &-4 {
      background: rgba(245, 34, 45, 1);
    }
    &-1 {
      background: rgba(82, 196, 26, 1);
    }
  }
}
</style>
