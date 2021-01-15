<template>
  <oa-modal v-model="show" title="查看购买记录" width="1000px" :footer="null">
    <oa-table
      class="mg-t16"
      :scroll="{ x: 1100 }"
      :columns="tableOptions.columns"
      rowKey="order_sn"
      :loading="getBuyLog$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="buyLogList"
    >
      <template slot="order_items" slot-scope="text, record">
        <div v-for="(item, index) in record.order_items" :key="index">
          <span class="goods_name">{{ item.goods_name }}</span>
          <span class="goods_desc">{{ item.goods_spec_desc }}</span>
          <span class="goods_number">*{{ item.goods_number }}</span>
        </div>
      </template>
    </oa-table>
  </oa-modal>
</template>

<script>
import { getList, getBuyLog } from '@/api/distributor'
import { tableOptions } from './buy-log#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  name: 'BuyLog',
  mixins: [tableMixins],
  props: {
    // 账号id
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      show: true,
      buyLogList: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  computed: {
    tableOptions
  },
  mounted() {
    this.getBuyLog({
      distributor_id: this.id
    })
  },

  async: {
    // 获取硬件详情
    getBuyLog(data) {
      return getBuyLog(data).then(res => {
        this.pager = res.pager
        this.buyLogList = res.list
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul > li {
  line-height: 22px;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  .label {
    min-width: 100px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  span {
    color: rgba(0, 0, 0, 0.65);
    word-break: break-all;
  }
}
.goods_name {
  margin-right: 4px;
}
.goods_desc {
  color: @text-light;
}
.goods_number {
  color: @text-light;
}
</style>
