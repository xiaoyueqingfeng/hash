<template>
  <oa-modal title="取消冻结" v-model="show" :width="600" @ok="onSubmit">
    <div class="title-tab mg-b16">恢复品牌</div>
    <div>
      <div class="error-text mg-b16">
        该品牌下所有门店（{{ shopList.length }}家）
      </div>
      <oa-table
        rowkey="brand_buy_shop_id"
        :columns="columns"
        :dataSource="shopList"
        :pagination="false"
      >
        <template slot="frozen_days" slot-scope="text, record">
          <span class="error-text">{{ record.frozen_days }}天</span>
        </template>
        <template slot="shop_status" slot-scope="text, record">
          <span>
            <a-badge status="error" />
            {{ record.status_desc }}
          </span>
        </template>
      </oa-table>
    </div>
  </oa-modal>
</template>
<script>
import { columns } from './unfreeze#config'
import { shopBuyList } from '@/api/shop'
import { unfrozen } from '@/api/leads'
import { get } from 'lodash-es'

export default {
  data() {
    return {
      show: false,
      shopList: []
    }
  },
  props: {
    customerId: {
      type: [String, Number],
      default: ''
    }
  },
  async: {
    getshopList() {
      return shopBuyList({ leads_id: this.customerId }).then(res => {
        this.shopList = get(res, 'list', [])
      })
    },
    unfreeze(data) {
      return unfrozen(data)
    }
  },
  created() {
    this.getshopList()
  },
  computed: {
    columns
  },
  methods: {
    onSubmit() {
      this.unfreeze({ leads_id: this.customerId }).then(res => {
        this.show = false
        this.$message.success('系统解冻成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title-tab {
  width: 80px;
  line-height: 32px;
  text-align: center;
  color: @primary-color;
  border-bottom: 2px solid @primary-color;
}
.error-text {
  color: @error-color;
}
</style>
