<template>
  <div class="announcement">
    <div class="announcement__header  mg-b16">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <template slot="prepend">
          <a-input-search
            enterButton
            @search="tbOnSearchKeywords('keywords', $event)"
            v-model="$searchQuery.keywords"
            placeholder="请输入内容"
          ></a-input-search>
        </template>
        <oa-select
          placeholder="请选择发送版本"
          :options="mapping.version_list"
          v-model="$searchQuery.send_version"
        ></oa-select>
        <oa-select
          placeholder="请选择状态"
          :options="mapping.status_list"
          v-model="$searchQuery.status"
        ></oa-select>
        <template slot="actions">
          <oa-button type="primary" @click="tbOnFilterSearch('keywords')">
            搜索
          </oa-button>
        </template>
      </oa-filter-box>
      <div v-if="auth_area['api/notice/activity_add']">
        <a-button @click="goAdd('', 'add')" type="primary">新增公告</a-button>
      </div>
    </div>

    <oa-table
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="list"
      :loading="getNoticeActivityList$loading"
      @change="tbOnTableChange"
      :pager="pager"
      :scroll="{
        x: 1440
      }"
    >
      <template slot="tableTitle" slot-scope="text, record">
        <oa-overflow-text maxWidth="10em" :title="record.title">
          {{ record.title }}
        </oa-overflow-text>
      </template>
      <template slot="edit_weight" slot-scope="text, record, index">
        <a-input
          :id="'weightInput' + record.id"
          :ref="'weightInput' + record.id"
          v-show="record.editable"
          :value="record.weight"
          type="number"
          @change="e => changeWeight(e.target.value, index, record)"
          @blur="e => handlerBlur(e.target.value, index, record)"
        ></a-input>
        <span
          class="weight-text"
          v-show="!record.editable"
          @click="editWeight(index, record)"
        >
          {{ record.weight }}
        </span>
      </template>
      <template slot="status" slot-scope="record">
        <a-badge :status="STATUS_COLOR[record.status]"></a-badge>
        <span>{{ record.status_text }}</span>
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['api/notice/send_activity']"
            v-modal-link="{
              name: 'notice-publish',
              props: { id: record.id, from: 'activity' },
              on: { done: getNoticeActivityList }
            }"
          >
            发布
          </a>
          <a
            v-if="record.auth_area['api/notice/get_activity_detail']"
            @click="handlePreview(record)"
          >
            查看
          </a>
          <a
            v-if="record.auth_area['api/notice/activity_edit']"
            @click="goAdd(record.id, 'edit')"
          >
            编辑
          </a>
          <a
            v-if="record.auth_area['api/notice/delete_activity']"
            v-modal-link="{
              name: 'notice-delete',
              props: { id: record.id, from: 'activity' },
              on: { done: getNoticeActivityList }
            }"
          >
            删除
          </a>
          <a
            v-if="record.auth_area['api/notice/withdraw_activity']"
            v-modal-link="{
              name: 'notice-withDraw',
              props: { id: record.id, from: 'activity' },
              on: { done: getNoticeActivityList }
            }"
          >
            撤回
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
    <admin-notice-preview
      :previewInfo="previewInfo"
      :show.sync="previewShow"
      from="activity"
    ></admin-notice-preview>
  </div>
</template>
<script>
import {
  getActivityDetail,
  getNoticeActivityList,
  setActivityWeight
} from '@/api/notice'
import { tableOptions } from './activity#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
const STATUS_COLOR = {
  1: 'processing',
  2: 'success',
  3: 'error',
  4: 'default',
  5: 'warning'
}
export default {
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      auth_area: {},
      mapping: {
        version_list: [],
        status_list: []
      },
      pager: {
        p: 1,
        ps: 20
      },
      STATUS_COLOR,
      previewShow: false,
      previewInfo: {}
    }
  },
  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getNoticeActivityList()
    }
  },
  async: {
    getNoticeActivityList() {
      return getNoticeActivityList({ ...this.$searchQuery }).then(res => {
        this.mapping.status_list = get(res, 'mapping.status_list', [])
        this.mapping.version_list = get(res, 'mapping.version_list', [])
        this.list = get(res, 'list', [])
        this.pager = res.pager
        this.auth_area = get(res, 'auth_area', {})
      })
    },
    getActivityDetail(data) {
      return getActivityDetail(data)
    }
  },
  created() {
    this.getNoticeActivityList()
  },
  methods: {
    editWeight(index, record) {
      record.editable = true
      this.$set(this.list, index, record)
      let weightRefs = 'weightInput' + record.id
      this.$nextTick(() => {
        this.$refs[weightRefs].focus()
      })
    },
    changeWeight(value, index, record) {
      if (value < 0) {
        return this.$message.error('排序不能小于0')
      }
      record.weight = value
      this.$set(this.list, index, record)
    },
    handlerBlur(value, index, record) {
      record.editable = false
      this.$set(this.list, index, record)
      return setActivityWeight({ id: record.id, weight: value }).then(() => {
        this.getNoticeActivityList()
      })
    },
    handlePreview(record) {
      if (record.send_type === 2) {
        this.$modalRouter.push({
          name: 'notice-scan',
          props: { id: record.id, from: 'activity' }
        })
      } else {
        this.getActivityDetail({
          id: record.id
        }).then(res => {
          console.log(res)
          this.previewInfo = {
            pc_basemap: res.pc_basemap,
            app_basemap: res.app_basemap,
            app_start_basemap: res.app_start_basemap
          }
          this.previewShow = true
        })
      }
    },
    goAdd(id, type) {
      let isEdit = 0
      if (type === 'edit') {
        isEdit = 1
      }
      this.$router.push({
        name: 'notice-activity-edit',
        query: {
          id,
          isEdit
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.announcement {
  height: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.weight-text {
  width: 100%;
  cursor: pointer;
}
</style>
