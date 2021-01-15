<template>
  <div class="export">
    <oa-filter-box>
      <oa-date-range-filter
        :start.sync="$searchQuery.start_time"
        :end.sync="$searchQuery.end_time"
        :placeholder="['开始时间', '结束时间']"
        @change="onDateChange"
      ></oa-date-range-filter>
      <template slot="actions">
        <oa-button type="primary" @click="getDataList">刷新状态</oa-button>
        <oa-button class="mg-l8" @click="openLeadsModal">leads导出</oa-button>
      </template>
    </oa-filter-box>
    <div class="content mg-t16">
      <oa-table
        rowKey="id"
        :columns="tableOptions.columns"
        :loading="getDataList$loading"
        :pager="pager"
        :dataSource="dataList"
        @change="tbOnTableChange"
      >
        <div slot="status_name" slot-scope="record">
          <a-badge
            :status="record.is_failed ? 'error' : 'success'"
            :title="record.remark"
          />
          <span class="mg-r8">{{ record.status_name }}</span>
          <a-tooltip placement="topLeft" v-if="record.is_failed">
            <a-icon type="info-circle" />
            <template slot="title">
              <span>{{ record.remark }}</span>
            </template>
          </a-tooltip>
          <span>
            ({{ record.current_task_num }}/{{ record.general_task_num }})
          </span>
        </div>
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-if="record.auth_area['web/export/get_export_excel']"
              @click="handleExport(record)"
            >
              下载
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { tableOptions } from './export#config'
import { getExportList, getExportExcel } from '@/api/export'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataList: [],
      pager: {
        t: 1,
        ps: 20,
        t: 0
      }
    }
  },

  computed: {
    tableOptions
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getDataList()
    }
  },

  created() {
    this.getDataList()
  },

  async: {
    getDataList() {
      return getExportList(this.$searchQuery).then(res => {
        console.log('初始化', res)
        this.dataList = get(res, 'list', [])
        this.pager = get(res, 'pager', {
          t: 1,
          ps: 20,
          t: 0
        })
      })
    },
    downloadExcel(id) {
      return getExportExcel({
        id
      })
    }
  },

  methods: {
    /**
     *  打开导出弹窗
     *  */
    openLeadsModal() {
      this.$modalRouter.push({
        name: 'dowload-export',
        on: {
          done: () => {
            console.log('导出成功')
            this.getDataList()
          }
        }
      })
    },
    /**
     *  点击导出
     *  */
    handleExport(e) {
      this.downloadExcel(e.id).then(res => {
        let dom = document.createElement('a')
        dom.href = res
        dom.target = '_blank'
        dom.click()
      })
    },
    /**
     *  搜索栏搜索
     *  */
    onDateChange(e) {
      console.log('onDateChange', e)
      this.$router.push({
        query: {
          p: 1,
          start_time: e.start,
          end_time: e.end
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter {
  display: flex;
  justify-content: space-between;
}
</style>
