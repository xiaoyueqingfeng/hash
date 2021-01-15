<template>
  <div class="visit-record">
    <div class="visit-record__head">
      <oa-filter-box with-toggle :mode.sync="searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          @search="onSearchKeywords"
          v-model="searchQuery.keywords"
          placeholder="搜索客户名称ID、联系人、手机号"
        ></a-input-search>
        <template slot="actions">
          <a-button type="primary" class="mg-r8" @click="searchVisitRecord">
            查询
          </a-button>
          <a-button class="mg-r8" @click="onReset">重置</a-button>
          <a-button
            @click="onExport"
            v-if="authArea['web/visit/export_visit_record']"
          >
            导出
          </a-button>
        </template>
        <oa-select
          placeholder="拜访类型"
          v-model="searchQuery.visit_model"
          :options="initOptions.visit_model"
        ></oa-select>
        <oa-select
          placeholder="经营模式"
          v-model="searchQuery.work_model"
          :options="initOptions.work_model"
        ></oa-select>
        <oa-select
          placeholder="拜访销售"
          v-model="searchQuery.user_id"
          :options="initOptions.sales"
        ></oa-select>
        <oa-select
          placeholder="拜访方式"
          v-model="searchQuery.model"
          :options="initOptions.model"
        ></oa-select>
        <oa-select
          placeholder="拜访进度"
          v-model="searchQuery.schedule"
          :options="initOptions.schedule"
        ></oa-select>
        <oa-date-range-filter
          :start.sync="searchQuery.start_time"
          :end.sync="searchQuery.end_time"
          @change="getDateVal"
          :placeholder="['拜访开始时间', '拜访结束时间']"
        ></oa-date-range-filter>
      </oa-filter-box>
    </div>

    <div class="visit-record__content">
      <div class="loading">
        <a-spin :spinning="firstLoading" />
      </div>
      <div class="visit-record__content--left">
        <a
          tag="a"
          v-modal-link="{ name: 'visit-add', on: { noticeSuccess: update } }"
          style="width:100%"
          v-if="authArea['web/visit/add']"
        >
          <span type="primary" class="btn">+新建拜访记录</span>
        </a>
        <div v-if="visitList && visitList.length > 0">
          <div
            v-for="item in visitList"
            :key="item.id"
            class="menu-item"
            :class="{ active: item.id == curId }"
          >
            <visitMenuItem
              :visitMenuItemInfo="item"
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
      <div class="visit-record__content--right">
        <div v-if="visitList && visitList.length">
          <visitContentItem
            :visitContentItem="visitDetailInfo"
            @sendAccompany="addAccompany"
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
      v-if="!firstLoading && visitList && visitList.length === 0"
    >
      <oa-empty width="287px"></oa-empty>
    </div>
  </div>
</template>
<script>
import {
  searchVisitList,
  getVisitDetail,
  addComment,
  addVisit,
  exportVisit
} from '@/api/visit'
import { addAccompany } from '@/api/accompany'
import visitMenuItem from './visit#/visit-menu-item'
import visitContentItem from './visit#/visit-content-item'
import { pick } from 'lodash-es'

export default {
  name: 'Visit',
  data() {
    return {
      // 做一个标记位 第一次不会展示空数据组件
      firstLoading: true,
      defaultVal: -99,
      initOptions: {},
      authArea: {},
      visitList: [],
      curId: '',
      dateRange: [],
      tabs: [{ label: '', route: { path: '' } }],
      visitDetailInfo: {}, // 详情信息
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      },
      defaultImg: require('@/assets/images/work-default.png'),
      searchQuery: this.$route.meta.query,

      date: [],
      menuLoading: false,
      contentLoading: false,
      isExpand: false,
      modal: null
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.searchQuery = this.$route.meta.query
    this.searchVisitList().then(() => {
      next()
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.curId = this.$route.query.id || ''
    this.searchVisitRecordOtherInfo()
  },
  async: {
    initPageData(res) {
      this.visitList = res instanceof Object && res.list
      this.authArea = res instanceof Object && res.auth_area
      this.curId = this.curId
        ? this.curId
        : res.list instanceof Array && res.list.length && res.list[0].id
      this.pagination.total = res.pager.t
      if (this.curId) this.getVisitDetail()
    },
    getVisitDetail() {
      this.contentLoading = true
      return getVisitDetail({
        id: this.curId
      }).then(res => {
        this.contentLoading = false
        this.visitDetailInfo = res.info instanceof Object && res.info
      })
    },
    searchVisitList() {
      this.menuLoading = true
      return searchVisitList({ ...this.searchQuery }).then(res => {
        this.menuLoading = false
        this.visitList = res instanceof Object && res.list
        this.auth_area = res instanceof Object && res.list
        this.initPageData(res)
      })
    },
    searchVisitRecordOtherInfo() {
      let start_time = moment()
        .startOf('week')
        .format('YYYY-MM-DD')
      let end_time = moment().format('YYYY-MM-DD')
      this.searchQuery.start_time = start_time
      this.searchQuery.end_time = end_time
      return searchVisitList({
        only_list: 0,
        p: 1,
        ps: 5,
        start_time,
        end_time
      }).then(res => {
        this.firstLoading = false
        this.initOptions = pick(res instanceof Object && res, [
          'model',
          'sales',
          'schedule',
          'work_model',
          'visit_model'
        ])
        this.initPageData(res)
      })
    },
    exportVisitList() {
      return exportVisit({
        keywords: this.searchQuery.keywords,
        work_model: this.searchQuery.work_model,
        model: this.searchQuery.model,
        schedule: this.searchQuery.schedule,
        user_id: this.searchQuery.user_id,
        start_time: this.searchQuery.start_time,
        end_time: this.searchQuery.end_time
      })
    }
  },
  components: {
    visitMenuItem,
    visitContentItem
  },
  methods: {
    onExport() {
      this.exportVisitList().then(res => {
        // 导出拜访记录数据
        let prefix = ''
        if (res === 1) {
          prefix = '本次导出数据>=1000条,请到'
        } else if (res === 2) {
          prefix = '拜访记录正在导出,请到'
        }
        this.modal = this.$info({
          title: '导出拜访记录',
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
      this.searchVisitList()
    },
    showCurDetailInfo(id) {
      this.curId = id
      this.getVisitDetail()
    },
    submitAddVisit(params) {
      addVisit({ ...params }).then(res => {
        this.isAddVisitVisible = false
        this.getVisitDetail()
      })
    },
    onReset() {
      this.searchQuery = { mode: 'filter' }
      this.$router.push({ query: this.searchQuery })
    },
    onSearchKeywords(keywords) {
      this.searchQuery = { mode: 'search' }
      this.$router.push({
        query: {
          p: 1,
          keywords
        }
      })
    },
    // reset() {
    //   this.date = []
    //   this.$router.push(this.$route.path)
    // },
    addAccompany(params) {
      addAccompany({ ...params }).then(res => {
        this.getVisitDetail()
      })
    },
    addComment(params) {
      addComment({ ...params }).then(res => {
        this.getVisitDetail()
      })
    },
    // 搜索条件查询列表
    searchVisitRecord() {
      this.pagination.current = 1
      this.searchQuery.p = 1
      this.$router.push({
        query: {
          ...this.searchQuery,
          keywords: ''
        }
      })
    },
    onSubmit(e) {},
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
.visit-record {
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
        border-left: 4px solid #1890ff;
      }
      .loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -14px;
        margin-top: -14px;
      }
    }
    &--right {
      position: relative;
      flex: 1;
      margin-left: 24px;
      background: #fff;
      .loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -14px;
        margin-top: -14px;
      }
    }
  }
  .blank {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 48px;
    .img {
      margin-bottom: 34px;
    }
    .text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
  }
}
</style>
