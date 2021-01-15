<template>
  <oa-modal title="客户查重" v-model="show" :width="900" :footer="null">
    <a-row>
      <p class="margin-t16 margin-b16">
        重复或相似的的记录共有{{ pager.t || 0 }}条，请核查。重复部分已高亮标识。
      </p>
      <oa-table
        :loading="getConflictInfo$loading"
        :columns="columns"
        :dataSource="conflictInfo"
        :pagination="false"
        :showFullScreen="false"
        rowKey="id"
      ></oa-table>
      <div
        class="text-center margin-t16 margin-b16"
        v-if="conflictInfo.length > 0"
      >
        <a-pagination
          simple
          :defaultCurrent="pager.p"
          :total="pager.t"
          :pageSize="pager.ps"
          @change="pageChange"
        />
      </div>
    </a-row>
  </oa-modal>
</template>
<script>
import { searchConflictInfo } from '@/api/leads'
import { columns } from './search-repeat#config'
export default {
  name: 'SearchConflict',
  props: {
    mobile: {
      type: String
    }
  },
  data() {
    return {
      conflictInfo: [],
      show: false,
      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      }
    }
  },
  computed: {
    columns
  },
  created() {
    this.getConflictInfo()
  },
  async: {
    getConflictInfo() {
      return searchConflictInfo({
        keywords: this.mobile,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.conflictInfo = res.list
        this.pager.total = res.pager
      })
    }
  },
  filters: {
    brandNameFilter(val) {
      return '正则错啦'
    }
  },
  methods: {
    // TODO 省份城市处理
    pageChange() {
      this.getConflictInfo()
    }
  }
}
</script>
