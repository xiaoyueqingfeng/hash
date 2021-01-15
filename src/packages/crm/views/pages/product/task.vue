<template>
  <div class="hardware-task">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        v-model="$searchQuery.apk_name"
        enterButton
        @search="tbOnSearchKeywords('apk_name', $event)"
        placeholder="搜索更新包名称"
      ></a-input-search>

      <a-select v-model="$searchQuery.category_id" placeholder="选择设备类型">
        <a-select-option
          v-for="item in category"
          :key="item.category_id"
          :value="item.category_id"
        >
          {{ item.category_name }}
        </a-select-option>
      </a-select>
      <a-input
        class="mg-r8"
        v-model="$searchQuery.version_name"
        placeholder="请输入版本号"
        style="width:200px"
      ></a-input>
      <oa-date-range-filter
        class="mg-r8"
        :start.sync="$searchQuery.issue_start_time"
        :end.sync="$searchQuery.issue_end_time"
        :placeholder="['下发开始时间', '下发结束时间']"
      ></oa-date-range-filter>
      <template slot="actions">
        <oa-button @click="tbOnFilterSearch('apk_name', $event)" type="primary">
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
    </oa-filter-box>

    <oa-table
      class="mg-t16"
      :scroll="{ x: 1000 }"
      :columns="tableOptions.columns"
      rowKey="id"
      @change="tbOnTableChange"
      :pager="pager"
      :dataSource="dataSource"
      :loading="getUpdateTaskList$loading"
    >
      <template slot="issue_time_tip" slot-scope="text, record">
        {{ record.issue_time_tip }}
      </template>
    </oa-table>
  </div>
</template>
<script>
import { getCategory, getUpdateTaskList } from '@/api/hardware'
import { tableOptions } from './task#config.js'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  mixins: [tableMixins],
  data() {
    return {
      category: [],
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  created() {
    this.getCategory()
    this.getUpdateTaskList()
  },
  async: {
    getCategory() {
      return getCategory().then(res => {
        this.category = get(res, 'list.categorys', [])
      })
    },
    getUpdateTaskList() {
      //过滤空字符串
      this.$searchQuery = {
        ...this.$searchQuery,
        version_name: this.$searchQuery.version_name || undefined,
        apk_name: this.$searchQuery.apk_name || undefined
      }
      return getUpdateTaskList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager', this.pager)
      })
    }
  },
  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getUpdateTaskList({
        ...this.$searchQuery
      })
    }
  },
  methods: {
    /**
     * 查看更新范围
     */
    viewRange(id) {
      this.$modalRouter.push({
        name: 'hardware-update-range',
        props: { task_id: id }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.hardware-task {
  padding: 24px;
  background: #ffffff;
}
</style>
