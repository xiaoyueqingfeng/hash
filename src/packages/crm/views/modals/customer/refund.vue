<template>
  <oa-modal
    title="停转店"
    okText="确定停转"
    okType="danger"
    v-model="show"
    :width="676"
    @ok="onSubmit"
  >
    <a-row class="refund">
      <div class="refund-con">
        <div class="header">
          <div class="refund__left">
            <oa-t3 class="title mg-r16">
              <oa-tag
                type="work-model"
                class="mg-r8"
                :value="sysInfo.work_model || 1"
              ></oa-tag>
              <span>{{ sysInfo.name }}</span>
            </oa-t3>
            <div class="id">
              <span class="lable">ID:</span>
              <span class="value">{{ sysInfo.leads_id }}</span>
            </div>
          </div>
        </div>
        <ul class="version mg-b24 mg-l32">
          <li>
            <span class="label">当前系统：</span>
            <span class="value">{{ sysInfo.current_system }}</span>
          </li>
          <li>
            <span class="label">当前版本：</span>
            <span class="value">{{ sysInfo.current_version }}</span>
          </li>
        </ul>
        <div class="mg-b24 mg-l32">
          <span class="label">系统到期时间：</span>
          <span class="value">{{ sysInfo.system_expired_time }}</span>
        </div>
        <div class="mg-b24 mg-l32">
          <span class="label">总门店数：</span>
          <span class="value">{{ sysInfo.shop_total_num }}</span>
        </div>
      </div>

      <div class="mg-l32 mg-b32">
        <div class="created mg-l32 mg-b16">
          <span class="tips">已创建门店数:</span>
          <span>{{ sysInfo.shop_use_num }}</span>
          家
        </div>
        <div class="mg-l32">
          <oa-table
            :columns="columns"
            :pagination="false"
            :dataSource="dataSource"
            :showFullScreen="false"
          ></oa-table>
        </div>
        <div class="uncreated mg-l32 mg-t16">
          <span class="tips">未创建门店数:</span>
          <span>{{ sysInfo.shop_num }}</span>
          家
        </div>
      </div>
      <!-- <div class="tb mg-l32 mg-b16" v-if="systemVersion===2">
        <div class="created mg-l32  mg-b16">
          <span class="tips">已创建门店数:</span>
          <span>{{sysInfo.shop_use_num}}</span>家
        </div>
        <div class="tb-list mg-l32">
          <a-table
          :columns="columns"
            :scroll="{ x: 800 }"
            :pagination="false"
            :dataSource="tb_data">
          </a-table>
        </div>
        <div class="uncreated mg-l32  mg-t16">
          <span class="tips">未创建门店数:</span>
            <span>{{sysInfo.shop_num}}</span>家
          </div>
      </div>-->
      <div class="sub-info">
        <a-form>
          <a-form-item
            label="退款金额"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              type="number"
              min="0"
              v-model="params.amount"
              addonAfter="元"
              placeholder="请输入退款金额"
            />
          </a-form-item>
          <a-form-item
            label="备注"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-textarea
              v-model="params.remark"
              placeholder="请输入备注信息"
              :rows="4"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>
<style scope lang="less">
.refund__left {
  display: flex;
  .title {
    display: flex;
    align-items: center;
  }
  .id {
    .c(rgba(0, 0, 0, 0.45));
  }
}
.refund-con {
  .version {
    margin-top: 16px;
    display: flex;
    align-items: center;
    li:first-child {
      .mg-r(24px);
    }
  }
}
</style>

<script>
import { getRefundOptions, setRefund } from '@/api/pay'
import { columns } from './refund#config'

export default {
  name: 'Refund',
  props: {
    customerId: String
  },
  data() {
    return {
      // remaining_shop: false,
      // saas 2.0 暂时不做
      // systemVersion: 2,
      dataSource: [],
      show: false,
      sysInfo: {},
      params: {
        shop_id: '',
        amount: '',
        remark: ''
      }
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.getRefundOptions()
  },
  async: {
    getRefundOptions() {
      return getRefundOptions({ leads_id: this.customerId }).then(res => {
        this.dataSource = res.shop.map(item => {
          return {
            key: item.id,
            storeName: item.name,
            expireTime: `${item.expired_time} (剩余 ${item.expired_day})`
          }
        })
        this.sysInfo = res.brand_info
      })
    },
    setRefund() {
      let params = {
        ...this.params,
        leads_id: this.customerId
      }
      return setRefund(params).then(res => {
        this.show = false
        this.$emit('done')
        this.$message.success('操作成功', 5)
      })
    }
  },
  methods: {
    onSubmit() {
      this.setRefund()
    }
  }
}
</script>
