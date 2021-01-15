<template>
  <div class="work-plan">
    <div class="work-plan__header">
      <a-row class="margin-b8">
        <a-col :span="20">
          <!-- <span>状态筛选</span> -->
          <oa-select
            style="width: 200px"
            class="margin-l8"
            @change="onChange"
            v-model="$searchQuery.status"
            :options="statusList"
            placeholder="请选择计划状态"
          ></oa-select>
        </a-col>
        <a-col :span="4" class="text-right" v-if="auth['web/workplan/add']">
          <a
            tag="a"
            v-modal-link="{
              name: 'workplan-add',
              on: { emitAddWorkPlan: addWorkPlan }
            }"
          >
            <a-button type="primary">新建工作</a-button>
          </a>
        </a-col>
      </a-row>
    </div>
    <div class="work-plan__content">
      <div class="left">
        <div v-if="workPlanList.length > 0" style="height:540px;overflow:auto;">
          <div
            v-for="item in workPlanList"
            :key="item.id"
            class="margin-b24 list"
          >
            <workplanItem
              :workPlanInfo="item"
              :statusList="selectList"
              @emitEditPlan="editPlan"
            />
          </div>
          <div class="text-right margin-t8">
            <a-pagination
              simple
              :defaultCurrent="workPagination.p"
              :total="workPagination.t"
              :pageSize="workPagination.ps"
              @change="workPageChange"
            />
          </div>
        </div>
        <div class="blank" v-else>
          <!-- <img class="img" :src="defaultImg" alt="空白图片">
          <span class="text">暂无数据</span>-->
          <oa-empty width="287px"></oa-empty>
        </div>
      </div>
      <div class="right">
        <div class="calendar-wrap">
          <a-calendar
            :fullscreen="false"
            @select="onPanelChange"
            @panelChange="onPanelChange"
          >
            <span
              slot="dateCellRender"
              slot-scope="value"
              :class="
                remindTime.indexOf(value.format('YYYY-MM-DD').valueOf()) > -1
                  ? 'red'
                  : ''
              "
            ></span>
          </a-calendar>
        </div>
        <div class="table-wrap">
          <div class="text-center margin-b8">{{ val }} 下属员工的访客计划</div>
          <oa-table
            rowKey="id"
            :columns="tableOptions.columns"
            :dataSource="dayWorkPlanList"
            @change="onTableChange"
            :pager="pager"
          >
            <template slot="name" slot-scope="text, record">
              <oa-overflow-text maxWidth="50px" :title="record.name">
                {{ record.name }}
              </oa-overflow-text>
            </template>
          </oa-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  editWorkplan,
  workplanList,
  addWorkplan,
  getDayWorkpalnList,
  getWorkplan
} from '@/api/workplan'
import workplanItem from './workplan#/workplan-item'

import moment from 'moment'
import { tableOptions } from './workplan#config'
import { mapGetters } from 'vuex'
import { get } from 'lodash-es'
export default {
  name: 'Workplan',
  data() {
    return {
      status: -99,
      dayWorkPlanList: [],
      workPlanList: [],
      statusList: [],
      editStatus: [], // 编辑用的
      start_time: '',
      end_time: '',
      defaultImg: require('@/assets/images/work-default.png'),
      workPagination: {
        p: 1, // 分页当前页
        ps: 5
      },
      pager: {
        p: 1, // 分页当前页
        ps: 5
      },
      val: moment().format('YYYY-MM-DD'),
      auth: {},
      selectList: [],
      remindTime: []
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.$searchQuery = this.$route.meta.query
  //   this.getWorkPlanList().then(() => next())
  // },
  watch: {
    $route() {
      this.$searchQuery = this.$route.meta.query
      this.getWorkPlanList()
    }
  },
  created() {
    this.getWorkplan()
    this.getWorkPlanListOtherInfo()
  },
  components: {
    workplanItem
  },
  computed: {
    tableOptions,
    ...mapGetters('oa/user', ['user_id'])
  },
  async: {
    getWorkPlanList() {
      return workplanList({ ...this.$searchQuery }).then(res => {
        this.workPlanList = get(res, 'list', [])
        this.auth = get(res, 'auth_area', {})
        this.workPagination = res.pager
        this.getDayWorkPlanList()
      })
    }
  },
  methods: {
    getWorkPlanListOtherInfo() {
      workplanList({ ...this.$searchQuery, only_list: 0 }).then(res => {
        this.statusList = get(res, 'status', [])
        this.workPlanList = get(res, 'list', [])
        this.auth = get(res, 'auth_area', {})
        this.workPagination = res.pager
        this.remindTime = get(res, 'remind_time', [])
        this.getDayWorkPlanList()
      })
    },
    getWorkplan() {
      getWorkplan({ status: 1 }).then(res => {
        this.selectList = get(res, 'status', [])
      })
    },

    getDayWorkPlanList() {
      let para = {
        start_time: this.$searchQuery.start_time,
        end_time: this.$searchQuery.end_time,
        status: this.$searchQuery.status,
        p: this.pager.p,
        ps: this.pager.ps
      }
      getDayWorkpalnList({ ...para }).then(res => {
        this.dayWorkPlanList = res.list
        this.pager = res.pager
      })
    },
    onChange(val) {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    // 员工列表页面切换
    onTableChange(pagination, filter, sorter) {
      this.pager.p = pagination.current
      this.getDayWorkPlanList()
    },
    // 当天工作计划页面切换
    workPageChange(p) {
      this.$searchQuery.p = p
      this.$router.push({
        query: this.$searchQuery
      })
      this.getWorkPlanList()
    },
    onPanelChange(val) {
      // this.start_time = val.format('YYYY-MM-DD')
      // this.end_time = val.format('YYYY-MM-DD')
      // this.val = val.format('YYYY-MM-DD')
      this.$searchQuery.start_time = val.format('YYYY-MM-DD')
      this.$searchQuery.end_time = val.format('YYYY-MM-DD')
      this.$searchQuery.p = 1
      this.$router.push({
        query: this.$searchQuery
      })
      // this.getWorkPlanList()
      // this.getDayWorkPlanList()
    },
    addWorkPlan(para) {
      addWorkplan({ ...para }).then(res => {
        this.$message.success('添加成功')
        this.getWorkPlanList()
      })
    },
    editPlan(val) {
      editWorkplan({ ...val }).then(res => {
        this.getWorkPlanList()
      })
    }
  }
}
</script>
<style lang="less">
.work-plan {
  // margin: 24px;
  height: 100%;
  background: #fff;
  padding: 24px;
  &__header {
  }
  &__content {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    .left {
      width: 62%;
      .list {
      }
    }
    .blank {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      width: 38%;
      height: 100%;
      margin-left: 24px;
      .calendar-wrap {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(217, 217, 217, 1);
        .ant-fullcalendar-header .ant-radio-group {
          display: none !important;
        }
        .ant-select-sm .ant-select-selection__rendered {
          padding: 0 10px;
        }
        .red {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: red;
        }
      }
      .table-wrap {
        width: 100%;
        padding: 15px;
        margin-top: 24px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(217, 217, 217, 1);
      }
    }
  }
}
</style>
