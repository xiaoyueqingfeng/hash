<template>
  <div class="channel">
    <a-tabs
      defaultActiveKey="1"
      @change="callback"
      v-model="$searchQuery.channel_level1_id"
    >
      <a-tab-pane
        :tab="item.name"
        :key="item.id"
        v-for="item in otherInfo.channel"
      >
        <div class="column">
          <a-select
            @change="handleStatusChange"
            v-model="$searchQuery.status"
            style="width:200px;"
          >
            <a-select-option v-for="item in otherInfo.status" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a
            tag="a"
            v-modal-link="{
              name: 'channel-add',
              props: { channelLevel: otherInfo.channel },
              on: { emitAddChannel: addChannel }
            }"
          >
            <a-button type="primary">新建渠道</a-button>
          </a>
        </div>
        <div>
          <oa-table
            :loading="getChannelListInfo$loading"
            style="min-height: 600px;"
            :columns="columns"
            :dataSource="channelInfo"
            size="middle"
            rowKey="id"
            @change="tbOnTableChange"
            :pager="pager"
          >
            <div slot="operation" slot-scope="text, record, index">
              <div>
                <a>
                  <a-popconfirm
                    :title="
                      '确定' +
                        (record.status_tip == '正常' ? '禁用' : '恢复') +
                        '吗'
                    "
                    @confirm="changeStatus(record)"
                    okText="确定"
                    cancelText="取消"
                  >
                    <span>
                      {{ record.status_tip == '正常' ? '禁用' : '恢复' }}
                    </span>
                  </a-popconfirm>
                  <span
                    v-if="
                      record.status_tip == '正常' &&
                        (index != 0 || $searchQuery.p != 1)
                    "
                    class="inline-block margin-r8 margin-l8"
                  >
                    |
                  </span>
                  <span @click="toTop(record)">
                    {{
                      record.status_tip == '正常' &&
                      (index != 0 || $searchQuery.p != 1)
                        ? '置顶'
                        : ''
                    }}
                  </span>
                </a>
              </div>
            </div>
            <div slot="status" slot-scope="text, record">
              <span class="circle" :class="'circle-' + record.status"></span>
              <span>{{ record.status_tip }}</span>
            </div>
          </oa-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import {
  getChannelInfo,
  addChannel,
  editChannel,
  ToTopChannel
} from '@/api/channel'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
const columns = [
  {
    title: '一级渠道',
    dataIndex: 'channel_tip'
  },
  {
    title: '二级渠道',
    dataIndex: 'sub_channel_tip'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time'
  },
  {
    title: '状态',
    key: 'status',
    width: 90,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'operation',
    width: 180,
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'Channel',
  mixins: [tableMixins],
  data() {
    return {
      status: -99,
      channel_level1_id: '', // 当前渠道id
      channelInfo: [],
      otherInfo: {},
      channelList: [],
      pager: {
        p: 1, // 分页当前页
        t: 0,
        ps: 5 // 每页数量
      },
      columns
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$searchQuery = this.$route.meta.query
    this.getChannelListInfo()
    next()
  },
  created() {
    this.getOtherInfo()
  },
  async: {
    getChannelListInfo() {
      return getChannelInfo({
        ...this.$searchQuery
      }).then(res => {
        this.channelInfo = get(res, 'list', [])
        this.pager = get(res, 'pager', { p: 1, ps: 20, t: 0 })
      })
    }
  },
  methods: {
    searchList() {
      this.$router.push({
        query: this.$searchQuery
      })
    },
    getOtherInfo() {
      getChannelInfo({
        only_list: 0
      }).then(res => {
        this.otherInfo = res instanceof Object && res
        this.channel_level1_id =
          res.channel instanceof Array && res.channel[0].id
        this.getChannelListInfo()
      })
    },
    addChannel(para) {
      addChannel({ ...para }).then(res => {
        this.$message.success('添加成功')
        this.searchList()
      })
    },
    toTop(para) {
      ToTopChannel({ channel_level2_id: para.id, top: 1 }).then(() => {
        this.getChannelListInfo()
      })
    },
    callback(val) {
      this.$searchQuery.p = 1
      this.searchList()
    },
    handleStatusChange(val) {
      this.searchList()
    },
    changeStatus(para) {
      /* eslint-disable */
      let status = para.status == '1' ? 2 : 1
      editChannel({
        channel_level2_id: para.id,
        channel_level2_status: status
      }).then(res => {
        this.getChannelListInfo()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.channel {
  padding: 24px;
  // margin: 24px;
  background: #fff;
  .column {
    display: flex;
    justify-content: space-between;
    margin: 14px 0;
  }
  .circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 8px;
    border-radius: 50%;
    &-2 {
      background: rgba(245, 34, 45, 1);
    }
    &-1 {
      background: rgba(82, 196, 26, 1);
    }
  }
}
</style>

