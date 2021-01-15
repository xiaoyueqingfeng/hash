<template>
  <div class="serve-record">
    <div class="serve-record__head">
      <oa-filter-box with-toggle :mode.sync="searchQuery.mode">
        <template slot="prepend">
          <a-input-search
            enterButton
            @search="onSearchKeywords"
            v-model="searchQuery.keywords"
            placeholder="搜索客户id、客户姓名、客户电话"
          ></a-input-search>
        </template>
        <template slot="actions">
          <a-button type="primary" class="mg-r8" @click="searchServeRecord">
            查询
          </a-button>
          <a-button class="mg-r8" @click="reset">重置</a-button>
          <a-button
            @click="onExport"
            v-if="auth_area['web/service/export_service_record']"
          >
            导出
          </a-button>
        </template>
        <oa-select
          placeholder="服务类型"
          v-model="searchQuery.service_model"
          :options="initOptions.service_model"
        ></oa-select>
        <oa-select
          placeholder="运营模式"
          v-model="searchQuery.work_model"
          :options="initOptions.work_model"
        ></oa-select>
        <oa-select
          placeholder="服务模式"
          v-model="searchQuery.service_type"
          :options="initOptions.service_type"
        ></oa-select>
        <crm-sale-picker
          placeholder="跟进客运"
          v-model="searchQuery.custom_operate_server_id"
          :type="customoOperateServer"
        ></crm-sale-picker>
        <crm-sale-picker
          placeholder="跟进客续"
          v-model="searchQuery.custom_renew_server_id"
          :type="customRenewServer"
        ></crm-sale-picker>
        <oa-cascader
          :options="initCustomerOptions.custom_operate"
          change-on-select
          placeholder="客运点选结果"
          v-model="searchQuery.custom_operate_service_category_id"
        ></oa-cascader>
        <oa-cascader
          :options="initCustomerOptions.custom_renew"
          change-on-select
          placeholder="客续点选结果"
          v-model="searchQuery.custom_renew_service_category_id"
        ></oa-cascader>
        <oa-date-range-filter
          :start.sync="searchQuery.start_time"
          :end.sync="searchQuery.end_time"
          :placeholder="['服务开始时间', '服务结束时间']"
          @change="getDateVal"
        ></oa-date-range-filter>
      </oa-filter-box>
    </div>

    <div class="serve-record__content">
      <div class="loading">
        <a-spin :spinning="firstLoading" />
      </div>
      <div class="serve-record__content--left">
        <a
          tag="a"
          v-modal-link="{ name: 'service-add', on: { noticeSuccess: update } }"
          style="width:100%"
          v-if="auth_area['web/service/add']"
        >
          <span class="btn">+新建服务记录</span>
        </a>
        <div v-if="serviceList && serviceList.length">
          <div
            v-for="item in serviceList"
            :key="item.id"
            class="menu-item"
            :class="{ active: item.id == curId }"
          >
            <serveMenuItem
              :serveMenuItem="item"
              @click.native="showCurDetailInfo(item.id)"
            />
          </div>
          <div class="text-center margin-t8">
            <a-pagination
              simple
              v-model="searchQuery.p"
              :total="pagination.total"
              :pageSize="pagination.pageSize"
              @change="pageChange"
            />
          </div>
        </div>
        <div class="loading">
          <a-spin :spinning="menuLoading" />
        </div>
      </div>
      <div
        class="serve-record__content--right"
        v-if="serviceList && serviceList.length"
      >
        <div>
          <serveContentItem
            :serveContentItem="serveDetailInfo"
            @sendComment="addComment"
          />
        </div>
        <div class="loading">
          <a-spin :spinning="contentLoading" />
        </div>
      </div>
    </div>
    <div
      class="blank"
      v-if="!firstLoading && serviceList && serviceList.length === 0"
    >
      <oa-empty width="287px"></oa-empty>
    </div>
  </div>
</template>
<script>
import {
  searchServeList,
  getServeDetail,
  addServeComment,
  addServe,
  exportServiceRecord,
  getServiceCategory
} from '@/api/service'
import serveMenuItem from './service#/serve-menu-item'
import serveContentItem from './service#/serve-content-item'
import { pick } from 'lodash-es'
import moment from 'moment'

export default {
  name: 'Service',
  data() {
    return {
      // 做一个标记位 第一次不会展示空数据组件
      firstLoading: true,
      defaultVal: -99,
      auth_area: {},
      serviceList: [],
      initOptions: { service_type: [], work_model: [], service_model: [] }, // 其他信息
      dateRange: [],
      curId: '',
      tabs: [{ label: '', route: { path: '' } }],
      isFolded: false, // 是否收起
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      },
      serveDetailInfo: {},
      defaultImg: require('@/assets/images/work-default.png'),
      searchQuery: this.$route.meta.query,

      date: [],
      menuLoading: false,
      contentLoading: true,
      isExpand: false,
      modal: null,

      customoOperateServer: 6,
      customRenewServer: 7,
      initCustomerOptions: { custom_operate: [], custom_renew: [] }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  beforeRouteUpdate(to, from, next) {
    this.searchQuery = this.$route.meta.query
    this.searchServeList().then(() => {
      next()
    })
  },
  created() {
    this.curId = this.$route.query.id || ''
    this.searchServeRecordOtherInfo()
    this.getServiceCategory()
  },
  components: {
    serveMenuItem,
    serveContentItem
  },
  async: {
    initPageData(res) {
      this.serviceList = res instanceof Object && res.list
      this.auth_area = res instanceof Object && res.auth_area
      this.curId = this.curId
        ? this.curId
        : res.list instanceof Array && res.list.length && res.list[0].id
      this.pagination.total = res.pager.t
      if (this.curId) this.getServeDetail()
    },
    searchServeRecordOtherInfo() {
      let start_time = moment()
        .startOf('week')
        .format('YYYY-MM-DD')
      let end_time = moment().format('YYYY-MM-DD')
      this.searchQuery.start_time = start_time
      this.searchQuery.end_time = end_time
      return searchServeList({
        only_list: 0,
        p: 1,
        ps: 5,
        start_time,
        end_time
      }).then(res => {
        this.firstLoading = false
        this.contentLoading = true
        this.initOptions = pick(res instanceof Object && res, [
          'service_type',
          'work_model',
          'service_model'
        ])
        this.initPageData(res)
      })
    },
    getServeDetail() {
      this.contentLoading = true
      return getServeDetail({
        id: this.curId
      }).then(res => {
        this.contentLoading = false
        this.serveDetailInfo = res.info instanceof Object && res.info
      })
    },
    searchServeList() {
      this.menuLoading = true
      return searchServeList({ ...this.searchQuery }).then(res => {
        this.menuLoading = false
        this.initPageData(res)
      })
    },
    exportServiceList() {
      return exportServiceRecord({
        work_model: this.searchQuery.work_model,
        user_id: this.searchQuery.user_id,
        service_type: this.searchQuery.service_type,
        start_time: this.searchQuery.start_time,
        end_time: this.searchQuery.end_time,
        keywords: this.searchQuery.keywords
      })
    },
    getServiceCategory() {
      return getServiceCategory().then(res => {
        this.initCustomerOptions = pick(res, ['custom_operate', 'custom_renew'])
      })
    }
  },
  methods: {
    onExport() {
      // 导出服务记录数据
      this.exportServiceList().then(res => {
        let prefix = ''
        if (res === 1) {
          prefix = '本次导出数据>=1000条'
        } else if (res === 2) {
          prefix = '服务记录正在导出'
        }
        this.modal = this.$info({
          title: '导出服务记录',
          maskClosable: true,
          content: this.$createElement('div', {}, [
            prefix,
            this.$createElement(
              'a',
              {
                href: 'javascript:;',
                on: {
                  click: this.handlerGoDownloadCenter
                }
              },
              ['【下载中心】']
            ),
            '进行查看及下载'
          ])
        })
      })
    },
    handlerGoDownloadCenter() {
      this.modal.destroy()
      this.$router.push({
        name: 'system-download-export'
      })
    },
    update(para) {
      this.$message.success('添加成功')
      this.searchServeList()
    },
    showCurDetailInfo(id) {
      this.curId = id
      this.getServeDetail()
    },
    searchServeRecord() {
      this.pagination.current = 1
      this.searchQuery.p = 1
      this.$router.push({
        query: {
          ...this.searchQuery,
          keywords: ''
        }
      })
    },
    addComment(params) {
      addServeComment({ ...params }).then(res => {
        this.getServeDetail()
      })
    },
    submitAddServe(params) {
      addServe({ ...params }).then(res => {
        this.isAddServeVisible = false
      })
    },
    reset() {
      this.searchQuery = { mode: 'filter' }
      this.$router.push({ query: this.searchQuery })
    },
    onSearchKeywords(keywords) {
      this.$router.push({
        query: {
          p: 1,
          keywords
        }
      })
    },
    getDateVal(date) {
      this.searchQuery.start_time = date.start
      this.searchQuery.end_time = date.end
    },
    pageChange(p) {
      this.pagination.current = p
      this.searchQuery.p = p
      this.$router.push({
        query: {
          ...this.searchQuery
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.serve-record {
  &__head {
    background: #fff;
    height: 100%;
    padding: 24px 24px 16px 24px;
    margin-bottom: 24px;
    border-radius: 2px;
  }
  &__content {
    display: flex;
    // justify-content: space-around;
    position: relative;
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
    }
    &--left {
      width: 440px;
      position: relative;
      .btn {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 16px;
        text-align: center;
        background: rgba(24, 144, 255, 0.1);
        border-radius: 4px;
        border: 1px solid rgba(24, 144, 255, 1);
      }
      .menu-item {
        margin-bottom: 16px;
        background: #fff;
        border-left: 4px solid #e8e8e8;
        border-radius: 2px 0px 0px 2px;
      }
      .active {
        border-left: 4px solid @primary-color;
      }
      .loading {
        position: absolute;
        left: 50%;
        top: 50%;
      }
    }
    &--right {
      position: relative;
      margin-left: 24px;
      flex: 1;
      background: #fff;
      .loading {
        position: absolute;
        left: 50%;
        top: 50%;
      }
    }
  }
  .blank {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
