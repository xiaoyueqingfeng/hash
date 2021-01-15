<template>
  <div class="plugin">
    <oa-table
      :loading="getPluginList$loading"
      :columns="tableOptions.columns"
      :dataSource="pluginList"
      rowKey="id"
      :pagination="{ pageSize: 10 }"
      :showFullScreen="false"
    ></oa-table>
  </div>
</template>
<script>
import { getPluginList } from '@/api/leads'
import { get } from 'lodash-es'
import { tableOptions } from './plugin#config'
import { mapGetters } from 'vuex'
export default {
  name: 'Contact',
  data() {
    return {
      pluginList: []
    }
  },
  created() {
    this.getPluginList()
  },
  computed: {
    tableOptions,
    ...mapGetters('leads', ['leads_id'])
  },
  async: {
    getPluginList() {
      return getPluginList({
        leads_id: this.leads_id
      }).then(res => {
        this.pluginList = res.list
      })
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.plugin {
  padding: 0 24px;
  margin-top: -24px;
}
</style>
