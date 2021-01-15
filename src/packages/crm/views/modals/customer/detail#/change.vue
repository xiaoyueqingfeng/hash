<template>
  <div class="change">
    <detailChangeItem :changeInfo="changeData" />
    <div class="text-right margin-t16" v-if="changeData.length > 0">
      <a-pagination
        simple
        :defaultCurrent="pagination.current"
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        @change="pageChange"
      />
    </div>
  </div>
</template>
<script>
import detailChangeItem from './change-item'
import { getDetailChangeInfo } from '@/api/leads'
export default {
  name: 'Change',
  data() {
    return {
      changeData: [],
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      }
    }
  },
  components: {
    detailChangeItem
  },
  created() {
    this.getChangeInfo()
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    }
  },
  methods: {
    getChangeInfo() {
      getDetailChangeInfo({
        leads_id: this.leads_id,
        p: this.pagination.current,
        ps: this.pagination.pageSize
      }).then(res => {
        this.changeData = res.list instanceof Array && res.list
        this.pagination.total = res.pager.t
      })
    },
    pageChange(p) {
      this.pagination.current = p
      this.getChangeInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.change {
  padding: 0 16px;
}
</style>
