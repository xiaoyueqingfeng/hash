<template>
  <oa-modal title="客户冲突查询" v-model="show" :width="900" :footer="null">
    <a-row>
      <a-input-search
        placeholder="请输入客户名称、联系人手机号"
        @search="onSearch"
        enterButton="搜索"
      />
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
      >
        <template slot="name" slot-scope="text, record">
          <div
            v-html="
              record.brand_name.replace(
                new RegExp(keywords, 'g'),
                `<span style='background:rgba(24,144,255,0.25);
'>${keywords}</span>`
              )
            "
          ></div>
        </template>
      </oa-table>
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
import { columns } from './search-conflict#config'
export default {
  name: 'SearchConflict',
  data() {
    return {
      conflictInfo: [],
      show: false,
      pager: {
        p: 1, // 分页当前页
        ps: 20 // 每页数量
      },
      keywords: ''
    }
  },
  computed: {
    columns
  },
  async: {
    getConflictInfo() {
      if (!this.keywords) {
        return
      }
      return searchConflictInfo({
        keywords: this.keywords,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.conflictInfo = res.list
        this.pager = res.pager
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
    pageChange(p) {
      this.pager.p = p
      this.getConflictInfo()
    },
    onSearch(value) {
      this.keywords = value
      this.getConflictInfo()
    }
  }
}
</script>
