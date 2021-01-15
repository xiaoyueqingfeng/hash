<template>
  <oa-panel :loading="getLeadsFunnel$loading">
    <oa-t3>leads漏斗转化</oa-t3>
    <template slot="actions">
      <oa-date-range-filter
        @change="onReloadChart"
        :allowClear="false"
        :start.sync="search.date_start"
        :end.sync="search.date_end"
      ></oa-date-range-filter>
    </template>
    <div class="mg-t16">
      <oa-cascader
        @change="onReloadChart"
        placeholder="选择团队"
        change-on-select
        :options="organOptions"
        v-model="search.organ_id"
      ></oa-cascader>
      <oa-cascader
        class="mg-l16"
        placeholder="选择渠道"
        change-on-select
        @change="onReloadChart"
        :options="channelOptions"
        v-model="search.channel_id"
      ></oa-cascader>
      <div class="leads-funnel-chart-wrapper">
        <crm-funnel-chart
          :width="422"
          :height="456"
          :sourceData="funnel"
        ></crm-funnel-chart>
      </div>
    </div>
  </oa-panel>
</template>

<script>
import moment from 'moment'
import { getLeadsFunnel } from '@/api/stat'
import { getChannelList } from '@/api/channel'
import { getOrganList } from '@/api/user'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      search: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        organ_id: undefined,
        channel_id: undefined
      },
      organOptions: [],
      channelOptions: [],
      funnel: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    onReloadChart() {
      this.getLeadsFunnel()
    }
  },
  async: {
    initData() {
      return Promise.all([
        this.getLeadsFunnel(),
        this.getChannelList(),
        this.getOrganList()
      ])
    },
    getLeadsFunnel() {
      return getLeadsFunnel({ ...this.search }).then(res => {
        const _funnel = []
        _funnel.push({
          name: 'leads客户',
          value: res.leads_count
        })
        _funnel.push({
          name: '潜在客户',
          value: res.potential_proportion
        })
        _funnel.push({
          name: '签约客户',
          value: res.pay_proportion
        })
        this.funnel = _funnel
      })
    },
    getChannelList() {
      return getChannelList().then(res => {
        this.channelOptions = res.list
      })
    },
    getOrganList() {
      return getOrganList().then(res => {
        this.organOptions = get(res, '0.children', [])
      })
    }
  }
}
</script>

<style lang="less">
.leads-funnel-chart-wrapper {
  .mg-t(24px);
  display: flex;
  justify-content: center;
}
</style>
