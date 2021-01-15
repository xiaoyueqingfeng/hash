<template>
  <div class="pay-record">
    <p>
      <span>软件消费总额（元）：</span>
      <span class="light-blue display-inlineblock margin-r8">
        {{ payInfo.software_price }}
      </span>
      <span>硬件消费总额（元）：</span>
      <span class="light-blue">{{ payInfo.hardware_price }}</span>
    </p>
    <oa-table
      :loading="getPayInfo$loading"
      :columns="tableOptions.columns"
      :dataSource="payInfo.list"
      @change="onTableChange"
      rowKey="id"
      :pager="pager"
      :showFullScreen="false"
    ></oa-table>
  </div>
</template>
<script>
import { getDetailPayrecordInfo } from '@/api/leads'
import { get } from 'lodash-es'
import { tableOptions } from './pay-record#config'
import { mapGetters } from 'vuex'
export default {
  name: 'PayRecord',
  data() {
    return {
      payInfo: [],
      pager: {
        p: 1, // 分页当前页
        ps: 10 // 每页数量
      }
    }
  },
  created() {
    this.getPayInfo()
  },
  computed: {
    tableOptions,
    ...mapGetters('leads', ['leads_id'])
  },
  async: {
    getPayInfo() {
      return getDetailPayrecordInfo({
        leads_id: this.leads_id,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.payInfo = res
        this.pager = res.pager
      })
    }
  },
  methods: {
    onTableChange(pagination, filter, sorter) {
      this.pager.p = pagination.current
      this.getPayInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.pay-record {
  padding: 0 24px;
  margin-top: -24px;
}
</style>
