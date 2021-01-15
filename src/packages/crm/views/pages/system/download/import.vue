<template>
  <div class="import">
    <oa-filter-box>
      <oa-date-range-filter
        :start.sync="$searchQuery.start_time"
        :end.sync="$searchQuery.end_time"
        :placeholder="['开始时间', '结束时间']"
        @change="onDateChange"
      ></oa-date-range-filter>
      <template slot="actions">
        <oa-button type="primary" @click="openLeadsModal">leads导入</oa-button>
      </template>
    </oa-filter-box>
    <div class="content mg-t16">
      <oa-table
        rowKey="id"
        :scroll="{ x: 1000 }"
        :columns="tableOptions.columns"
        :loading="getDataList$loading"
        :pager="pager"
        :dataSource="dataList"
        @change="tbOnTableChange"
      >
        <div slot="numbers" slot-scope="record">
          {{ record.successed_num }}/{{ record.failed_num }}
        </div>
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
        </div>
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-if="record.auth_area['web/import/get_import_failed_excel']"
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
import { tableOptions } from './import#config'
import { getImportList, getImportFailExcel } from '@/api/import'
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
        p: 1,
        ps: 20
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
      return getImportList(this.$searchQuery).then(res => {
        console.log('初始化', res)
        this.dataList = get(res, 'list', [])
        this.pager = get(res, 'pager', { p: 1, ps: 20, t: 0 })
      })
    },
    getImportFailExcel(id) {
      return getImportFailExcel({
        id
      })
    }
  },

  methods: {
    openLeadsModal() {
      this.$modalRouter.push({
        name: 'dowload-import',
        on: {
          done: () => {
            console.log('导入成功')
            this.getDataList()
          }
        }
      })
    },
    handleExport(e) {
      this.getImportFailExcel(e.id).then(res => {
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
      this.$router.push({
        query: {
          p: 1,
          start_time: e.start,
          end_time: e.end
        }
      })
    },
    // 表格切页
    onTableChange(pagination, filter, sorter) {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: pagination.current
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
