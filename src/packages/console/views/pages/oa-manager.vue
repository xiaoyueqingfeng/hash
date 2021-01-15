<template>
  <div class="oa-manager">
    <div class="oa-manager__header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="搜索版本id、版本号、版本名称"
        ></a-input-search>
        <template slot="actions">
          <oa-button
            @click="tbOnFilterSearch('keywords', $event)"
            type="primary"
          >
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>
        <oa-select
          style="width:200px"
          placeholder="请选择类型"
          v-model="$searchQuery.status"
          :options="statusOptions"
        ></oa-select>
        <oa-select
          style="width:200px"
          placeholder="请选择强更状态"
          v-model="$searchQuery.push_status"
          :options="pushStatusOptions"
        ></oa-select>

        <oa-date-range-filter
          :start.sync="$searchQuery.created_time_start"
          :end.sync="$searchQuery.created_time_end"
          :placeholder="['创建开始时间', '创建 结束时间']"
        ></oa-date-range-filter>
      </oa-filter-box>
      <oa-button
        type="primary"
        v-modal-link="{
          name: 'oa-manager-edit',
          on: { done: onModalDone }
        }"
      >
        新建版本
      </oa-button>
    </div>

    <oa-table
      :scroll="{ x: 1200 }"
      class="mg-t16"
      :columns="tableOptions.columns"
      :rowKey="row => row.id"
      :loading="getAppVersionList$loading"
      @change="tbOnTableChange"
      :pager="pager"
      :dataSource="versionList"
    >
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-modal-link="{
              name: 'oa-manager-edit',
              props: { versionId: record.id, isEdit: true },
              on: { done: onModalDone }
            }"
          >
            编辑
          </a>
          <a
            v-modal-link="{
              name: 'oa-manager-force-update',
              props: {
                versionInfo: record
              },
              on: { done: onModalDone }
            }"
          >
            版本推送
          </a>
          <a
            v-modal-link="{
              name: 'oa-manager-package-upload',
              props: {
                versionInfo: record
              },
              on: { done: onModalDone }
            }"
          >
            安装包上传
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { tableOptions, contactTableOptions } from './oa-manager#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import { getAppVersionList } from '@/api/appversion'
export default {
  mixins: [tableMixins],
  data() {
    return {
      versionList: [],
      statusOptions: [],
      pushStatusOptions: [],
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
    this.getAppVersionList()
  },
  watch: {
    $route() {
      this.$searchQuery = this.$route.meta.query
      this.getAppVersionList()
    }
  },
  async: {
    getAppVersionList() {
      return getAppVersionList({
        ...this.$searchQuery
      }).then(res => {
        this.statusOptions = res.status
        this.pushStatusOptions = res.push_status
        this.versionList = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    onModalDone() {
      this.getAppVersionList()
    }
  }
}
</script>
<style lang="less" scoped>
.oa-manager {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
